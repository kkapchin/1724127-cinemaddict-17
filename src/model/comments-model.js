import Observable from '../framework/observable';
import { getComment } from '../mock/comment';

const DEFAULT_USER_COMMENT = { emotion: null, comment: '' };

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #filmId = null;
  #comments = [];
  #userComment = DEFAULT_USER_COMMENT;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (filmId) => {
    try {
      this.#comments = await this.#commentsApiService.getComments(filmId);
    } catch(err) {
      this.#comments = [];
    }
  };

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
