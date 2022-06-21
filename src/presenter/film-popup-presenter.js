import { remove, render } from '../framework/render';
import { UpdateType, UserAction } from '../utils/common';
import { sortCommentsByDate } from '../utils/sort';
import CommentView from '../view/comment-view';
import FilmPopupView from '../view/film-popup-view';
import NewCommentView from '../view/new-comment-view';
import PopupControlsView from '../view/popup-controls-view';

export default class FilmPopupPresenter {
  #film = {};
  #mainContainer = null;
  #filmPopupComponent = null;
  #popupControlsComponent = null;
  #newCommentFormComponent = null;
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

  setControlsSwitching = () => {
    this.#popupControlsComponent.setSwitching();
  };

  setCommentAdding = () => {
    this.#newCommentFormComponent.setSubmitting();
  };

  setCommentDeleteAborting = (commentId) => {
    const resetCommentState = () => {
      this.#commentComponent
        .get(commentId)
        .updateElement({isDeleting: false});
    };

    this.#commentComponent
      .get(commentId)
      .shake(resetCommentState);
  };

  setControlSwitchAborting = () => {
    const resetPopupControlsState = () => {
      this.#popupControlsComponent
        .updateElement({isDisabled: false});
    };

    this.#popupControlsComponent
      .shake(resetPopupControlsState);
  };

  setCommentAddAborting = () => {
    const resetNewCommentFormState = () => {
      this.#newCommentFormComponent
        .updateElement({isDisabled: false});
    };

    this.#newCommentFormComponent
      .shake(resetNewCommentFormState);
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

    this.#renderControls();
    this.#renderComments();
    this.#renderNewCommentForm();

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

  #renderControls = () => {
    this.#popupControlsComponent = new PopupControlsView(this.#film.userDetails);

    this.#popupControlsComponent.setAddToWatchlistClickHandler(() => {
      this.#handleAddToWatchlistClick();
    });
    this.#popupControlsComponent.setMarkAsWatchedClickHandler(() => {
      this.#handleMarkAsWatchedClick();
    });
    this.#popupControlsComponent.setMarkAsFavoriteClickHandler(() => {
      this.#handleMarkAsFavoriteClick();
    });

    render(
      this.#popupControlsComponent,
      this.#filmPopupComponent.element
        .querySelector('.film-details__top-container')
    );
  };

  #renderNewCommentForm = () => {
    this.#newCommentFormComponent = new NewCommentView();

    this.#newCommentFormComponent.setFormSubmitHandler((update) => {
      this.#handleFormSubmit(update);
    });

    render(
      this.#newCommentFormComponent,
      this.#filmPopupComponent.element
        .querySelector('.film-details__comments-wrap'));
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
      {
        userComment: {...update},
        film: {...this.#film}
      }
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
