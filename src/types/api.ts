export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface FetchCharactersParams {
  page?: number;
  search?: string;
}
