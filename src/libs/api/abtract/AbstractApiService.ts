import { constants } from '@constants/env';
import { loggingDebug } from '@libs/utils/logger';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const responseInterceptor = (response: AxiosResponse) => {
  loggingDebug({
    baseUrl: response.config.baseURL,
    url: response.config.url,
    data: JSON.stringify(response.data),
  });
  return response;
};

export default class AbstractApiService {
  private base: string;

  private authorization: string;

  private apiTimeout?: number;

  private useInternalAuthHeaderEndpoints?: string[];

  private headers?: AxiosRequestHeaders;

  public api: AxiosInstance;

  constructor({
    base,
    apiTimeout,
    authorization,
    useInternalAuthHeaderEndpoints,
    headers,
  }: {
    base: string;
    apiTimeout?: number;
    authorization?: string;
    useInternalAuthHeaderEndpoints?: string[];
    headers?: AxiosRequestHeaders;
  }) {
    this.base = base;
    this.apiTimeout = apiTimeout;
    this.authorization = authorization;
    this.useInternalAuthHeaderEndpoints = useInternalAuthHeaderEndpoints;
    this.headers = headers;

    this.api = this.init();
  }

  private init = () => {
    const api = axios.create({
      baseURL: this.base,
      headers: this.headers
        ? this.headers
        : {
            'Content-Type': 'application/json',
          },
      timeout: this.apiTimeout ? this.apiTimeout : constants.API_TIMEOUT,
    });

    api.interceptors.request.use(this.authInterceptor);
    api.interceptors.response.use(responseInterceptor);

    return api;
  };

  /**
   * Adds authorization headers to API calls
   * @param {AxiosRequestConfig} request
   */
  private authInterceptor = async <T>(
    request: AxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig<T>> => {
    const url = request.url;

    if (
      this.authorization &&
      (!this.useInternalAuthHeaderEndpoints ||
        this.useInternalAuthHeaderEndpoints?.some(
          (endpoint) => url === endpoint,
        ))
    ) {
      request.headers.Authorization = this.authorization;
    }

    return request as InternalAxiosRequestConfig<T>;
  };
}
