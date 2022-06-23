export const SortType = {
  DEFAULT: 'Sort by default',
  DATE: 'Sort by date',
  RATING: 'Sort by rating',
};

export const sortFilmsByDate = (a, b) => a.filmInfo.release.date < b.filmInfo.release.date ? 1 : -1;

export const sortFilmsByRating = (a, b) => parseFloat(a.filmInfo.totalRating) < parseFloat(b.filmInfo.totalRating) ? 1 : -1;

export const sortFilmsByCommentsQuantity = (a, b) => a.comments.length < b.comments.length ? 1 : -1;

export const sortCommentsByDate = (a, b) => a.date > b.date ? 1 : -1;
