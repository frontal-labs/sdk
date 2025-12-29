import { ApiKeyAuth, TokenAuth, type AuthStrategy } from "../auth/index.ts";
import { resolveConfig } from "../config/resolveConfig.ts";
import { TeamsResource } from "../resources/teams.ts";
import { Transport } from "./transport.ts";
import type { ClientOptions } from "./types.ts";

export class Frontal {
  private readonly transport: Transport;

  // Lazily created resources
  private _teams?: TeamsResource;

  constructor(options: ClientOptions = {}) {
    const config = resolveConfig(options);

    let auth: AuthStrategy | undefined;
    if (config.bearerToken) {
      auth = new TokenAuth(config.bearerToken);
    } else if (config.apiKey) {
      auth = new ApiKeyAuth(config.apiKey);
    }

    this.transport = new Transport({
      baseUrl: config.baseUrl,
      fetch: options.fetch,
      auth,
    });
  }

  /**
   * Access the teams resource.
   */
  get teams(): TeamsResource {
    this._teams ??= new TeamsResource(this.transport);
    return this._teams;
  }
}
