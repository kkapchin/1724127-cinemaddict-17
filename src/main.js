import { render, RenderPosition } from './render';
import FilmsListView from './view/films-list';
import FooterStatsView from './view/footer-statistics';
import NavigationView from './view/navigation';
import SortView from './view/sort';
import UserProfileView from './view/user-profile';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');

render(new UserProfileView(), header, RenderPosition.BEFOREEND);
render(new SortView(), main, RenderPosition.AFTERBEGIN);
render(new NavigationView(), main, RenderPosition.AFTERBEGIN);
render(new FilmsListView(), main, RenderPosition.BEFOREEND);
render(new FooterStatsView(), footer, RenderPosition.AFTERBEGIN);
