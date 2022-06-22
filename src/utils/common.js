import dayjs from 'dayjs';
import { FilterType } from './filter';

export const getDuration = (minutes) => {
  const duration = dayjs().hour(0).minute(minutes);
  if(minutes > 59) {
    return `${duration.format('h')}h ${duration.format('mm')}m`;
  }

  if(minutes < 10) {
    return `${duration.format('m')}m`;
  }

  return `${duration.format('mm')}m`;
};

export const TitleMessage = {
  [FilterType.DEFAULT]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
  LOADING: 'Loading...',
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented',
};

export const NoFilms = {
  TRUE: true,
  FALSE: false,
};

export const MarkButton = {
  WATCHLIST: 'Add to watchlist',
  WATCHED: 'Mark as watched',
  FAVORITE: 'Mark as favorite',
};

export const CommentEmotion = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

export const UpdateType = {
  MIN: 'MIN',
  MID: 'MID',
  MAX: 'MAX',
  INIT: 'INIT',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  UPDATE_POPUP: 'UPDATE_POPUP',
  UPDATE_USER_COMMENT: 'UPDATE_USER_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  CHANGE_SORT: 'CHANGE_SORT',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};
