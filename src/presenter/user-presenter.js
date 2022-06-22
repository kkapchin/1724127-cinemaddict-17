import { remove, render } from '../framework/render';
import { UpdateType } from '../utils/common';
import UserProfileView from '../view/user-profile-view';

export default class UserPresenter {
  #headerContainer = null;
  #userProfileComponent = null;
  #filmsModel = null;
  #userLevel = null;

  constructor(headerContainer, filmsModel) {
    this.#headerContainer = headerContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#calculateUserLevel();
    if(this.#userLevel !== null) {
      this.#userProfileComponent = new UserProfileView(this.#userLevel);
      render(this.#userProfileComponent, this.#headerContainer);
    }
  };

  #calculateUserLevel = () => {
    const filmsWatched = this.#filmsModel
      .films
      .filter((film) => film.userDetails.alreadyWatched === true)
      .length;
    if(filmsWatched === 0) {
      this.#userLevel = null;
      return;
    }
    if(filmsWatched > 0 && filmsWatched <= 10) {
      this.#userLevel = 'Novice';
      return;
    }
    if(filmsWatched > 10 && filmsWatched <= 20) {
      this.#userLevel = 'Fan';
      return;
    }
    if(filmsWatched > 20) {
      this.#userLevel = 'MovieBuff';
    }
  };

  #handleModelEvent = (updateType) => {
    if(updateType !== UpdateType.INIT) {
      remove(this.#userProfileComponent);
    }
    this.init();
  };
}
