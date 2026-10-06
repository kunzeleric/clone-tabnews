import retry from "async-retry";
import { database } from "infra/database";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      minTimeout: 1_000,
      maxTimeout: 2_000,
    });

    async function fetchStatusPage() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/status");

        if (!response.ok) {
          throw new Error(`Status page returned ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
}

export async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

export const orchestrator = { waitForAllServices, clearDatabase };
