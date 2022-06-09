import { render } from '../render';
import { FilterType, NoFilms, TitleMessage } from '../utils/common';
import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import NavigationPresenter from './navigation-presenter';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #navigationPresenter = null;
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = null;
  #mainContainer = null;
  #filmsModel = null;
  #prevPopup = null;
  #films = [];
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #currentFilter = FilterType.ALL;

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (filmsModel) => {
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#navigationPresenter = new NavigationPresenter(this.#mainContainer);

    this.#navigationPresenter.init(this.#films, this.#currentFilter);
    this.#renderFilms();
  };

  #renderFilms = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
    } else {

      if(this.#filmsListComponent) {
        this.#filmsListComponent.element.remove();
        this.#filmsListComponent.removeElement();
      }

      this.#filmsListComponent = new FilmsListView();
      render(this.#filmsListComponent, this.#mainContainer);

      for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#films[i]);
      }

      render(this.#filmsContainerComponent, this.#filmsListComponent.element.lastElementChild);

      if (this.#films.length > FILMS_COUNT_PER_STEP) {

        this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
        render(this.#showMoreButtonComponent, this.#filmsListComponent.element.lastElementChild);
      }
    }
  };

  #renderFilm = (film) => {
    const filmCardComponent = new FilmCardView(film);

    filmCardComponent.setFilmCardClickHandler(() => {
      this.#renderPopup(film);
    });

    render(filmCardComponent, this.#filmsContainerComponent.element);
  };

  #renderPopup = (film) => {
    if(this.#prevPopup) {
      this.#closePopup();
    }

    const filmPopupComponent = new FilmPopupView(film);

    document.addEventListener('keydown', this.#handleEscapeKeydown);

    filmPopupComponent.setCloseButtonClickHandler(() => {
      document.removeEventListener('keydown', this.#handleEscapeKeydown);
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

  #handleEscapeKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#handleEscapeKeydown);
    }
  };

  #renderNoFilms = () => {
    if(this.#filmsListComponent) {
      this.#filmsListComponent.element.remove();
      this.#filmsListComponent.removeElement();
    }
    const titleMessageKey = this.#currentFilter;
    this.#filmsListComponent = new FilmsListView(NoFilms.TRUE, TitleMessage[titleMessageKey]);
    render(this.#filmsListComponent, this.#mainContainer);
  };

  #handleShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };
}
