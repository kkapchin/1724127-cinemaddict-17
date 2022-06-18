import Observable from '../framework/observable';
import { getComment } from '../mock/comment';
import { getRandomInteger } from '../utils/common';

const DEFAULT_USER_COMMENT = { emotion: null, comment: '' };

export default class CommentsModel extends Observable {
  #filmId = null;
  #comments = [];
  #userComment = DEFAULT_USER_COMMENT;

  constructor(filmId) {
    super();
    this.#filmId = filmId;
    this.#comments = [...new Array(getRandomInteger(3, 5)).fill().map(() => getComment(this.#filmId))];
  }

  get comments() {
    return this.#comments;
  }

  get userComment() {
    return this.#userComment;
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
  };

  updateUserComment = (update) => {
    this.#userComment = {...this.#userComment, ...update};
  };

  addComment = (update) => {
    this.#comments.push({
      ...getComment(this.#filmId),
      ...update
    });
    this.#userComment = DEFAULT_USER_COMMENT;
  };
}
