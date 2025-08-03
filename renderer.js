import { parseSlyke } from "./slyke/parser.js";
import { createRuntime } from "./slyke/runtime.js";
import { rules } from "./slyke/rules.js";
import { threeDRules } from "./slyke/threeDRules.js"; // <--- 3D-Regeln importieren

async function loadFile(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Fehler beim Laden von ${path}: ${res.statusText}`);
  }
  return res.text();
}

async function start() {
  console.log("🚀 Starte Slyke Browser...");

  const uiCode = await loadFile("./public/app.sk");
  console.log("📥 UI geladen:", uiCode);

  const ast = parseSlyke(uiCode);
  console.log("🌳 AST:", ast);

  // Normale Regeln + 3D-Regeln kombinieren
  const allRules = { ...rules, ...threeDRules };

  const runtime = createRuntime(allRules);
  runtime(ast, document.getElementById("app"));
}

// Damit auch von Buttons usw. neu gerendert werden kann
export function rerender() {
  document.getElementById("app").innerHTML = "";
  start();
}

start();
