import { getFilm } from '../mock/films';

export default class FilmsModel {
  FILMS_COUNT = 14;
  #films = Array.from({ length: this.FILMS_COUNT }, getFilm);

  get films() {
    return this.#films;
  }
}
