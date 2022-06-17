import FilmsModel from './model/films-model';
import FiltersModel from './model/filters-model';
import SortModel from './model/sort-model';
import FilmsPresenter from './presenter/films-presenter';
import FiltersPresenter from './presenter/filters-presenter';
import { render } from './render';
import FooterStatsView from './view/footer-statistics-view';
import UserProfileView from './view/user-profile-view';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const filtersModel = new FiltersModel();
const sortModel = new SortModel();

const filtersPresenter = new FiltersPresenter(main, filmsModel, filtersModel);
const filmsPresenter = new FilmsPresenter(
  main,
  filmsModel,
  filtersModel,
  sortModel
);

render(new UserProfileView(), header);
render(new FooterStatsView(), footer);

filmsPresenter.init();
filtersPresenter.init();
