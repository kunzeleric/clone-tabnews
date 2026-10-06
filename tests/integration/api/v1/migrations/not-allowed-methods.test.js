describe("Not Allowed Methods to /api/v1/migrations", () => {
  describe("Anonymous User", () => {
    test("Running not allowed methods in migrations", async () => {
      const notAllowedMethods = ["PUT", "DELETE", "PATCH", "OPTIONS"];

      const requests = notAllowedMethods.map(async (method) => {
        return await fetch("http://localhost:3000/api/v1/migrations", {
          method,
        });
      });

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(response.status).toBe(405);
      });
    });
  });
});
