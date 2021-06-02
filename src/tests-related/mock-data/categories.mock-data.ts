export const newMockedCategory = {
  name: 'Science-Fiction',
};

export const mockedCategory = {
  id: 1,
  createdAt: new Date(),
  ...newMockedCategory,
};

export const mockedUpdatedCategory = { ...mockedCategory, name: 'Cool' };

export const mockedCategories = [
  {
    id: 1,
    name: 'Science-Fiction',
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Adventure',
    createdAt: new Date(),
  },
];
