import { createElement } from '../render';
import { NoFilms, TitleMessage } from '../utils/film';

const createFilmsListTemplate = (isEmptyList, titleMessage) => (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title ${isEmptyList ? '' : 'visually-hidden'}">${titleMessage}</h2>
    </section>

    <!-- extra 'Top rated' -->
    <!-- extra 'Most commented' -->

  </section>`
);

export default class FilmsListView {
  #element = null;
  #isEmptyList = null;
  #titleMessage = null;

  constructor(isEmptyList = NoFilms.FALSE, message = TitleMessage.DEFAULT) {
    this.#isEmptyList = isEmptyList;
    this.#titleMessage = message;
  }

  get template() {
    return createFilmsListTemplate(this.#isEmptyList, this.#titleMessage);
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
