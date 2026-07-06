import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import { database } from "infra/database.js";

const allowedMethods = ["GET", "POST"];

function getMigrationOptions(dbClient, liveRun) {
  return {
    dbClient,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
    dryRun: !liveRun,
  };
}

export default async function migration(request, response) {
  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method ${request.method} Not Allowed` });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const isLiveRun = request.method === "POST";

    const migrationOptions = getMigrationOptions(dbClient, isLiveRun);

    const migrations = await migrationRunner(migrationOptions);

    // if migrations were run return 201, otherwise 200
    const responseStatus = migrations.length > 0 ? 201 : 200;

    return response.status(responseStatus).json(migrations);
  } catch (error) {
    console.error("Error running migrations:", error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
