import { describe, expect, it } from "bun:test";
import { Frontal } from "../src/index";

describe("Frontal Client", () => {
    it("should create a client instance", () => {
        const client = new Frontal({
            bearerToken: "test-token",
        });
        expect(client).toBeDefined();
        expect(client.teams).toBeDefined();
    });

    it("should expose teams resource", () => {
        const client = new Frontal({ bearerToken: "test-token" });
        expect(client.teams).toBeDefined();
    });
});
