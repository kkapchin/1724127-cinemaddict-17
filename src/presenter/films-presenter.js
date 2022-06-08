import { render, RenderPosition } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {
  #filmsListComponent = new FilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsContainerComponent = new FilmsContainerView();
  #mainContainer = null;
  #filmsModel = null;
  #prevPopup = null;

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (filmsModel) => {
    this.#filmsModel = filmsModel;

    render(this.#filmsListComponent, this.#mainContainer);

    for (const film of this.#filmsModel.films) {
      this.#renderFilm(film);
    }

    render(this.#filmsContainerComponent, this.#filmsListComponent.element.lastElementChild);
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element.lastElementChild);
  };

  #renderFilm = (film) => {
    const filmCardComponent = new FilmCardView(film);

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#renderPopup(film);
    });

    render(filmCardComponent, this.#filmsContainerComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPopup = (film) => {
    if(this.#prevPopup) {
      this.#closePopup();
    }

    const filmPopupComponent = new FilmPopupView(film);

    document.addEventListener('keydown', this.#onEscKeyDown);

    filmPopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#closePopup(filmPopupComponent);
    });

    this.#prevPopup = filmPopupComponent;
    this.#mainContainer.parentElement.classList.add('hide-overflow');
    this.#mainContainer.parentElement.appendChild(filmPopupComponent.element);
  };

  #closePopup = () => {
    this.#mainContainer.parentElement.classList.remove('hide-overflow');
    this.#mainContainer.parentElement.removeChild(this.#prevPopup.element);
    this.#prevPopup = null;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
