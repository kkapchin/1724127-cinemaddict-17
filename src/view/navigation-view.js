import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../utils/common';

const createNavigationTemplate = (filter, quantity) => (
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${filter === FilterType.ALL ? 'main-navigation__item--active' : ''}">All movies</a>
    <a href="#watchlist" class="main-navigation__item  ${filter === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${quantity[FilterType.WATCHLIST]}</span></a>
    <a href="#history" class="main-navigation__item  ${filter === FilterType.HISTORY? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${quantity[FilterType.HISTORY]}</span></a>
    <a href="#favorites" class="main-navigation__item  ${filter === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${quantity[FilterType.FAVORITES]}</span></a>
  </nav>`
);

export default class NavigationView extends AbstractView {
  #currentFilter = null;
  #quantity = null;

  constructor(filter, quantity) {
    super();
    this.#currentFilter = filter;
    this.#quantity = quantity;
  }

  get template() {
    return createNavigationTemplate(this.#currentFilter, this.#quantity);
  }
}
