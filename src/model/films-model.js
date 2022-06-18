import Observable from '../framework/observable';
import { getFilm } from '../mock/films';

export default class FilmsModel extends Observable {
  FILMS_COUNT = 14;
  #films = Array.from({ length: this.FILMS_COUNT }, getFilm);

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      {...this.#films[index],...update},
      ...this.#films.slice(index + 1),
    ];
    this._notify(updateType, this.#films[index]);
  };
}
