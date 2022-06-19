import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = {...film,
      'user_details': {...film['userDetails'],
        'already_watched': film['userDetails']['alreadyWatched'],
        'watching_date': film['userDetails']['watchingDate']
      },
      'film_info': {...film['filmInfo'],
        'age_rating': film['filmInfo']['ageRating'],
        'alternative_title': film['filmInfo']['alternativeTitle'],
        'total_rating': film['filmInfo']['totalRating'],
        release: {...film['filmInfo']['release'],
          'release_country': film['filmInfo']['release']['releaseCountry']
        }
      },

    };

    delete adaptedFilm['userDetails'];
    delete adaptedFilm['user_details']['alreadyWatched'];
    delete adaptedFilm['user_details']['watchingDate'];
    delete adaptedFilm['filmInfo'];
    delete adaptedFilm['film_info']['ageRating'];
    delete adaptedFilm['film_info']['alternativeTitle'];
    delete adaptedFilm['film_info']['totalRating'];
    delete adaptedFilm['film_info']['release']['releaseCountry'];

    return adaptedFilm;
  };
}
