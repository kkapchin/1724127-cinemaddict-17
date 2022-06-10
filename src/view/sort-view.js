import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../utils/sort';

const createSortTemplate = (sort) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${sort === SortType.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${sort === SortType.DATE ? 'sort__button--active' : ''}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${sort === SortType.RATING ? 'sort__button--active' : ''}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #currentSort = null;

  constructor(sort) {
    super();
    this.#currentSort = sort;
  }

  get template() {
    return createSortTemplate(this.#currentSort);
  }
}
