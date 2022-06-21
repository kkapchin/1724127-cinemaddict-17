import CommentsApiService from './comments-api-service';
import FilmsApiService from './films-api-service';
import CommentsModel from './model/comments-model';
import FilmsModel from './model/films-model';
import FiltersModel from './model/filters-model';
import SortModel from './model/sort-model';
import FilmsPresenter from './presenter/films-presenter';
import FiltersPresenter from './presenter/filters-presenter';
import FooterStatsPresenter from './presenter/footer-stats-presenter';
import UserPresenter from './presenter/user-presenter';

const AUTHORIZATION = 'Basic hj2SkSt4Ycl1Fa7y';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filtersModel = new FiltersModel();
const sortModel = new SortModel();

new UserPresenter(header, filmsModel);
new FooterStatsPresenter(footer, filmsModel);

const filtersPresenter = new FiltersPresenter(main, filmsModel, filtersModel);
const filmsPresenter = new FilmsPresenter(
  main,
  filmsModel,
  filtersModel,
  sortModel,
  commentsModel
);

filmsPresenter.init();
filtersPresenter.init();
filmsModel.init();
