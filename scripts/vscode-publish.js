const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SRC = "packages/vscode-extension";
const DEST = "packages/vscode-extension/_isolated_";
const ROOT = process.cwd();

const TARGETS = [
  "dist",
  "main-view-dist",
  "media",
  "template-generate",
  "package.json",
];

// ---- FUNCTIONS ----
function cleanDest() {
  if (fs.existsSync(DEST)) {
    console.log(`⚠ Removing old ${DEST}...`);
    fs.rmSync(DEST, { recursive: true, force: true });
  }
  fs.mkdirSync(DEST, { recursive: true });
}

function cleanup() {
  if (fs.existsSync(DEST)) {
    console.log("▶ Removing isolated folder due to termination...");
    fs.rmSync(DEST, { recursive: true, force: true });
    console.log("✓ Done cleanup.");
  }
}

function copyFolder(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copySelected() {
  for (const item of TARGETS) {
    const srcPath = path.join(SRC, item);
    const destPath = path.join(DEST, item);

    if (!fs.existsSync(srcPath)) {
      console.log(`Skip: ${item} (not found)`);
      continue;
    }

    if (fs.statSync(srcPath).isDirectory()) {
      console.log(`Copy folder: ${item}`);
      copyFolder(srcPath, destPath);
    } else {
      console.log(`Copy file: ${item}`);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// ---- RUN ----
try {
  // Register signal handlers
  process.on("SIGINT", () => {
    console.error("▶ Received SIGINT. Cleaning up...");
    cleanup();
    process.exit(1);
  });

  process.on("SIGTERM", () => {
    console.error("▶ Received SIGTERM. Cleaning up...");
    cleanup();
    process.exit(1);
  });

  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught exception:", err);
    cleanup();
    process.exit(1);
  });

  cleanDest();
  copySelected();

  console.log("✓ Done copying.");
  console.log("▶ Running npm install --omit=dev in isolated folder...");

  execSync("npm install --omit=dev", {
    cwd: DEST,
    stdio: "inherit",
  });

  console.log("✓ Done installing prod dependencies.");

  // ---- VSCE PACKAGE ----
  console.log("▶ Running VSCE publish from ROOT but inside DEST...");

  execSync("pnpm vsce publish", {
    cwd: DEST,
    stdio: "inherit",
  });

  console.log("✓ Done publishing.");
} catch (error) {
  console.error("❌ Error occurred:", error);
} finally {
  cleanup();
}
