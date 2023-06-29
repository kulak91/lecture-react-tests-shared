import {
  ApiPath,
  ContentType,
  HttpHeader,
  HttpMethod,
} from '../../common/enums/enums';
import {
  SignInUserPayload,
  SignUpUserPayload,
  SignUserResponseDto,
} from '../../common/types/types';
import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

type GetHeadersOptions = {
  contentType?: ContentType;
  authToken?: string;
};

class AuthApi {
  #http: Http;

  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  signUp(payload: SignUpUserPayload): Promise<SignUserResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.SIGN_UP}`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      headers: this.#getHeaders({ contentType: ContentType.JSON }),
    });
  }

  signIn(payload: SignInUserPayload): Promise<SignUserResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.SIGN_IN}`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      headers: this.#getHeaders({ contentType: ContentType.JSON }),
    });
  }

  deleteAuthenticatedUser(authToken: string): Promise<void> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.AUTHENTICATED_USER}`, {
      method: HttpMethod.DELETE,
      headers: this.#getHeaders({ authToken }),
    });
  }

  #getHeaders({
    contentType,
    authToken,
  }: GetHeadersOptions): Record<string, string> {
    const headers = {};

    if (contentType) {
      Object.assign(headers, {
        [HttpHeader.CONTENT_TYPE]: contentType,
      });
    }

    if (authToken) {
      Object.assign(headers, {
        [HttpHeader.AUTHORIZATION]: `Bearer ${authToken}`,
      });
    }

    return headers;
  }
}

export { AuthApi };
