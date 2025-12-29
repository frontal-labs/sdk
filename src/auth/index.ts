export interface AuthStrategy {
  getHeaders(): Promise<Record<string, string>>;
}

export class TokenAuth implements AuthStrategy {
  constructor(private readonly token: string) {}

  async getHeaders(): Promise<Record<string, string>> {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }
}

export class ApiKeyAuth implements AuthStrategy {
  constructor(private readonly apiKey: string) {}

  async getHeaders(): Promise<Record<string, string>> {
    return {
      "X-Frontal-API-Key": this.apiKey,
    };
  }
}
