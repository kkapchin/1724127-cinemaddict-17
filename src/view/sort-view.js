import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { SortType } from '../utils/sort';

const createSortTemplate = (sort) => (
  `<ul class="sort">
    <li>
      <a href="#"
        class="sort__button ${sort === SortType.DEFAULT ? 'sort__button--active' : ''}"
        data-sort-type="${SortType.DEFAULT}">
        Sort by default
      </a>
    </li>
    <li>
      <a href="#"
        class="sort__button ${sort === SortType.DATE ? 'sort__button--active' : ''}"
        data-sort-type="${SortType.DATE}">
        Sort by date
      </a>
    </li>
    <li>
      <a href="#"
        class="sort__button ${sort === SortType.RATING ? 'sort__button--active' : ''}"
        data-sort-type="${SortType.RATING}">
        Sort by rating
      </a>
    </li>
  </ul>`
);

export default class SortView extends AbstractStatefulView {
  constructor(sortType) {
    super();
    this._setState({sortType});
  }

  get template() {
    return createSortTemplate(this._state.sortType);
  }

  _restoreHandlers = () => {
    this.setSortTypeChangeHandler(this._callback.sortTypeChange);
  };

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
