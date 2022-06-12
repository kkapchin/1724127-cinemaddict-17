import { getRandomInteger } from '../utils/common';
import { nanoid } from 'nanoid';

const getDescription = () => {
  const quantity = getRandomInteger(1, 5);
  const DESCRIPTIONS = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. ',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. ',
    'Aliquam erat volutpat. ',
    'Nunc fermentum tortor ac porta dapibus. ',
    'In rutrum ac purus sit amet tempus. ',
  ];
  return new Array(quantity).fill().map(() => DESCRIPTIONS[getRandomInteger(0, 10)]).join('');
};

const getFilmInfo = () => {
  const titles = [
    'Doctor Strange in the Multiverse of Madness',
    'Thor: Love and Thunder',
    'Black Panther: Wakanda Forever',
    'Guardians of the Galaxy Vol. 3',
    'Ant-Man and the Wasp: Quantumania',
    'Fantastic Four',
    'Spider-Man: No Way Home',
    'Captain America: The First Avenger',
    'The Avengers',
    'Captain America: The Winter Soldier',
    'Guardians of the Galaxy',
    'Avengers: Age of Ultron',
    'Captain America: Civil War',
    'Iron Man',
    'The Incredible Hulk',
    'Iron Man 2',
    'Thor',
    'Iron Man 3',
    'Thor: The Dark World',
    'Ant-Man',
    'Doctor Strange',
    'Guardians of the Galaxy Vol. 2',
    'Spider-Man: Homecoming',
    'Thor: Ragnarok',
    'Black Panther',
    'Avengers: Infinity War',
    'Ant-Man and the Wasp',
    'Captain Marvel',
    'Avengers: Endgame',
    'Spider-Man: Far From Home',
    'Black Widow',
    'Shang-Chi and the Legend of the Ten Rings',
    'Eternals',
  ];

  const posters = [
    'https://m.media-amazon.com/images/M/MV5BYTU3N2Y1NzYtNmU1My00MmYxLTliNjgtNmY5ZmFkY2JlYjA4XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg',
    'https://cdnb.artstation.com/p/assets/images/images/026/816/779/large/tom-burns-thor-poster-smaller.jpg?1589816483',
    'https://pro2-bar-s3-cdn-cf2.myportfolio.com/f44a6a86-6cdb-4ac5-b205-003353cc5a9c/da87c2e9-1d3f-4369-833d-5501c4c0f195.jpg?h=df7ba9417297e05ba4b19b90657e836d',
    'https://cdna.artstation.com/p/assets/images/images/017/881/386/large/joao-vitor-live.jpg?1557706900',
    'https://i.redd.it/sf8ndm64klc71.jpg',
    'https://i.redd.it/ezfzetljn1141.png',
    'https://cdna.artstation.com/p/assets/images/images/039/499/638/large/luke-anderson-all-new-spidey-home.jpg?1626101216',
    'https://m.media-amazon.com/images/I/61QCViCqysL._AC_SL1024_.jpg',
    'https://plaqat.ru/images/23610.jpg',
    'https://www.film.ru/sites/default/files/movies/posters/captain_america_the_winter_soldier_ver20_xlg.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg',
    'https://cdna.artstation.com/p/assets/images/images/037/264/968/large/yuri-untalan-asset.jpg?1619938497',
    'https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTQyNzAwOTUxOF5BMl5BanBnXkFtZTcwMTE0OTc5OQ@@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BYjcyYTk0N2YtMzc4ZC00Y2E0LWFkNDgtNjE1MzZmMGE1YjY1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BNjRmNDI5MjMtMmFhZi00YzcwLWI4ZGItMGI2MjI0N2Q3YmIwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlNS00NjgzLWFmMWEtYmM2Mzc2Zjg3ZjEyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTExZmVjY2ItYTAzYi00MDdlLWFlOWItNTJhMDRjMzQ5ZGY0XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_.jpg',
  ];

  const index = getRandomInteger(0, titles.length - 1);

  return {
    title: titles[index],
    alternativeTitle: 'Alt title',
    totalRating: `${getRandomInteger(7, 9)}.${getRandomInteger(0, 9)}`,
    poster: posters[index],
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano',
      'Kitashi Takeno',
    ],
    actors: [
      'Morgan Freeman',
      'Freegan Morman',
    ],
    release: {
      date: `20${getRandomInteger(10, 99)}-05-11T00:00:00.000Z`,
      releaseCountry: 'USA'
    },
    runtime: getRandomInteger(120, 180),
    genre: [
      'Comedy',
      'Action',
      'Drama',
    ],
    description: getDescription(),
  };
};

export const getFilm = () => ({
  id: nanoid(),
  comments: [
    '42', '43'
  ],
  filmInfo: getFilmInfo(),
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: true
  }
});

export const getFilms = (quantity) => new Array(quantity).fill().map(() => getFilm());
