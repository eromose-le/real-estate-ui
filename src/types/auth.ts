export interface ServerResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ServerErrorResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponse {
  response: {
    data: {
      statusCode: number;
      success: boolean;
      error: string;
    };
  };
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
