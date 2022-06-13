import { getRandomInteger } from '../utils/common';

const authors = [
  'Goblin Puchkov',
  'Эйдан Ягерь',
  'Bilbo Fett',
  'Boba Baggins',
  'Альбус Олорин Думбельдорр',
  'Эйприл О\'Нил'
];

const comments = [
  'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost four hours? Seriously?',
  'АВЕНЖЕЕЕРС, ... АСЕМБЛ!!!'
];

const emotions = [
  'smile',
  'smile',
  'sleeping',
  'sleeping',
  'puke',
  'angry'
];


export const getComment = (id) => {
  const index = getRandomInteger(0, 5);

  return {
    id: id,
    author: authors[index],
    comment: comments[index],
    date: `20${getRandomInteger(10, 99)}-02-02T21:59:32.554Z`,
    emotion: emotions[index],
  };
};
