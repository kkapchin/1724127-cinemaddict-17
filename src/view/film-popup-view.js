import he from 'he';
import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { CommentEmotion, getDuration } from '../utils/common';

const createEmojiImgTemplate = (emoji) => {
  if(!emoji) {
    return '';
  }
  return `<img src="images/emoji/${emoji}.png" alt="emoji-${emoji}" width="55" height="55"></img>`;
};

const createFilmPopupTemplate = (film, userEmotion, userComment) => {
  const { title, totalRating, genre, description, poster, ageRating, director } = film.filmInfo;
  const { watchlist, alreadyWatched, favorite } = film.userDetails;
  const writers = film.filmInfo.writers.join(', ');
  const actors = film.filmInfo.actors.join(', ');
  const country = film.filmInfo.release.releaseCountry;
  const [...genres] = genre.map((genreItem) => `<span class="film-details__genre">${genreItem}</span>`);
  //const comments = film.comments;
  const releaseDate = dayjs(film.filmInfo.release.date).format('D MMMM YYYY');
  const duration = getDuration(film.filmInfo.runtime);
  const emojiImgTemplate = createEmojiImgTemplate(userEmotion);
  //console.log(film.userComment.emotion)
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
          <section class="film-details__controls">
            <button
              type="button"
              class="
                ${watchlist ? 'film-details__control-button--active' : ''}
                film-details__control-button
                film-details__control-button--watchlist"
              id="watchlist"
              name="watchlist">Add to watchlist</button>
            <button
              type="button"
              class="
                ${alreadyWatched ? 'film-details__control-button--active' : ''}
                film-details__control-button
                film-details__control-button--watched"
              id="watched"
              name="watched">Already watched</button>
            <button
              type="button"
              class="
                ${favorite ? 'film-details__control-button--active' : ''}
                film-details__control-button
                film-details__control-button--favorite"
              id="favorite"
              name="favorite">Add to favorites</button>
          </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>
            <ul class="film-details__comments-list"></ul>
            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
                ${emojiImgTemplate}
              </div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${userComment ? he.encode(userComment) : ''}</textarea>
              </label>
              <div class="film-details__emoji-list">
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-smile"
                  value="smile"
                  ${userEmotion === CommentEmotion.SMILE ? 'checked' : ''}
                >
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-sleeping"
                  value="sleeping"
                  ${userEmotion === CommentEmotion.SLEEPING ? 'checked' : ''}
                >
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-puke"
                  value="puke"
                  ${userEmotion === CommentEmotion.PUKE ? 'checked' : ''}
                >
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-angry"
                  value="angry"
                  ${userEmotion === CommentEmotion.ANGRY ? 'checked' : ''}
                >
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`);
};

export default class FilmPopupView extends AbstractStatefulView {
  #userEmotion = null;
  #userComment = '';

  constructor (film) {
    super();
    this._setState({...film});
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmPopupTemplate(this._state, this.#userEmotion, this.#userComment);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setAddToWatchlistClickHandler(this._callback.addToWatchlistClick);
    this.setMarkAsWatchedClickHandler(this._callback.markAsWatchedClick);
    this.setMarkAsFavoriteClickHandler(this._callback.markAsFavoriteClick);
    this.setEmojiClickHandler(this._callback.emojiClick);
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.film-details__comment-label')
      .addEventListener('input', this.#userCommentInputHandler);
    this.element
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#formSubmitHandler);
  };

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeButtonClickHandler);
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#addToWatchlistClickHandler);
  };

  setMarkAsWatchedClickHandler = (callback) => {
    this._callback.markAsWatchedClick = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#markAsWatchedClickHandler);
  };

  setMarkAsFavoriteClickHandler = (callback) => {
    this._callback.markAsFavoriteClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#markAsFavoriteClickHandler);
  };

  setEmojiClickHandler = (callback) => {
    this._callback.emojiClick = callback;
    this._callback.renderComments = callback;
    this.element
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);
  };

  #userCommentInputHandler = (evt) => {
    evt.preventDefault();
    this.#userComment = evt.target.value;
  };

  #formSubmitHandler = (evt) => {
    if(evt.ctrlKey === true && evt.key === 'Enter') {
      this._callback.formSubmit({
        ...this._state,
        userComment: {
          comment: this.#userComment,
          emotion: this.#userEmotion
        }
      });
      document.removeEventListener('keydown', this.#formSubmitHandler);
    }
  };

  #closeButtonClickHandler = () => {
    this._callback.closeButtonClick();
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

  #emojiClickHandler = (evt) => {
    if (evt.target.tagName !== 'IMG') {
      return;
    }

    const emotion = evt.target.parentElement.control.defaultValue;
    evt.preventDefault();

    this.#userEmotion = emotion;
    this.updateElement({...this._state});

    this._callback.renderComments();

    this
      .element
      .querySelector('.film-details__emoji-list')
      .scrollIntoView({ block: 'center'});
  };
}
