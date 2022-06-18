import { remove, render } from '../framework/render';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class ShowMoreButtonPresenter {
  #container = null;
  #buttonComponent = null;

  constructor(container, callback) {
    this.#container = container;
    this._callback = callback;
  }

  init() {
    this.#buttonComponent = new ShowMoreButtonView();
    this.#buttonComponent.setClickHandler(this.#handleButtonClick);
    render(this.#buttonComponent, this.#container);
  }

  destroy() {
    remove(this.#buttonComponent);
  }

  #handleButtonClick = () => {
    this._callback();
  };
}
