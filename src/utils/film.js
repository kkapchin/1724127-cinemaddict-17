import dayjs from 'dayjs';

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
  ALL: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITES: 'There are no favorite movies now',
  DEFAULT: 'All movies. Upcoming',
};

export const FilterType = {
  ALL: 'ALL',
  WATCHLIST: 'WATCHLIST',
  HISTORY: 'HISTORY',
  FAVORITES: 'FAVORITES',
};

export const NoFilms = {
  TRUE: true,
  FALSE: false,
};
