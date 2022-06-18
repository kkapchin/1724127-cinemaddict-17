import dayjs from 'dayjs';
import { FilterType } from './filter';

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
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
  MAX: 'MAX'
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  UPDATE_POPUP: 'UPDATE_POPUP',
  UPDATE_USER_COMMENT: 'UPDATE_USER_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  CHANGE_SORT: 'CHANGE_SORT',
};
