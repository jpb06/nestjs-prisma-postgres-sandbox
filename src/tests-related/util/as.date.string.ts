interface WithCreatedAt {
  createdAt: Date;
}

export const asDateString = (obj: WithCreatedAt) => ({
  ...obj,
  createdAt: obj.createdAt.toISOString(),
});
