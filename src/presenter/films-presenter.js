import { remove } from '../framework/render';
import { render } from '../render';
import { FilterType, NoFilms, TitleMessage, updateItem } from '../utils/common';
import { SortType } from '../utils/sort';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import FilmPresenter from './film-presenter';
import NavigationPresenter from './navigation-presenter';
import ShowMoreButtonPresenter from './show-more-button-presenter';
import SortPresenter from './sort-presenter';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #navigationPresenter = null;
  #sortPresenter = null;
  #showMoreButtonPresenter = null;
  #filmPresenter = new Map();
  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = null;
  #mainContainer = null;
  #filmsModel = null;
  #films = [];
  #sourcedFilms = [];
  #renderedFilmsCount = null;
  #currentFilter = FilterType.ALL;
  #currentSort = SortType.DEFAULT;

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (filmsModel) => {
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];
    this.#sourcedFilms = [...this.#filmsModel.films];
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
      this.#showMoreButtonPresenter = new ShowMoreButtonPresenter(
        this.#filmsListComponent.element.lastElementChild,
        this.#handleShowMoreButtonClick
      );
      this.#showMoreButtonPresenter.init();
    }
  };

  #renderFilms = () => {
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsContainerComponent,
      this.#mainContainer,
      this.#resetFilmsList,
      this.#handleFilmDataChange,
    );
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
      this.#showMoreButtonPresenter.remove();
    }
  };

  #handleFilmDataChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).update(updatedFilm);
  };
}
