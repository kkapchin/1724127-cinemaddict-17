import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

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

  addComment = async (update, filmId) => {
    try {
      await this.#commentsApiService.addComment(update, filmId);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  };
}
