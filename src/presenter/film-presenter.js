import { remove, render } from '../framework/render';
import { UpdateType, UserAction } from '../utils/common';
import FilmCardView from '../view/film-card-view';

export default class FilmPresenter {
  #filmCardComponent = null;
  #filmContainer = null;
  #film = {};
  #changeData = null;
  _callback = {};

  constructor(container, changeData) {
    this.#filmContainer = container;
    this.#changeData = changeData;
  }

  init(film) {
    this.#film = film;
    this.#renderFilm();
  }

  update(updatedFilm) {
    this.#film = {...this.#film,...updatedFilm};
    this.#filmCardComponent.updateElement(this.#film);
  }

  setFilmCardClickHandler = (callback) => {
    this._callback.filmCardClick = callback;
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #renderFilm = () => {
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setFilmCardClickHandler((film) => {
      this.#handleFilmCardClick(film);
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

  #handleFilmCardClick = (film) => {
    this._callback.filmCardClick(film);
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
}
