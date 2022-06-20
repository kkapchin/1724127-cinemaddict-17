import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

dayjs.extend(relativeTimePlugin);

const createCommentTemplate = (comment, isDeleting) => {
  const date = dayjs().to(comment.date);
  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete" ${isDeleting ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
      </p>
    </div>
  </li>`
  );
};

export default class CommentView extends AbstractStatefulView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
    this._setState({isDeleting: false});
  }

  get template() {
    return createCommentTemplate(this.#comment, this._state.isDeleting);
  }

  setDeleting() {
    this.updateElement({isDeleting: true});
  }

  _restoreHandlers = () => {
    this.setDeleteButtonClickHandler(this._callback.deleteButtonClick);
  };

  setDeleteButtonClickHandler = (callback) => {
    this._callback.deleteButtonClick = callback;
    this.element
      .querySelector('.film-details__comment-delete')
      .addEventListener('click', this.#deleteButtonClickHandler);
  };

  #deleteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteButtonClick(this.#comment.id);
  };
}
