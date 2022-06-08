import { getFilm } from '../mock/movies';

export default class FilmsModel {
  FILMS_COUNT = 0;
  #films = Array.from({ length: this.FILMS_COUNT }, getFilm);

  get films() {
    return this.#films;
  }
}
