const { execSync } = require("node:child_process");

function runScriptCommand(command) {
  try {
    console.log(`\n⚙️ Executando: ${command}...`);
    execSync(command, { stdio: "inherit" });
    return true;
  } catch (error) {
    console.error(`\n Falha ao executar: ${command}: ${error.message}`);
    return false;
  }
}

function stopDockerServices() {
  console.log('\n🔴 Executando "npm run services:stop"...');
  try {
    execSync("npm run services:stop", { stdio: "inherit" });
  } catch (error) {
    console.error("Erro ao parar os serviços do Docker: ", error.message);
  }
}

let isDockerShuttingDown = false;

function handleExitCode(exitCode) {
  if (isDockerShuttingDown) return;
  isDockerShuttingDown = true;

  stopDockerServices();
  process.exit(exitCode);
}

module.exports = { runScriptCommand, stopDockerServices, handleExitCode };
