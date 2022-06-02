import { createElement } from '../render';

const createFooterStatsTemplate = () => '<p>130 291 movies inside</p>';

export default class FooterStatsView {
  getTemplate() {
    return createFooterStatsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
