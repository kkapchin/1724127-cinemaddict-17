import { render, RenderPosition } from '../framework/render';
import { FilterType } from '../utils/common';
import { filter } from '../utils/filter';
import NavigationView from '../view/navigation-view';

export default class NavigationPresenter {
  #mainContainer = null;
  #films = [];
  #currentFilter = null;
  #navigationComponent = null;
  #quantity = {};

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (films, currentFilter = FilterType.ALL) => {
    this.#films = [...films];
    this.#currentFilter = currentFilter;
    this.#renderNavigation();
  };

  #renderNavigation = () => {
    /* if(this.#navigationComponent) {
      this.#navigationComponent = null;
    } */
    this.#quantity = {
      [FilterType.WATCHLIST]: filter.WATCHLIST(this.#films).length,
      [FilterType.HISTORY]: filter.HISTORY(this.#films).length,
      [FilterType.FAVORITES]: filter.FAVORITES(this.#films).length,
    };

    this.#navigationComponent = new NavigationView(this.#currentFilter, this.#quantity);
    render(this.#navigationComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  };
}
