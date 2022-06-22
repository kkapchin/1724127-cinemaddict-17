import AbstractView from '../framework/view/abstract-view';

const createFooterStatsTemplate = (filmsQuantity) => `<p>${filmsQuantity} movies inside</p>`;

export default class FooterStatsView extends AbstractView {
  #filmsQuantity = null;

  constructor(filmsQuantity) {
    super();
    this.#filmsQuantity = filmsQuantity;
  }

  get template() {
    return createFooterStatsTemplate(this.#filmsQuantity);
  }
}
