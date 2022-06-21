import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getDuration } from '../utils/common';

const createFilmCardTemplate = (film) => {
  const { title, totalRating, genre, description, poster } = film.filmInfo;
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
    this.element
      .querySelector('.film-card__link')
      .addEventListener('click', this.#filmCardClickHandler);
  };

  _restoreHandlers = () => {
    this.setFilmCardClickHandler(this._callback.filmCardClick);
  };

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmCardClick(this._state);
  };
}
