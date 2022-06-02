import { createElement } from '../render';
import FilmCardView from './film-card';
import ShowMoreButtonView from './show-more-button';

const createFilmsListTemplate = () => {
  const filmCardComponent = new FilmCardView();
  const showMoreButtonComponent = new ShowMoreButtonView();

  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${filmCardComponent.getTemplate()}
        ${filmCardComponent.getTemplate()}
        ${filmCardComponent.getTemplate()}
        ${filmCardComponent.getTemplate()}
        ${filmCardComponent.getTemplate()}
      </div>

      ${showMoreButtonComponent.getTemplate()}
    </section>

    <!-- extra 'Top rated' -->
    <!-- extra 'Most commented' -->

  </section>`;
};

export default class FilmsListView {
  getTemplate() {
    return createFilmsListTemplate();
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
