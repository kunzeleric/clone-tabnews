import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      minTimeout: 1_000,
      maxTimeout: 2_000,
    });

    async function fetchStatusPage(bail, tryNumber) {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw new Error(`Status page returned ${response.status}`);
      }
    }
  }
}

export const orchestrator = { waitForAllServices };
