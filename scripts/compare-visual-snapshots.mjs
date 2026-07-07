import fs from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const root = process.cwd();
const baselineDir = path.join(root, "cypress/visual-snapshots/baseline");
const currentDir = path.join(root, "cypress/visual-snapshots/current");
const diffDir = path.join(root, "cypress/visual-snapshots/diff");

const listPngs = (dir) => {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPngs(fullPath);
    if (!entry.name.endsWith(".png")) return [];
    return [fullPath];
  });
};

const readPng = (filePath) => PNG.sync.read(fs.readFileSync(filePath));
const relativeTo = (dir, filePath) => path.relative(dir, filePath);

const baselineFiles = listPngs(baselineDir);
const currentFiles = new Set(listPngs(currentDir).map((filePath) => relativeTo(currentDir, filePath)));

if (!baselineFiles.length) {
  console.error("No baseline screenshots found. Run npm run visual:baseline:e2e first.");
  process.exit(1);
}

if (!currentFiles.size) {
  console.error("No current screenshots found. Run npm run visual:current:e2e first.");
  process.exit(1);
}

fs.rmSync(diffDir, { force: true, recursive: true });

const results = [];
let hasFailures = false;

for (const baselineFile of baselineFiles) {
  const relativePath = relativeTo(baselineDir, baselineFile);
  const currentFile = path.join(currentDir, relativePath);

  if (!currentFiles.has(relativePath)) {
    hasFailures = true;
    results.push({ file: relativePath, status: "missing-current" });
    continue;
  }

  const baseline = readPng(baselineFile);
  const current = readPng(currentFile);

  if (baseline.width !== current.width || baseline.height !== current.height) {
    hasFailures = true;
    results.push({
      file: relativePath,
      status: "dimension-mismatch",
      baseline: `${baseline.width}x${baseline.height}`,
      current: `${current.width}x${current.height}`,
    });
    continue;
  }

  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const diffPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    baseline.width,
    baseline.height,
    { threshold: 0.12 }
  );
  const totalPixels = baseline.width * baseline.height;
  const diffRatio = diffPixels / totalPixels;

  if (diffPixels > 0) {
    const diffFile = path.join(diffDir, relativePath);
    fs.mkdirSync(path.dirname(diffFile), { recursive: true });
    fs.writeFileSync(diffFile, PNG.sync.write(diff));
  }

  if (diffRatio > 0.01) hasFailures = true;

  results.push({
    file: relativePath,
    status: diffRatio > 0.01 ? "changed" : "ok",
    diffPixels,
    diffPercent: `${(diffRatio * 100).toFixed(3)}%`,
  });
}

const extraCurrentFiles = [...currentFiles].filter(
  (relativePath) => !baselineFiles.some((filePath) => relativeTo(baselineDir, filePath) === relativePath)
);

for (const file of extraCurrentFiles) {
  hasFailures = true;
  results.push({ file, status: "missing-baseline" });
}

console.table(results);

if (hasFailures) {
  console.error(`Visual differences found. See ${path.relative(root, diffDir)}.`);
  process.exit(1);
}

console.log("Visual snapshots match baseline.");
