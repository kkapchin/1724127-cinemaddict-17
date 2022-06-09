import AbstractView from '../framework/view/abstract-view';
import { NoFilms, TitleMessage } from '../utils/common';

const createFilmsListTemplate = (isEmptyList, titleMessage) => (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title ${isEmptyList ? '' : 'visually-hidden'}">${titleMessage}</h2>
    </section>

    <!-- extra 'Top rated' -->
    <!-- extra 'Most commented' -->

  </section>`
);

export default class FilmsListView extends AbstractView {
  #isEmptyList = null;
  #titleMessage = null;

  constructor(isEmptyList = NoFilms.FALSE, message = TitleMessage.DEFAULT) {
    super();
    this.#isEmptyList = isEmptyList;
    this.#titleMessage = message;
  }

  get template() {
    return createFilmsListTemplate(this.#isEmptyList, this.#titleMessage);
  }
}
