import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { HttpMethod } from '../../common/enums/enums';
import { HttpOptions } from '../../common/types/types';
import { HttpError } from '../../exceptions/exceptions';

class Http {
  #http: AxiosInstance;

  constructor() {
    this.#http = axios.create();
  }

  async load<T = unknown>(url: string, options: HttpOptions = {}): Promise<T> {
    const { headers = {}, method = HttpMethod.GET, payload } = options;

    const res = this.#http
      .request({
        url,
        method,
        headers,
        data: payload,
      })
      .then(this.#getData<T>)
      .catch(this.#throwError);

    return res;
  }

  #getData<T = unknown>(res: AxiosResponse): T {
    return res.data;
  }

  #throwError(err: AxiosError): never {
    if (err.response) {
      throw new HttpError({
        status: err.response.status,
        message: err.message,
      });
    }

    throw err;
  }
}

export { Http };
