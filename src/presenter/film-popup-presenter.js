import { remove, render } from '../framework/render';
import { UpdateType, UserAction } from '../utils/common';
import { sortCommentsByDate } from '../utils/sort';
import CommentView from '../view/comment-view';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPopupPresenter {
  #film = {};
  #mainContainer = null;
  #filmPopupComponent = null;
  #commentComponent = new Map();
  #changeData = null;
  #comments = [];
  #isRendered = false;

  constructor(mainContainer, changeData) {
    this.#mainContainer = mainContainer;
    this.#changeData = changeData;
  }

  init(film) {
    this.#film = film;
    this.#renderPopup();
  }

  get isRendered() {
    return this.#isRendered;
  }

  setCommentDeleting = (commentId) => {
    this.#commentComponent.get(commentId).setDeleting();
  };

  setAborting = (commentId) => {
    const resetCommentState = () => {
      this.#commentComponent
        .get(commentId)
        .updateElement({isDeleting: false});
    };

    this.#commentComponent
      .get(commentId)
      .shake(resetCommentState);
  };

  destroy = () => {
    this.#closePopup();
  };

  #renderPopup = () => {
    this.#filmPopupComponent = new FilmPopupView(this.#film);
    document.addEventListener('keydown', this.#handleEscapeKeydown);

    this.#filmPopupComponent.setCloseButtonClickHandler(() => {
      this.#closePopup();
    });
    this.#filmPopupComponent.setAddToWatchlistClickHandler(() => {
      this.#handleAddToWatchlistClick();
    });
    this.#filmPopupComponent.setMarkAsWatchedClickHandler(() => {
      this.#handleMarkAsWatchedClick();
    });
    this.#filmPopupComponent.setMarkAsFavoriteClickHandler(() => {
      this.#handleMarkAsFavoriteClick();
    });
    this.#filmPopupComponent.setEmojiClickHandler(() => {
      this.#renderComments();
    });
    this.#filmPopupComponent.setFormSubmitHandler((update) => {
      this.#handleFormSubmit(update);
    });

    this.#renderComments();

    this.#mainContainer.parentElement.classList.add('hide-overflow');
    this.#mainContainer.parentElement.appendChild(this.#filmPopupComponent.element);
    this.#isRendered = true;
  };

  #renderComments = () => {
    this.#comments = this.#film.popupComments.sort(sortCommentsByDate);
    this.#comments.map((comment) => {
      const filmCommentComponent = new CommentView(comment);
      filmCommentComponent.setDeleteButtonClickHandler(this.#handleDeleteCommentClick);
      this.#commentComponent.set(comment.id, filmCommentComponent);
      render(filmCommentComponent, this.#filmPopupComponent.element.querySelector('.film-details__comments-list'));
    });
  };

  #closePopup = () => {
    if(!this.#filmPopupComponent) {
      return;
    }
    document.removeEventListener('keydown', this.#handleEscapeKeydown);
    this.#mainContainer.parentElement.classList.remove('hide-overflow');
    remove(this.#filmPopupComponent);
    this.#isRendered = false;
    this.#commentComponent.clear();
  };

  #handleFormSubmit = (update) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MIN,
      update
    );
  };

  #handleEscapeKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #handleAddToWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MIN,
      {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}}
    );
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MIN,
      {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}}
    );
  };

  #handleMarkAsFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MIN,
      {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}}
    );
  };

  #handleDeleteCommentClick = (commentId) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MIN,
      {commentId, film: this.#film }
    );
  };
}
