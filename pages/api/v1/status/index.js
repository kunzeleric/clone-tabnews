import { database } from "infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const openedConnectionsResult = await database.query(
    "SELECT count(*) as open_connections FROM pg_stat_activity WHERE datname = 'postgres' AND state = 'active';",
  );
  const openedConnectionsValue = parseInt(
    openedConnectionsResult.rows[0].open_connections,
  );

  const maxConnectionsResult = await database.query("SHOW max_connections");
  const maxConnectionsValue = parseInt(
    maxConnectionsResult.rows[0].max_connections,
  );

  const dependencies = {
    database: {
      version: databaseVersionValue,
      opened_connections: openedConnectionsValue,
      max_connections: maxConnectionsValue,
    },
  };

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies,
  });
}
