export const SortType = {
  DEFAULT: 'Sort by default',
  DATE: 'Sort by date',
  RATING: 'Sort by rating',
};

export const sortByDate = (a, b) => a.filmInfo.release.date < b.filmInfo.release.date;

export const sortByRating = (a, b) => parseFloat(a.filmInfo.totalRating) < parseFloat(b.filmInfo.totalRating);
