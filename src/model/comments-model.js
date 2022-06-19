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

  deleteComment = async (update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(update);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

  addComment = async (update, filmId) => {
    try {
      await this.#commentsApiService.addComment(update, filmId);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  };
}
