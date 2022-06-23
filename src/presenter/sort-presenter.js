import { remove, render } from '../framework/render';
import { UpdateType, UserAction } from '../utils/common';
import { SortType } from '../utils/sort';
import SortView from '../view/sort-view';

export default class SortPresenter {
  #mainContainer = null;
  #sortType = null;
  #sortComponent = null;
  #changeSort = null;

  constructor(mainContainer, changeSort) {
    this.#mainContainer = mainContainer;
    this.#changeSort = changeSort;
  }

  init = (sortType = SortType.DEFAULT) => {
    this.#sortType = sortType;
    this.#renderSort();
  };

  destroy = () => {
    remove(this.#sortComponent);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#sortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#mainContainer);
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#sortType === sortType) {
      return;
    }
    this.#changeSort(UserAction.CHANGE_SORT, UpdateType.MID, sortType);
  };
}
