import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { FilterType } from '../utils/filter';

const createFiltersTemplate = (filter, count) => (
  `<nav class="main-navigation">
    <a
      href="#all"
      class="main-navigation__item ${filter === FilterType.DEFAULT ? 'main-navigation__item--active' : ''}"
      data-filter-type="${FilterType.DEFAULT}"
    >All movies</a>
    <a
      href="#watchlist"
      class="main-navigation__item  ${filter === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}"
      data-filter-type="${FilterType.WATCHLIST}"
    >Watchlist
      <span
        class="main-navigation__item-count"
      >${count[FilterType.WATCHLIST]}</span></a>
    <a
      href="#history"
      class="main-navigation__item  ${filter === FilterType.HISTORY? 'main-navigation__item--active' : ''}"
      data-filter-type="${FilterType.HISTORY}"
    >History
      <span
        class="main-navigation__item-count"
      >${count[FilterType.HISTORY]}</span></a>
    <a
      href="#favorites"
      class="main-navigation__item  ${filter === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}"
      data-filter-type="${FilterType.FAVORITES}"
    >Favorites
      <span
        class="main-navigation__item-count"
      >${count[FilterType.FAVORITES]}</span></a>
  </nav>`
);

export default class FiltersView extends AbstractStatefulView {
  constructor(filter, count) {
    super();
    this._setState({filter, count});
  }

  get template() {
    return createFiltersTemplate(this._state.filter, this._state.count);
  }

  _restoreHandlers = () => {
    this.setFilterTypeChangeHandler(this._callback.filterTypeChange);
  };

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName === 'NAV') {
      return;
    }

    if (evt.target.tagName === 'SPAN') {
      evt.preventDefault();
      this._callback.filterTypeChange(evt.target.parentElement.dataset.filterType);
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };
}
