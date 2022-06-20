import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getDuration } from '../utils/common';

const createFilmPopupTemplate = (film) => {
  const { title, totalRating, genre, description, poster, ageRating, director } = film.filmInfo;
  const writers = film.filmInfo.writers.join(', ');
  const actors = film.filmInfo.actors.join(', ');
  const country = film.filmInfo.release.releaseCountry;
  const [...genres] = genre.map((genreItem) => `<span class="film-details__genre">${genreItem}</span>`);
  const releaseDate = dayjs(film.filmInfo.release.date).format('D MMMM YYYY');
  const duration = getDuration(film.filmInfo.runtime);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${poster} alt="${title} poster">
              <p class="film-details__age">${ageRating}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
                  <td class="film-details__cell">${genres.join(' ')}
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>
            <ul class="film-details__comments-list"></ul>

          </section>
        </div>
      </form>
    </section>`);
};

export default class FilmPopupView extends AbstractStatefulView {
  constructor (film) {
    super();
    this._setState({...film});
  }

  get template() {
    return createFilmPopupTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
  };

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeButtonClickHandler);
  };

  #closeButtonClickHandler = () => {
    this._callback.closeButtonClick();
  };
}
