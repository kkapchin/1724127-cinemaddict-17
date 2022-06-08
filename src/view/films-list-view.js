import { createElement } from '../render';

const createFilmsListTemplate = () => (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>

    <!-- extra 'Top rated' -->
    <!-- extra 'Most commented' -->

  </section>`
);

export default class FilmsListView {
  #element = null;

  get template() {
    return createFilmsListTemplate();
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
