import type { AuthStrategy } from "../auth/index.ts";
import { AuthenticationError, FrontalError, NotFoundError, RateLimitError } from "./errors.ts";
import type { RequestOptions } from "./types.ts";

export interface TransportOptions {
  baseUrl: string;
  fetch?: typeof fetch;
  auth?: AuthStrategy;
  headers?: Record<string, string>;
}

export class Transport {
  private readonly baseUrl: string;
  private readonly fetch: typeof fetch;
  private readonly auth?: AuthStrategy;
  private readonly defaultHeaders: Record<string, string>;

  constructor(options: TransportOptions) {
    this.baseUrl = options.baseUrl.endsWith("/") ? options.baseUrl.slice(0, -1) : options.baseUrl;
    this.fetch = options.fetch ?? globalThis.fetch;
    this.auth = options.auth;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "frontal-sdk-js/0.1.0",
      ...options.headers,
    };
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`);

    if (options.query) {
      for (const [key, value] of Object.entries(options.query)) {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      }
    }

    const authHeaders = this.auth ? await this.auth.getHeaders() : {};
    const headers = {
      ...this.defaultHeaders,
      ...authHeaders,
      ...options.headers,
    };

    const response = await this.fetch(url.toString(), {
      method: options.body ? "POST" : "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });

    if (!response.ok) {
      await this.handleErrorResponse(response);
    }

    // In a real implementation we would parse the body.
    // Since this is a stubbed version for now, we return empty or as T.
    try {
      return (await response.json()) as T;
    } catch {
      return {} as T;
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let message = "An error occurred";
    let body: unknown;

    try {
      body = await response.json();
      if (body && typeof body === "object" && "message" in body) {
        message = String((body as { message: unknown }).message) || message;
      }
    } catch {
      // Ignore
    }

    switch (response.status) {
      case 401:
      case 403:
        throw new AuthenticationError(message);
      case 404:
        throw new NotFoundError("Resource");
      case 429:
        throw new RateLimitError(message);
      default:
        throw new FrontalError(message, body, String(response.status));
    }
  }
}
