const { exec } = require("node:child_process");

function checkPostgresConnection() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      checkPostgresConnection();
      process.stdout.write(".");
      return;
    }

    console.log("\n🟢 Postgres is ready to accept connections.");
  }
}

process.stdout.write("\n\n🔴 Waiting for Postgres to be ready...");

checkPostgresConnection();
