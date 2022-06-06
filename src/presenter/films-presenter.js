import { render, RenderPosition } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {
  filmsListComponent = new FilmsListView();
  showMoreButtonComponent = new ShowMoreButtonView();
  filmsContainerComponent = new FilmsContainerView();

  constructor(mainContainer) {
    this.mainContainer = mainContainer;
  }

  init = (filmsModel) => {
    this.filmsModel = filmsModel;

    render(this.filmsListComponent, this.mainContainer);

    for (const film of this.filmsModel.getFilms()) {
      render(new FilmCardView(film), this.filmsContainerComponent.getElement(), RenderPosition.AFTERBEGIN);
    }

    render(this.filmsContainerComponent, this.filmsListComponent.getElement().lastElementChild);
    render(this.showMoreButtonComponent, this.filmsListComponent.getElement().lastElementChild);
  };
}
