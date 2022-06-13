export const SortType = {
  DEFAULT: 'Sort by default',
  DATE: 'Sort by date',
  RATING: 'Sort by rating',
};

export const sortFilmsByDate = (a, b) => a.filmInfo.release.date < b.filmInfo.release.date;

export const sortFilmsByRating = (a, b) => parseFloat(a.filmInfo.totalRating) < parseFloat(b.filmInfo.totalRating);

export const sortCommentsByDate = (a, b) => a.date > b.date;
