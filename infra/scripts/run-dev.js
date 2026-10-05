const { spawn } = require("node:child_process");
const { handleExitCode, runScriptCommand } = require("./handle-script-exit");

if (!runScriptCommand("npm run services:up")) {
  process.exit(1);
}

if (!runScriptCommand("npm run services:wait:database")) {
  process.exit(1);
}

if (!runScriptCommand("npm run migrations:up")) {
  process.exit(1);
}

console.log("\n🚀 Inicializando o ambiente Next.js...");

const nextServerProcess = spawn("next dev", {
  stdio: "inherit",
  shell: true,
});

nextServerProcess.on("exit", (code) => {
  if (code !== 0 && code !== null) {
    console.error(`\n❌ Next.js finalizou inesperadamente com código: ${code}`);
    handleExitCode(code);
  }
});

process.on("SIGINT", () => {
  console.log("\n[Ctrl+C] Interrupção detectada pelo usuário.");
  handleExitCode(130);
});

process.on("SIGTERM", () => {
  handleExitCode(1);
});
