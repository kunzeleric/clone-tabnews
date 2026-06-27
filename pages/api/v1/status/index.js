import { database } from "infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const version = await database.query("SHOW server_version;");

  const openedConnections = await database.query(
    "SELECT count(*)::int as open_connections FROM pg_stat_activity WHERE datname = 'postgres' AND state = 'active';",
  );
  const maxConnections = await database.query(
    "SELECT setting::int as max_connections FROM pg_settings WHERE name = 'max_connections';",
  );

  const dependencies = {
    database: {
      version: parseFloat(version.rows[0].server_version),
      opened_connections: openedConnections.rows[0].open_connections,
      max_connections: maxConnections.rows[0].max_connections,
    },
  };

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies,
  });
}
