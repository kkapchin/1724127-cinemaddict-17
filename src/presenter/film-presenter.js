import { render } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPresenter {
  #filmPopupComponent = null;
  #filmCardComponent = null;
  #filmContainer = null;
  #mainContainer = null;
  #film = null;
  #resetFilmsList = null;
  #changeData = null;

  constructor(container, mainContainer, resetFilmsList, changeData) {
    this.#filmContainer = container;
    this.#mainContainer = mainContainer;
    this.#resetFilmsList = resetFilmsList;
    this.#changeData = changeData;
  }

  init(film) {
    this.#film = film;
    this.#renderFilm();
  }

  update(updatedFilm) {
    if(this.#filmPopupComponent) {
      this.#filmPopupComponent.updateElement(updatedFilm);
    }
    this.#film = updatedFilm;
    this.#filmCardComponent.updateElement(updatedFilm);
  }

  resetView = () => {
    this.#closePopup();
  };

  #renderFilm = () => {
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setFilmCardClickHandler(() => {
      this.#renderPopup();
    });
    this.#filmCardComponent.setAddToWatchlistClickHandler(() => {
      this.#handleAddToWatchlistClick();
    });
    this.#filmCardComponent.setMarkAsWatchedClickHandler(() => {
      this.#handleMarkAsWatchedClick();
    });
    this.#filmCardComponent.setMarkAsFavoriteClickHandler(() => {
      this.#handleMarkAsFavoriteClick();
    });

    render(this.#filmCardComponent, this.#filmContainer.element);
  };

  #renderPopup = () => {

    this.#resetFilmsList();
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


    this.#mainContainer.parentElement.classList.add('hide-overflow');
    this.#mainContainer.parentElement.appendChild(this.#filmPopupComponent.element);
  };

  #closePopup = () => {
    if(!this.#filmPopupComponent) {
      return;
    }
    document.removeEventListener('keydown', this.#handleEscapeKeydown);
    this.#mainContainer.parentElement.classList.remove('hide-overflow');
    this.#mainContainer.parentElement.removeChild(this.#filmPopupComponent.element);
    this.#filmPopupComponent = null;
  };

  #handleEscapeKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #handleAddToWatchlistClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}
    });
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}
    });
  };

  #handleMarkAsFavoriteClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}
    });
  };
}
