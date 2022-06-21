import AbstractView from '../framework/view/abstract-view';

const createUserProfileTemplate = (userLevel) => {
  if(!userLevel) {
    return null;
  }
  return `<section class="header__profile profile">
    <p class="profile__rating">${userLevel}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserProfileView extends AbstractView {
  #userLevel = null;

  constructor(userLevel) {
    super();
    this.#userLevel = userLevel;
  }

  get template() {
    return createUserProfileTemplate(this.#userLevel);
  }
}
