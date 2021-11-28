interface WithCreatedAt {
  createdAt: Date;
}

export const asDateString = (
  obj: WithCreatedAt,
): {
  createdAt: string;
} => ({
  ...obj,
  createdAt: obj.createdAt.toISOString(),
});
