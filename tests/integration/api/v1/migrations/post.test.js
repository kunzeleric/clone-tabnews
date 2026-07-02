test("POST to /api/v1/migrations should run migrations successfully", async () => {
  const migrationsExecuteResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );

  expect(migrationsExecuteResponse.status).toBe(201);

  const migrationsExecuteResponseBody = await migrationsExecuteResponse.json();
  expect(Array.isArray(migrationsExecuteResponseBody)).toBe(true);

  const migrationsCheckResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );

  const migrationsCheckResponseBody = await migrationsCheckResponse.json();

  expect(migrationsCheckResponse.status).toBe(200);
  expect(migrationsCheckResponseBody.length).toBe(0);
});
