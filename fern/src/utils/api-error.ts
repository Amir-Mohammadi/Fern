class ApiError extends Error {
  code: number;
  isApiError: boolean;

  constructor(message: string, code: number = 0) {
    super();
    this.message = message;
    this.code = code;
    this.name = 'Api Error';
    this.isApiError = true;
  }
}

/**
 * this is a type guard api error class
 * @param error
 */
export const isApiError = (error: any): error is ApiError => {
  return typeof error === 'object' && error.isApiError === true;
};

export default ApiError;
