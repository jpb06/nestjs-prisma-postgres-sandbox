export const newMockedAuthor = {
  name: 'Dan Simmons',
};

export const mockedAuthor = {
  id: 1,
  createdAt: new Date(),
  ...newMockedAuthor,
};

export const mockedUpdatedAuthor = { ...mockedAuthor, name: 'yolo' };

export const mockedAuthors = [
  {
    id: 1,
    name: 'Dan Simmons',
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Alexandre Dumas',
    createdAt: new Date(),
  },
];
