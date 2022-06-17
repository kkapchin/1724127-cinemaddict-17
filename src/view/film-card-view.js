import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getDuration } from '../utils/common';

const createFilmCardTemplate = (film) => {
  const { title, totalRating, genre, description, poster } = film.filmInfo;
  const { watchlist, alreadyWatched, favorite } = film.userDetails;
  const comments = film.comments;
  const releaseYear = dayjs(film.filmInfo.release.date).format('YYYY');
  const duration = getDuration(film.filmInfo.runtime);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseYear}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src=${poster} alt="" class="film-card__poster">
        <p class="film-card__description">${description.length > 140 ? `${description.slice(0, 138)}...` : description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._setState(film);
  }

  get template() {
    return createFilmCardTemplate(this._state);
  }

  setFilmCardClickHandler = (callback) => {
    this._callback.filmCardClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#addToWatchlistClickHandler);
  };

  setMarkAsWatchedClickHandler = (callback) => {
    this._callback.markAsWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#markAsWatchedClickHandler);
  };

  setMarkAsFavoriteClickHandler = (callback) => {
    this._callback.markAsFavoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#markAsFavoriteClickHandler);
  };

  _restoreHandlers = () => {
    this.setFilmCardClickHandler(this._callback.filmCardClick);
    this.setAddToWatchlistClickHandler(this._callback.addToWatchlistClick);
    this.setMarkAsWatchedClickHandler(this._callback.markAsWatchedClick);
    this.setMarkAsFavoriteClickHandler(this._callback.markAsFavoriteClick);
  };

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmCardClick(this._state);
  };

  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  };

  #markAsWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.markAsWatchedClick();
  };

  #markAsFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.markAsFavoriteClick();
  };
}
