import { orchestrator } from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST to /api/v1/migrations", () => {
  describe("Anonymous User", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const migrationsExecuteResponse = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(migrationsExecuteResponse.status).toBe(201);

        const migrationsExecuteResponseBody =
          await migrationsExecuteResponse.json();
        expect(Array.isArray(migrationsExecuteResponseBody)).toBe(true);
      });

      test("For the second time", async () => {
        const migrationsCheckResponse = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        const migrationsCheckResponseBody =
          await migrationsCheckResponse.json();

        expect(migrationsCheckResponse.status).toBe(200);
        expect(migrationsCheckResponseBody.length).toBe(0);
      });
    });
  });
});
