export interface ListResponse<T> {
  data: T;
  paginator: Paginator;
}

export interface Paginator {
  page: number;
  limit: number;
  totalCount?: number;
}
