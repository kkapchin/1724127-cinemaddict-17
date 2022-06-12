import { render } from '../framework/render';
import { SortType } from '../utils/sort';
import SortView from '../view/sort-view';

export default class SortPresenter {
  #mainContainer = null;
  #currentSort = null;
  #sortComponent = null;
  #changeSort = null;

  constructor(mainContainer, changeSort) {
    this.#mainContainer = mainContainer;
    this.#changeSort = changeSort;
  }

  init = (currentSort = SortType.DEFAULT) => {
    this.#currentSort = currentSort;
    this.#renderSort();
  };

  update(sortType) {
    this.#currentSort = sortType;
    this.#sortComponent.updateElement({sortType});
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSort);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortClick);
    render(this.#sortComponent, this.#mainContainer);
  };

  #handleSortClick = (sortType) => {
    this.#changeSort(sortType);
  };
}
