import { remove } from '../framework/render';
import CommentsModel from '../model/comments-model';
import { render } from '../render';
import { FilterType, NoFilms, TitleMessage, UpdateType, UserAction } from '../utils/common';
import { sortFilmsByDate, sortFilmsByRating, SortType } from '../utils/sort';
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
  #commentsModel = new Map();
  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = null;
  #mainContainer = null;
  #filmsModel = null;
  #renderedFilmsCount = null;
  #currentFilter = FilterType.ALL;
  #currentSortType = SortType.DEFAULT;

  constructor(mainContainer, filmsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort(sortFilmsByDate);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(sortFilmsByRating);
    }
    return this.#filmsModel.films;
  }

  init = () => {
    this.#navigationPresenter = new NavigationPresenter(this.#mainContainer);
    this.#sortPresenter = new SortPresenter(this.#mainContainer, this.#handleSortTypeChange);

    this.#navigationPresenter.init(this.films, this.#currentFilter);
    this.#sortPresenter.init(this.#currentSortType);

    this.#renderFilmsList();
  };

  #renderFilmsList = () => {
    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#filmsListComponent = new FilmsListView();
    render(this.#filmsListComponent, this.#mainContainer);

    this.#renderFilms();

    render(this.#filmsContainerComponent, this.#filmsListComponent.element.lastElementChild);

    if (this.films.length > FILMS_COUNT_PER_STEP) {
      this.#showMoreButtonPresenter = new ShowMoreButtonPresenter(
        this.#filmsListComponent.element.lastElementChild,
        this.#handleShowMoreButtonClick
      );
      this.#showMoreButtonPresenter.init();
    }
  };

  #renderFilms = () => {
    this.films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => {
        if(!this.#commentsModel.get(film.id)) {
          const commentsModel = new CommentsModel(film.id);
          commentsModel.addObserver(this.#handleModelEvent);
          this.#commentsModel.set(film.id, commentsModel);
        }
        this.#renderFilm(film);
      });
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsContainerComponent,
      this.#mainContainer,
      this.#resetFilmsList,
      this.#handleViewAction,
    );

    filmPresenter.init({
      ...film,
      userComment: {...film.userComment, emotion: null},
      comments:[...this.#commentsModel.get(film.id).comments]
    });
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #resetFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearFilmsList = () => {
    remove(this.#filmsListComponent);
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = null;
    if(this.#showMoreButtonPresenter) {
      this.#showMoreButtonPresenter.remove();
    }
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

    if (this.#renderedFilmsCount >= this.films.length) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
      this.#showMoreButtonPresenter.remove();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#sortPresenter.update(sortType);
    this.#clearFilmsList();
    this.#renderFilmsList();
  };

  #handleViewAction = (actionType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
      case UserAction.UPDATE_USER_COMMENT:
        this.#filmsModel.updateFilm(update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.get(update.filmId).deleteComment(update);

    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.FILM:
        this.#filmPresenter.get(data.id).update(data);
        break;
      case UpdateType.COMMENT:
        this.#filmsModel.updateFilm({
          id: data.filmId,
          comments: this.#commentsModel.get(data.filmId).comments
        });
        break;
    }
  };

}
