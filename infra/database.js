import { Client } from "pg";

export function createPgClient() {
  return new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
}

export async function query(queryObject) {
  const client = createPgClient();
  await client.connect();

  const result = await client.query(queryObject);

  await client.end();

  return result;
}

export const database = {
  query,
};
