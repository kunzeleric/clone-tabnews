import { orchestrator } from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  // updated_at field
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // database status check
  const databaseDependency = responseBody.dependencies.database;
  const databaseVersion = databaseDependency.version;

  // TODO: fix this -> postgres version in PROD is returned as "16.0 (v....)"
  // so this test will always fail in PROD
  // postgres version
  expect(databaseVersion).toEqual("16.0");

  // postgres max connections
  expect(databaseDependency.max_connections).toBeDefined();
  expect(databaseDependency.max_connections).toBeGreaterThan(0);

  // postgres opened connections
  expect(databaseDependency.opened_connections).toBeDefined();
  expect(databaseDependency.opened_connections).toBeGreaterThanOrEqual(0);
});
