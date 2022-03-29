import { ExceptionPayloadModel } from '@Interfaces';
import ApiError from '@Utils/api-error';
import axios, { AxiosResponse } from 'axios';

class ApiErrorHandlerMiddleware {
  public parseApiError(error: any): ApiError {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return this._parseResponceErrors(error.response);
      } else {
        return this._parseRequestErrors();
      }
    } else {
      return new ApiError(error.message ?? 'unknown error', 0);
    }
  }

  private _parseRequestErrors() {
    return new ApiError('server is not responding', 0);
  }

  private _parseResponceErrors(response: AxiosResponse<ExceptionPayloadModel>) {
    return new ApiError(response.data.title, response.data.code);
  }
}

export default ApiErrorHandlerMiddleware;
