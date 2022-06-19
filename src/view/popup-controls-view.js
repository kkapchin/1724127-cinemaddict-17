import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createPopupControlsTemplate = (userDetails, isDisabled) => {
  const {watchlist, alreadyWatched, favorite} = userDetails;

  return `<section class="film-details__controls">
    <button
      type="button"
      class="
        ${watchlist ? 'film-details__control-button--active' : ''}
        film-details__control-button
        film-details__control-button--watchlist"
      id="watchlist"
      name="watchlist"
      ${isDisabled ? 'disabled' : ''}
    >Add to watchlist</button>
    <button
      type="button"
      class="
        ${alreadyWatched ? 'film-details__control-button--active' : ''}
        film-details__control-button
        film-details__control-button--watched"
      id="watched"
      name="watched"
      ${isDisabled ? 'disabled' : ''}
    >Already watched</button>
    <button
      type="button"
      class="
        ${favorite ? 'film-details__control-button--active' : ''}
        film-details__control-button
        film-details__control-button--favorite"
      id="favorite"
      name="favorite"
      ${isDisabled ? 'disabled' : ''}
    >Add to favorites</button>
  </section>`;
};

export default class PopupControlsView extends AbstractStatefulView {
  #userDetails = null;

  constructor(userDetails) {
    super();
    this.#userDetails = userDetails;
    this._setState({isDisabled: false});
  }

  get template() {
    return createPopupControlsTemplate(this.#userDetails, this._state.isDisabled);
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
