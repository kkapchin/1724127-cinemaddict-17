import FilmsModel from './model/films-model';
import FilmsPresenter from './presenter/films-presenter';
import { render } from './render';
import FooterStatsView from './view/footer-statistics-view';
import UserProfileView from './view/user-profile-view';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const filmsPresenter = new FilmsPresenter(main, filmsModel);

render(new UserProfileView(), header);
render(new FooterStatsView(), footer);

filmsPresenter.init(filmsModel);
