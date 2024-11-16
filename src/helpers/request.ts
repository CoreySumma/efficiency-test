import { flow } from './fp';
import { ApiResponse, handleFetchResponse, HandleResponse } from './response';
import { isDefined, OmitStrict } from './typescript';
import { buildUrl, BuildUrlParams } from './url';

type FetchParams = Pick<RequestInit, 'method'>;
/**
 * The params generated by the library
 */
type BaseRequestParams = BuildUrlParams &
  FetchParams &
  // `headers` is not part of FetchParams because we want to allow headers in the additional params as well
  Pick<RequestInit, 'headers'>;

/**
 * Additional fetch options provided by the user on a per-call basis
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AdditionalFetchOptions extends OmitStrict<RequestInit, keyof FetchParams> {}
export type CompleteRequestParams = BaseRequestParams & AdditionalFetchOptions;
type HandleRequest<Args> = (
  a: Args,
  additionalFetchOptions?: AdditionalFetchOptions,
) => CompleteRequestParams;

/**
 * helper used to type-check the arguments, and add default params for all requests
 */
export const createRequestHandler = <Args>(
  fn: (a: Args) => BaseRequestParams,
): HandleRequest<Args> => (a, additionalFetchOptions = {}) => {
  const { headers, query, ...baseReqParams } = fn(a);

  return {
    ...baseReqParams,
    ...additionalFetchOptions,
    query,
    headers: {
      ...headers,
      ...additionalFetchOptions.headers,
    },
  };
};

/**
 * Initial parameters that apply to all calls
 */
export type InitParams = {
  apiVersion?: string;
  fetch?: typeof fetch;
} & OmitStrict<RequestInit, 'method' | 'body'> &
  ({ accessKey: string; apiUrl?: never } | { apiUrl: string; accessKey?: never });

type RequestGenerator<Args, ResponseType> = {
  handleRequest: HandleRequest<Args>;
  handleResponse: HandleResponse<ResponseType>;
};

type Endpoint<PathnameParams, RequestArgs, ResponseType> = {
  getPathname: (params: PathnameParams) => string;
} & RequestGenerator<RequestArgs, ResponseType>;
export const makeEndpoint = <PathnameParams, RequestArgs, ResponseType>(
  endpoint: Endpoint<PathnameParams, RequestArgs, ResponseType>,
) => endpoint;

type GeneratedRequestFunction<Args, ResponseType> = (
  ...a: Parameters<HandleRequest<Args>>
) => Promise<ApiResponse<ResponseType>>;

type InitMakeRequest = (
  args: InitParams,
) => <Args, ResponseType>(
  handlers: RequestGenerator<Args, ResponseType>,
) => GeneratedRequestFunction<Args, ResponseType>;

export const initMakeRequest: InitMakeRequest = ({
  accessKey,
  apiVersion = 'v1',
  apiUrl = 'https://api.unsplash.com',
  headers: generalHeaders,
  fetch: providedFetch,
  ...generalFetchOptions
}) => ({ handleResponse, handleRequest }) =>
  flow(
    handleRequest,
    ({ pathname, query, method = 'GET', headers: endpointHeaders, body, signal }) => {
      const url = buildUrl({ pathname, query })(apiUrl);

      const fetchOptions: RequestInit = {
        method,
        headers: {
          ...generalHeaders,
          ...endpointHeaders,
          'Accept-Version': apiVersion,
          ...(isDefined(accessKey) ? { Authorization: `Client-ID ${accessKey}` } : {}),
        },
        body,
        signal,
        ...generalFetchOptions,
      };

      const fetchToUse = providedFetch ?? fetch;

      return fetchToUse(url, fetchOptions).then(handleFetchResponse(handleResponse));
    },
  );