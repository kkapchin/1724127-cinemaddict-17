import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { CommentEmotion } from '../utils/common';

const createEmojiImgTemplate = (emoji) => {
  if(!emoji) {
    return '';
  }
  return `<img src="images/emoji/${emoji}.png" alt="emoji-${emoji}" width="55" height="55"></img>`;
};

const createNewCommentTemplate = (userEmotion, userComment, isDisabled) => {
  const emojiImgTemplate = createEmojiImgTemplate(userEmotion);
  return `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      ${emojiImgTemplate}
    </div>
    <label class="film-details__comment-label">
      <textarea
        class="film-details__comment-input"
        placeholder="Select reaction below and write comment here" name="comment"
        ${isDisabled ? 'disabled' : ''}
      >${userComment ? he.encode(userComment) : ''}</textarea>
    </label>
    <div class="film-details__emoji-list">
      <input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-smile"
        value="smile"
        ${isDisabled ? 'disabled' : ''}
        ${userEmotion === CommentEmotion.SMILE ? 'checked' : ''}
      >
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>
      <input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-sleeping"
        value="sleeping"
        ${isDisabled ? 'disabled' : ''}
        ${userEmotion === CommentEmotion.SLEEPING ? 'checked' : ''}
      >
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>
      <input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-puke"
        value="puke"
        ${isDisabled ? 'disabled' : ''}
        ${userEmotion === CommentEmotion.PUKE ? 'checked' : ''}
      >
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>
      <input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-angry"
        value="angry"
        ${userEmotion === CommentEmotion.ANGRY ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`;
};

export default class NewCommentView extends AbstractStatefulView {
  #userEmotion = null;
  #userComment = '';
  #renderComments = null;
  #renderControls = null;

  constructor(renderComments, renderControls) {
    super();
    this._setState({isDisabled: false});
    this.#renderComments = renderComments;
    this.#renderControls = renderControls;
    this.#setInnerHandlers();
  }

  get template() {
    return createNewCommentTemplate(this.#userEmotion, this.#userComment);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#formSubmitHandler);
  };

  setSubmitting = () => {
    this.updateElement({isDisabled: true});
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.film-details__comment-label')
      .addEventListener('input', this.#userCommentInputHandler);
    this.element
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);
  };

  #userCommentInputHandler = (evt) => {
    evt.preventDefault();
    this.#userComment = evt.target.value;
  };

  #emojiClickHandler = (evt) => {
    if (evt.target.tagName !== 'IMG') {
      return;
    }

    const emotion = evt.target.parentElement.control.defaultValue;
    evt.preventDefault();

    this.#userEmotion = emotion;
    this.updateElement({...this._state});

    //this.#renderComments();
    //this.#renderControls();

    this
      .element
      .querySelector('.film-details__emoji-list')
      .scrollIntoView({ block: 'center'});
  };

  #formSubmitHandler = (evt) => {
    if(evt.ctrlKey === true && evt.key === 'Enter') {
      this._callback.formSubmit({
        comment: this.#userComment,
        emotion: this.#userEmotion
      });
      /* this._callback.formSubmit({
        ...this._state,
        userComment: {
          comment: this.#userComment,
          emotion: this.#userEmotion
        }
      }); */
      document.removeEventListener('keydown', this.#formSubmitHandler);
    }
  };
}
