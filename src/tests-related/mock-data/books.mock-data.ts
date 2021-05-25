export const newMockedBook = {
  idAuthor: 1,
  idCategory: 1,
  name: 'Hyperion',
  publicationDate: 1989,
};

export const mockedBook = {
  id: 1,
  createdAt: new Date(),
  ...newMockedBook,
};

export const mockedUpdatedBook = { ...mockedBook, name: 'yolo' };

export const mockedBooks = [
  {
    id: 1,
    idAuthor: 1,
    idCategory: 1,
    name: 'Hyperion',
    publicationDate: 1989,
    createdAt: new Date(),
  },
  {
    id: 2,
    idAuthor: 2,
    idCategory: 2,
    name: 'The three musketeers',
    publicationDate: 1844,
    createdAt: new Date(),
  },
];
