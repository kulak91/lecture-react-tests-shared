import { HttpMethod } from '../../enums/enums';

type HttpOptions = {
  method?: HttpMethod;
  payload?: BodyInit | null;
  queryString?: Record<string, unknown>;
  headers?: Record<string, string>;
};

export { type HttpOptions };
