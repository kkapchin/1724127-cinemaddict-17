import { render, RenderPosition } from '../framework/render';
import { UpdateType } from '../utils/common';
import { FilterType } from '../utils/filter';
import { filterFilms } from '../utils/filter';
import FiltersView from '../view/filters-view';

export default class FiltersPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #filtersModel = null;
  #filterType = null;
  #filtersComponent = null;
  #quantity = {};

  constructor(mainContainer, filmsModel, filtersModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#filterType = this.#filtersModel.filter;
    this.#renderFilters();
  };

  #renderFilters = () => {
    this.#quantity = {
      [FilterType.WATCHLIST]: filterFilms[FilterType.WATCHLIST](this.#filmsModel.films).length,
      [FilterType.HISTORY]: filterFilms[FilterType.HISTORY](this.#filmsModel.films).length,
      [FilterType.FAVORITES]: filterFilms[FilterType.FAVORITES](this.#filmsModel.films).length,
    };

    if(!this.#filtersComponent) {
      this.#filtersComponent = new FiltersView(this.#filterType, this.#quantity);
      this.#filtersComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
      render(this.#filtersComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    this.#filtersComponent.updateElement({filter: this.#filterType, count: this.#quantity});
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAX ,filterType);
  };
}
