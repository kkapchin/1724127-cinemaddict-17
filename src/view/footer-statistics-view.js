import { createElement } from '../render';

const createFooterStatsTemplate = () => '<p>130 291 movies inside</p>';

export default class FooterStatsView {
  #element = null;

  get template() {
    return createFooterStatsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
