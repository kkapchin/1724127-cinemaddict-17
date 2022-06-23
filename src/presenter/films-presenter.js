import { remove, render } from '../framework/render';
import { NoFilms, TitleMessage, UpdateType, UserAction } from '../utils/common';
import { filterFilms, FilterType } from '../utils/filter';
import { sortFilmsByCommentsQuantity, sortFilmsByDate, sortFilmsByRating, SortType } from '../utils/sort';
import FilmsContainerView from '../view/films-container-view';
import FilmsListContainerView from '../view/films-list-container-view';
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
  #topRatedPresenter = new Map();
  #mostCommentedPresenter = new Map();

  #mainContainer = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #topRatedContainerComponent = new FilmsListContainerView();
  #mostCommentedContainerComponent = new FilmsListContainerView();
  #filmsListComponent = null;
  #topRatedListComponent = null;
  #mostCommentedListComponent = null;

  #commentsModel = null;
  #filmsModel = null;
  #filtersModel = null;
  #sortModel = null;

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filterType = FilterType.DEFAULT;
  #sortType = SortType.DEFAULT;
  #isLoading = true;
  #popupId = null;
  #sourcedFilms = [];

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
    this.#sourcedFilms = this.#filmsModel.films;
    const filteredFilms = filterFilms[this.#filterType](this.#sourcedFilms);

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
    this.#renderFilms();
  };

  #renderTopRated = () => {
    const topRatedFilms = this.#sourcedFilms
      .filter((film) => parseFloat(film.filmInfo.totalRating) !== 0)
      .sort(sortFilmsByRating)
      .slice(0, 2);
    if(topRatedFilms.length === 0) {
      return;
    }
    topRatedFilms.map((film) => {
      const topRatedFilmPresenter = new FilmPresenter(this.#topRatedContainerComponent, this.#handleViewAction);
      topRatedFilmPresenter.setFilmCardClickHandler((popupFilm) => {
        this.#handleFilmCardClick(popupFilm);
      });

      topRatedFilmPresenter.init(film);
      this.#topRatedPresenter.set(film.id, topRatedFilmPresenter);
    });
    this.#topRatedListComponent = new FilmsListView({isEmptyList: true, message: TitleMessage.TOP_RATED});
    this.#topRatedListComponent.element.classList.add('films-list--extra');

    render(this.#topRatedContainerComponent, this.#topRatedListComponent.element);
    render(this.#topRatedListComponent, this.#filmsContainerComponent.element);
  };

  #renderMostCommented = () => {
    const mostCommentedFilms = this.#sourcedFilms
      .filter((film) => film.comments.length !== 0)
      .sort(sortFilmsByCommentsQuantity)
      .slice(0, 2);
    if(mostCommentedFilms.length === 0) {
      return;
    }
    mostCommentedFilms.map((film) => {
      const mostCommentedFilmPresenter = new FilmPresenter(this.#mostCommentedContainerComponent, this.#handleViewAction);
      mostCommentedFilmPresenter.setFilmCardClickHandler((popupFilm) => {
        this.#handleFilmCardClick(popupFilm);
      });

      mostCommentedFilmPresenter.init(film);
      this.#mostCommentedPresenter.set(film.id, mostCommentedFilmPresenter);
    });
    this.#mostCommentedListComponent = new FilmsListView({isEmptyList: true, message: TitleMessage.MOST_COMMENTED});
    this.#mostCommentedListComponent.element.classList.add('films-list--extra');

    render(this.#mostCommentedContainerComponent, this.#mostCommentedListComponent.element);
    render(this.#mostCommentedListComponent, this.#filmsContainerComponent.element);
  };

  #renderFilms = () => {
    if(this.#isLoading === true) {
      this.#filmsListComponent = new FilmsListView({isLoading: this.#isLoading});
      render(this.#filmsListComponent, this.#filmsContainerComponent.element);
      return;
    }

    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#sortPresenter.init(this.#sortModel.sort);
    this.#filmsListComponent = new FilmsListView();
    render(this.#filmsListComponent, this.#filmsContainerComponent.element);

    this.#renderFilmCards(this.films);

    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    if (this.films.length > this.#renderedFilmsCount) {
      this.#showMoreButtonPresenter = new ShowMoreButtonPresenter(
        this.#filmsListComponent.element,
        this.#handleShowMoreButtonClick
      );
      this.#showMoreButtonPresenter.init();
    }

    this.#renderTopRated();
    this.#renderMostCommented();
    render(this.#filmsContainerComponent, this.#mainContainer);
  };

  #renderFilmCards = (films) => {
    const filmsCount = this.films.length;
    films
      .slice(0, Math.min(filmsCount, this.#renderedFilmsCount))
      .forEach((film) => {
        this.#renderFilm(film);
      });
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsListContainerComponent,
      this.#handleViewAction,
    );

    filmPresenter.setFilmCardClickHandler((popupFilm) => {
      this.#handleFilmCardClick(popupFilm);
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #clearFilms = ({resetRenderedFilmsCount = false, resetSortType = false} = {}) => {
    const filmsCount = this.films.length;

    remove(this.#filmsListComponent);
    remove(this.#topRatedListComponent);
    remove(this.#mostCommentedListComponent);
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#topRatedPresenter.forEach((presenter) => presenter.destroy());
    this.#topRatedPresenter.clear();
    this.#mostCommentedPresenter.forEach((presenter) => presenter.destroy());
    this.#mostCommentedPresenter.clear();

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

    this.#renderFilmCards(films);
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
        if(this.#filmPopupPresenter.isRendered) {
          this.#filmPopupPresenter.setControlsSwitching();
        }
        if(this.#filmPresenter.has(update.id)) {
          this.#filmPresenter.get(update.id).setControlsSwitching();
        }
        if(this.#topRatedPresenter.has(update.id)) {
          this.#topRatedPresenter.get(update.id).setControlsSwitching();
        }
        if(this.#mostCommentedPresenter.has(update.id)) {
          this.#mostCommentedPresenter.get(update.id).setControlsSwitching();
        }
        try {
          await this.#filmsModel.updateFilm(updateType, update);
        } catch(err) {
          if(this.#filmPopupPresenter.isRendered) {
            this.#filmPopupPresenter.setControlSwitchAborting();
          }
          if(this.#filmPresenter.has(update.id)) {
            this.#filmPresenter.get(update.id).setControlSwitchAborting();
          }
          if(this.#topRatedPresenter.has(update.id)) {
            this.#topRatedPresenter.get(update.id).setControlSwitchAborting();
          }
          if(this.#mostCommentedPresenter.has(update.id)) {
            this.#mostCommentedPresenter.get(update.id).setControlSwitchAborting();
          }
        }
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
          this.#filmPopupPresenter.setCommentDeleteAborting(update.commentId);
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#filmPopupPresenter.setCommentAdding();
        try {
          await this.#commentsModel.addComment(update.userComment, update.film.id);
          this.#filmsModel.updateFilm(
            updateType,
            {...update.film,
              popupComments: [...this.#commentsModel.comments]
            }
          );
        } catch(err) {
          this.#filmPopupPresenter.setCommentAddAborting();
        }
        break;
      case UserAction.CHANGE_SORT:
        this.#sortModel.setSort(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MIN:
        this.#clearFilms();
        this.#renderFilms();
        if(this.#filmPopupPresenter.isRendered) {
          this.#filmPopupPresenter.setControlsEnabled();
        }
        if(this.#popupId === data.id) {
          this.#updatePopupView(data);
        }
        break;
      case UpdateType.MID:
        this.#clearFilms({resetRenderedFilmsCount: true});
        this.#renderFilms();
        break;
      case UpdateType.MAX:
        this.#clearFilms({resetRenderedFilmsCount: true, resetSortType: true});
        this.#renderFilms();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearFilms();
        this.#renderFilms();
        break;
    }
  };
}
