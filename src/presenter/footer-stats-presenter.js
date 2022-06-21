import { render } from '../framework/render';
import { UpdateType } from '../utils/common';
import FooterStatsView from '../view/footer-stats-view';

export default class FooterStatsPresenter {
  #footerContainer = null;
  #filmsModel = null;
  #footerStatsComponent = null;

  constructor(footerContainer, filmsModel) {
    this.#footerContainer = footerContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const filmsQuantity = this.#filmsModel.films.length;
    this.#footerStatsComponent = new FooterStatsView(new Intl.NumberFormat('ru-RU').format(filmsQuantity));
    render(this.#footerStatsComponent, this.#footerContainer);
  };

  #handleModelEvent = (updateType) => {
    if(updateType !== UpdateType.INIT) {
      return;
    }
    this.init();
  };
}
