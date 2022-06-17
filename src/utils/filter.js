export const FilterType = {
  DEFAULT: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

export const filterFilms = {
  [FilterType.DEFAULT]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist === true),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched === true),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite === true),
};
