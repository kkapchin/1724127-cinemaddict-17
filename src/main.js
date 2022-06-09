import FilmsModel from './model/films-model';
import FilmsPresenter from './presenter/films-presenter';
import { render } from './render';
import FooterStatsView from './view/footer-statistics-view';
//import NavigationView from './view/navigation-view';
import SortView from './view/sort-view';
import UserProfileView from './view/user-profile-view';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');

const filmsPresenter = new FilmsPresenter(main);
const filmsModel = new FilmsModel();

render(new UserProfileView(), header);
//render(new NavigationView(), main);
render(new SortView(), main);
render(new FooterStatsView(), footer);

filmsPresenter.init(filmsModel);
