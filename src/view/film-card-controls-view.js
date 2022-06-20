import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createControlsTemplate = (userDetails, isDisabled) => {
  const {watchlist, alreadyWatched, favorite} = userDetails;
  return `<div class="film-card__controls">
    <button
      class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}"
      type="button"
      ${isDisabled ? 'disabled' : ''}
    >Add to watchlist</button>
    <button
      class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active' : ''}"
      type="button"
      ${isDisabled ? 'disabled' : ''}
    >Mark as watched</button>
    <button
      class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}"
      type="button"
      ${isDisabled ? 'disabled' : ''}
    >Mark as favorite</button>
  </div>`;
};

export default class FilmCardControlsView extends AbstractStatefulView {
  #userDetails = null;

  constructor(userDetails) {
    super();
    this.#userDetails = userDetails;
    this._setState({isDisabled: false});
  }

  get template() {
    return createControlsTemplate(this.#userDetails, this._state.isDisabled);
  }

  setSwitching() {
    this.updateElement({isDisabled: true});
  }

  _restoreHandlers = () => {
    this.setAddToWatchlistClickHandler(this._callback.addToWatchlistClick);
    this.setMarkAsWatchedClickHandler(this._callback.markAsWatchedClick);
    this.setMarkAsFavoriteClickHandler(this._callback.markAsFavoriteClick);
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#addToWatchlistClickHandler);
  };

  setMarkAsWatchedClickHandler = (callback) => {
    this._callback.markAsWatchedClick = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#markAsWatchedClickHandler);
  };

  setMarkAsFavoriteClickHandler = (callback) => {
    this._callback.markAsFavoriteClick = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#markAsFavoriteClickHandler);
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
