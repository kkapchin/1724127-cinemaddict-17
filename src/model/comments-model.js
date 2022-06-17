import Observable from '../framework/observable';
import { getComment } from '../mock/comment';
import { getRandomInteger } from '../utils/common';

export default class CommentsModel extends Observable {
  #filmId = null;
  #comments = [];

  constructor(filmId) {
    super();
    this.#filmId = filmId;
    this.#comments = [...new Array(getRandomInteger(3, 5)).fill().map(() => getComment(this.#filmId))];
  }

  get comments() {
    return this.#comments;
  }

  deleteComment = (update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
    //this._notify(updateType, {id: update.filmId, comments: this.#comments});
  };
}
