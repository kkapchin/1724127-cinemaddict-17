import Observable from '../framework/observable';
import { SortType } from '../utils/sort';

export default class SortModel extends Observable {
  #sort = SortType.DEFAULT;

  get sort() {
    return this.#sort;
  }

  setSort = (updateType, sort) => {
    this.#sort = sort;
    this._notify(updateType, sort);
  };
}
