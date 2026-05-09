export function paginate(page: number = 1, limit: number = 10) {
  const take = Number(limit);
  const skip = (Number(page) - 1) * take;

  return {
    skip,
    take,
  };
}

export function paginationMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
