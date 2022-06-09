import AbstractView from '../framework/view/abstract-view';

const createFooterStatsTemplate = () => '<p>130 291 movies inside</p>';

export default class FooterStatsView extends AbstractView {

  get template() {
    return createFooterStatsTemplate();
  }
}
