export interface QueryParams {
  fields?: string;
  includes?: string;
  filter?: Record<string, unknown>;
  archived?: boolean;
  search?: Record<string, unknown>;
  page?: number;
  pageSize?: number;
  sort?: Record<string, unknown>;
}
