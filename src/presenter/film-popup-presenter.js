import { remove, render } from '../framework/render';
import { UpdateType, UserAction } from '../utils/common';
import { sortCommentsByDate } from '../utils/sort';
import CommentView from '../view/comment-view';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPopupPresenter {
  #film = {};
  #mainContainer = null;
  #filmPopupComponent = null;
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
    this.#filmPopupComponent.setEmojiClickHandler((emoji) => {
      this.#handleEmojiClick(emoji);
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
    this.#comments = this.#film.comments.sort(sortCommentsByDate);
    this.#comments.map((comment) => {
      const filmCommentComponent = new CommentView(comment, this.#film.id);
      filmCommentComponent.setDeleteButtonClickHandler(this.#handleDeleteCommentClick);
      render(filmCommentComponent, this.#filmPopupComponent.element.querySelector('.film-details__comments-list'));
    });
  };

  #closePopup = () => {
    if(!this.#filmPopupComponent) {
      return;
    }
    this.#resetEmoji();
    document.removeEventListener('keydown', this.#handleEscapeKeydown);
    this.#mainContainer.parentElement.classList.remove('hide-overflow');
    remove(this.#filmPopupComponent);
    this.#isRendered = false;
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
    this.#resetEmoji();
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MIN,
      {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}}
    );
    this.#resetEmoji();
  };

  #handleMarkAsFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MIN,
      {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}}
    );
    this.#resetEmoji();
  };

  #handleEmojiClick = (update) => {
    if(!update) {
      return;
    }
    this.#changeData(
      UserAction.UPDATE_USER_COMMENT,
      UpdateType.MIN,
      update
    );
    this.#filmPopupComponent
      .element
      .querySelector('.film-details__emoji-list')
      .scrollIntoView({ block: 'center'});
  };

  #handleDeleteCommentClick = (comment, filmId) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MIN,
      {...comment, filmId }
    );
  };

  #resetEmoji = () => {
    this.#handleEmojiClick(null);
  };
}
