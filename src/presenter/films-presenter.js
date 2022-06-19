import { remove } from '../framework/render';
import { render } from '../render';
import { NoFilms, TitleMessage, UpdateType, UserAction } from '../utils/common';
import { filterFilms, FilterType } from '../utils/filter';
import { sortFilmsByDate, sortFilmsByRating, SortType } from '../utils/sort';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import FilmPopupPresenter from './film-popup-presenter';
import FilmPresenter from './film-presenter';
import ShowMoreButtonPresenter from './show-more-button-presenter';
import SortPresenter from './sort-presenter';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #sortPresenter = null;
  #showMoreButtonPresenter = null;
  #filmPopupPresenter = null;
  #filmPresenter = new Map();

  #mainContainer = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = null;

  #commentsModel = null;
  #filmsModel = null;
  #filtersModel = null;
  #sortModel = null;

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filterType = FilterType.DEFAULT;
  #sortType = SortType.DEFAULT;
  #isLoading = true;
  #popupId = null;

  constructor(mainContainer, filmsModel, filtersModel, sortModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;
    this.#sortModel = sortModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filtersModel.filter;
    this.#sortType = this.#sortModel.sort;
    const films = this.#filmsModel.films;
    const filteredFilms = filterFilms[this.#filterType](films);

    switch (this.#sortType) {
      case SortType.DATE:
        return [...filteredFilms].sort(sortFilmsByDate);
      case SortType.RATING:
        return [...filteredFilms].sort(sortFilmsByRating);
    }
    return filteredFilms;
  }

  init = () => {
    this.#sortPresenter = new SortPresenter(this.#mainContainer, this.#handleViewAction);
    this.#filmPopupPresenter = new FilmPopupPresenter(this.#mainContainer, this.#handleViewAction);
    this.#renderFilmsList();
  };

  #renderFilmsList = () => {
    if(this.#isLoading === true) {
      this.#filmsListComponent = new FilmsListView({isLoading: this.#isLoading});
      render(this.#filmsListComponent, this.#mainContainer);
      return;
    }

    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#sortPresenter.init(this.#sortModel.sort);
    this.#filmsListComponent = new FilmsListView();
    render(this.#filmsListComponent, this.#mainContainer);

    this.#renderFilms(this.films);

    render(this.#filmsContainerComponent, this.#filmsListComponent.element.lastElementChild);

    if (this.films.length > this.#renderedFilmsCount) {
      this.#showMoreButtonPresenter = new ShowMoreButtonPresenter(
        this.#filmsListComponent.element.lastElementChild,
        this.#handleShowMoreButtonClick
      );
      this.#showMoreButtonPresenter.init();
    }
  };

  #renderFilms = (films) => {
    const filmsCount = this.films.length;
    films
      .slice(0, Math.min(filmsCount, this.#renderedFilmsCount))
      .forEach((film) => {
        this.#renderFilm(film);
      });
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsContainerComponent,
      this.#handleViewAction,
    );

    filmPresenter.setFilmCardClickHandler((popupFilm) => {
      this.#handleFilmCardClick(popupFilm);
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #clearFilmsList = ({resetRenderedFilmsCount = false, resetSortType = false} = {}) => {
    const filmsCount = this.films.length;

    remove(this.#filmsListComponent);
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    this.#sortPresenter.destroy();
    if(this.#showMoreButtonPresenter) {
      this.#showMoreButtonPresenter.destroy();
    }

    if (resetRenderedFilmsCount) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#renderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#sortModel.setSort(SortType.DEFAULT);
    }
  };

  #renderNoFilms = () => {
    if(this.#filmsListComponent) {
      remove(this.#filmsListComponent);
    }
    const titleMessageKey = this.#filterType;
    this.#filmsListComponent = new FilmsListView({isEmptyList: NoFilms.TRUE, message: TitleMessage[titleMessageKey]});
    render(this.#filmsListComponent, this.#mainContainer);
  };

  #updatePopupView = (film) => {
    if(!this.#filmPopupPresenter.isRendered) {
      return;
    }
    this.#handleFilmCardClick(film);
  };

  #handleShowMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);

    this.#renderFilms(films);
    this.#renderedFilmsCount = newRenderedFilmsCount;

    if (this.#renderedFilmsCount >= filmsCount) {
      this.#showMoreButtonPresenter.destroy();
    }
  };

  #handleFilmCardClick = (film) => {
    this.#commentsModel.init(film.id)
      .finally(() => {
        this.#filmPopupPresenter.destroy();
        this.#filmPopupPresenter.init({
          ...film,
          popupComments:[...this.#commentsModel.comments]
        });
      });
    this.#popupId = film.id;
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmPopupPresenter.setCommentDeleting(update.commentId);
        try {
          await this.#commentsModel.deleteComment(update.commentId);
          this.#filmsModel.updateFilm(
            updateType,
            {...update.film,
              popupComments: [...this.#commentsModel.comments]
            }
          );
        }catch(err) {
          this.#filmPopupPresenter.setAborting(update.commentId);
        }
        break;
      case UserAction.ADD_COMMENT:
        await this.#commentsModel.addComment(update.userComment, update.id)
          .finally(() => {
            delete update.userComment;
            this.#filmsModel.updateFilm(
              updateType,
              {...update,
                popupComments: [...this.#commentsModel.comments]
              }
            );
          });
        break;
      case UserAction.CHANGE_SORT:
        this.#sortModel.setSort(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MIN:
        this.#clearFilmsList();
        this.#renderFilmsList();
        if(this.#popupId === data.id) {
          this.#updatePopupView(data);
        }
        break;
      case UpdateType.MID:
        this.#clearFilmsList({resetRenderedFilmsCount: true});
        this.#renderFilmsList();
        break;
      case UpdateType.MAX:
        this.#clearFilmsList({resetRenderedFilmsCount: true, resetSortType: true});
        this.#renderFilmsList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearFilmsList();
        this.#renderFilmsList();
        break;
    }
  };
}
