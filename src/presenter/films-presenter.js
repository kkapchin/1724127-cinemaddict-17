import { remove } from '../framework/render';
import { render } from '../render';
import { FilterType, NoFilms, TitleMessage } from '../utils/common';
import { SortType } from '../utils/sort';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmPresenter from './film-presenter';
import NavigationPresenter from './navigation-presenter';
import SortPresenter from './sort-presenter';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #navigationPresenter = null;
  #sortPresenter = null;
  #filmPresenter = new Map();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = null;
  #mainContainer = null;
  #filmsModel = null;
  #films = [];
  #renderedFilmsCount = null;
  #currentFilter = FilterType.ALL;
  #currentSort = SortType.DEFAULT;

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (filmsModel) => {
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#navigationPresenter = new NavigationPresenter(this.#mainContainer);
    this.#sortPresenter = new SortPresenter(this.#mainContainer);

    this.#navigationPresenter.init(this.#films, this.#currentFilter);
    this.#sortPresenter.init(this.#currentSort);

    this.#renderFilmsList();
  };

  #renderFilmsList = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#filmsListComponent = new FilmsListView();
    render(this.#filmsListComponent, this.#mainContainer);

    this.#renderFilms();

    render(this.#filmsContainerComponent, this.#filmsListComponent.element.lastElementChild);

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element.lastElementChild);
    }
  };

  #renderFilms = () => {
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsContainerComponent, this.#mainContainer, this.#resetFilmsList);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #resetFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderNoFilms = () => {
    if(this.#filmsListComponent) {
      remove(this.#filmsListComponent);
    }
    const titleMessageKey = this.#currentFilter;
    this.#filmsListComponent = new FilmsListView(NoFilms.TRUE, TitleMessage[titleMessageKey]);
    render(this.#filmsListComponent, this.#mainContainer);
  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilms();

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
      remove(this.#showMoreButtonComponent);
    }
  };
}
