import AbstractView from '../framework/view/abstract-view';
import { NoFilms, TitleMessage } from '../utils/common';

const createFilmsListTemplate = (isEmptyList, titleMessage, isLoading) => (`<section class="films">
    <section class="films-list">
  ${isLoading ?
    `<h2 class="films-list__title">${TitleMessage.LOADING}</h2>` :
    `<h2 class="films-list__title ${isEmptyList ? '' : 'visually-hidden'}">${titleMessage}</h2>`
  }
    </section>

    <!-- extra 'Top rated' -->
    <!-- extra 'Most commented' -->

  </section>`
);

export default class FilmsListView extends AbstractView {
  #isEmptyList = null;
  #titleMessage = null;
  #isLoading = false;

  constructor({isEmptyList = NoFilms.FALSE, message = TitleMessage.DEFAULT, isLoading = false} = {}) {
    super();
    this.#isEmptyList = isEmptyList;
    this.#titleMessage = message;
    this.#isLoading = isLoading;
  }

  get template() {
    return createFilmsListTemplate(this.#isEmptyList, this.#titleMessage, this.#isLoading);
  }
}
