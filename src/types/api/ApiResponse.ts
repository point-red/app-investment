export interface ApiResponse {
  data?: unknown;
  error?: ErrorResponse;
}

export interface ErrorResponse {
  code: string;
  status: string;
  message: string;
  errors?: unknown;
}
