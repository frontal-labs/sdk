import type { Transport } from "../client/transport.ts";
import type { FrontalResponse } from "../client/types.ts";

export interface Team {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export class TeamsResource {
  constructor(private readonly transport: Transport) {}

  /**
   * List all teams.
   */
  async list(): Promise<FrontalResponse<Team[]>> {
    // In a real implementation: return this.transport.request<FrontalResponse<Team[]>>("/teams");
    return {
      data: [
        {
          id: "team_1",
          name: "Engineering",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "team_2",
          name: "Product",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    };
  }

  /**
   * Get a team by ID.
   */
  async get(id: string): Promise<FrontalResponse<Team>> {
    return {
      data: {
        id,
        name: "Mock Team",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }
}
