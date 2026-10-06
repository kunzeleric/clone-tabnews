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

console.log("\n🚀 Inicializando Next.js e Jest para bateria de testes...");

const testProcess = spawn(
  'npm run services:up && concurrently -n next,jest --hide next -k -s command-jest "next dev" "jest --runInBand --verbose"',
  {
    stdio: "inherit",
    shell: true,
  },
);

testProcess.on("exit", (code) => {
  if (code !== 0 && code !== null) {
    console.error(
      `\n❌ A suíte de testes falhou e finalizou inesperadamente com código: ${code}`,
    );
    handleExitCode(code);
  } else {
    console.log("\n✅ Todos os testes passaram com sucesso!");
    handleExitCode(0);
  }
});

process.on("SIGINT", () => {
  console.log("\n[Ctrl+C] Interrupção detectada pelo usuário.");
  handleExitCode(130);
});

process.on("SIGTERM", () => {
  handleExitCode(1);
});
