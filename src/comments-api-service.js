import ApiService from './framework/api-service';

export default class CommentsApiService extends ApiService {
  getComments = async (filmId) => this._load({url: `comments/${filmId}`})
    .then(ApiService.parseResponse);
}
