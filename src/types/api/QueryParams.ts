export interface QueryParams {
  fields?: string;
  filter?: Record<string, unknown>;
  search?: Record<string, unknown>;
  page?: number;
  pageSize?: number;
  sort?: Record<string, unknown>;
}
