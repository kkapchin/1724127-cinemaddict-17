import ApiService from './framework/api-service';
import { Method } from './utils/common';

export default class CommentsApiService extends ApiService {
  getComments = async (filmId) => this._load({url: `comments/${filmId}`})
    .then(ApiService.parseResponse);

  addComment = async (comment, filmId) => {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
