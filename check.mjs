import { readFile } from "node:fs/promises";

const html = await readFile(new URL("index.html", import.meta.url), "utf8");
const planData = await readFile(new URL("plan-data.js", import.meta.url), "utf8");
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);

if (inlineScripts.length !== 1) {
  throw new Error(`expected one inline application script, found ${inlineScripts.length}`);
}
new Function(`${planData}\n${inlineScripts[0]}`);

for (const requiredId of ["weekLabel", "taskList", "rulesBox", "stageOverview"]) {
  if (!html.includes(`id="${requiredId}"`)) {
    throw new Error(`missing required dashboard mount: ${requiredId}`);
  }
}

const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/g, "");
if (visibleHtml.includes("考研")) {
  throw new Error("visible dashboard HTML must keep the renamed study-only identity");
}

console.log("study dashboard static self-check passed");
