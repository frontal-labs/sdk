import type { ClientOptions, Environment } from "../client/types.ts";

export interface ResolvedConfig {
  bearerToken?: string;
  apiKey?: string;
  environment: Environment;
  baseUrl: string;
}

const ENV_URLS: Record<string, string> = {
  prod: "https://api.frontal.ai",
  staging: "https://api.staging.frontal.ai",
  dev: "http://localhost:4000",
};

export function resolveConfig(options: ClientOptions): ResolvedConfig {
  const bearerToken =
    options.bearerToken || process.env.FRONTAL_TOKEN || process.env.FRONTAL_API_KEY;
  const apiKey = options.apiKey;
  const environment = options.environment || (process.env.FRONTAL_ENV as Environment) || "prod";

  const baseUrl = options.baseUrl || ENV_URLS[environment] || ENV_URLS.prod;

  return {
    bearerToken,
    apiKey,
    environment,
    baseUrl,
  };
}
