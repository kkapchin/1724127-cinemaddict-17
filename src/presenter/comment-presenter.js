import { render } from '../framework/render';
import CommentView from '../view/comment-view';

export default class CommentPresenter {
  #comment = null;
  #container = null;
  #commentComponent = null;
  #handleDeleteCommentClick = null;

  constructor(container, handleDeleteCommentClick) {
    this.#container = container;
    this.#handleDeleteCommentClick = handleDeleteCommentClick;
  }

  init = (comment) => {
    this.#comment = comment;
    this.#renderComment();
  };

  #renderComment = () => {
    this.#commentComponent = new CommentView(this.#comment);
    this.#commentComponent.setDeleteButtonClickHandler(this.#deleteButtonClickHandler);
    render(this.#commentComponent, this.#container);
  };

  #deleteButtonClickHandler = () => {
    this.#handleDeleteCommentClick();
  };
}

