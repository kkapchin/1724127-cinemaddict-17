import { render } from '../framework/render';
import { SortType } from '../utils/sort';
import SortView from '../view/sort-view';

export default class SortPresenter {
  #mainContainer = null;
  #currentSort = null;
  #sortComponent = null;

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (currentSort = SortType.DEFAULT) => {
    this.#currentSort = currentSort;
    this.#renderSort();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSort);
    render(this.#sortComponent, this.#mainContainer);
  };
}
