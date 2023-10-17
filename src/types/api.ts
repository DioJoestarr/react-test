export interface ApiResponse<T> {
  message: string;
  data: T;
}
export interface ApiResponsePage<T> {
  meta: Meta;
  data: T[];
  message: string;
}
export interface Meta {
  paging: Paging;
  time: number;
}
export interface Paging {
  links: Links;
  total: number;
}
export interface Links {
  next: string;
}
export interface ApiErrorResponse {
  error: ErrorResponse;
}

export interface ErrorResponse {
  message: string;
  code: number;
}
