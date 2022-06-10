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

  constructor(container, mainContainer, resetFilmsList) {
    this.#filmContainer = container;
    this.#mainContainer = mainContainer;
    this.#resetFilmsList = resetFilmsList;
  }

  init(film) {
    this.#film = film;
    this.#renderFilm();
  }

  resetView = () => {
    this.#closePopup();
  };

  #renderFilm = () => {
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setFilmCardClickHandler(() => {
      this.#renderPopup();
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

    this.#mainContainer.parentElement.classList.add('hide-overflow');
    this.#mainContainer.parentElement.appendChild(this.#filmPopupComponent.element);
  };

  #handleEscapeKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
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
}
