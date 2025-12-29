export type Environment = "prod" | "staging" | "dev" | (string & {});

export interface ClientOptions {
  /**
   * The bearer token for authentication.
   */
  bearerToken?: string;
  /**
   * The API key for authentication.
   */
  apiKey?: string;
  /**
   * The environment to use. Defaults to "prod".
   */
  environment?: Environment;
  /**
   * The base URL for the API. If provided, overrides the environment-based URL.
   */
  baseUrl?: string;
  /**
   * Custom fetch implementation.
   */
  fetch?: typeof fetch;
  /**
   * Max number of retries for failed requests.
   */
  maxRetries?: number;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  signal?: AbortSignal;
}

export interface FrontalResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}
