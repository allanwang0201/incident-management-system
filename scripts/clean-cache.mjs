#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const deep = process.argv.includes('--deep');

const dirTargets = [
  // Coverage reports
  'coverage',
  'apps/web/coverage',
  'apps/api/coverage',
  'apps/desktop/coverage',
  'apps/mobile/coverage',
  'packages/design-system/coverage',
  'packages/shared/coverage',

  // Build system caches
  '.turbo',
  '.vercel',
  'apps/mobile/.expo',
];

if (deep) {
  // Native caches (can be large)
  dirTargets.push('apps/mobile/ios/Pods', 'apps/mobile/android/.gradle');
}

const filePatterns = [
  // TypeScript incremental build info
  { regex: /\.tsbuildinfo$/, desc: 'TypeScript build info' },
  // Debug logs
  { regex: /^npm-debug\.log.*$/, desc: 'npm debug log' },
  { regex: /^yarn-debug\.log.*$/, desc: 'yarn debug log' },
  { regex: /^yarn-error\.log.*$/, desc: 'yarn error log' },
  { regex: /^pnpm-debug\.log.*$/, desc: 'pnpm debug log' },
  // OS artifacts
  { regex: /^\.DS_Store$/, desc: 'macOS metadata' },
  { regex: /^Thumbs\.db$/, desc: 'Windows thumbnail cache' },
];

const skipDirs = new Set([
  'node_modules',
  '.git',
  deep ? '' : 'apps/mobile/ios/Pods',
  deep ? '' : 'apps/mobile/android/.gradle',
]);

function rmDir(rel) {
  const p = path.resolve(root, rel);
  if (fs.existsSync(p)) {
    try {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`Removed dir: ${rel}`);
    } catch (err) {
      console.warn(`Failed to remove dir: ${rel} -> ${err?.message ?? err}`);
    }
  }
}

function rmFile(abs, rel) {
  try {
    fs.rmSync(abs, { force: true });
    console.log(`Removed file: ${rel}`);
  } catch (err) {
    console.warn(`Failed to remove file: ${rel} -> ${err?.message ?? err}`);
  }
}

function walkAndClean(dirRel = '.') {
  const dirAbs = path.resolve(root, dirRel);
  let entries;
  try {
    entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  } catch {
    return; // inaccessible
  }

  for (const entry of entries) {
    const entryRel = path.join(dirRel, entry.name);
    const entryAbs = path.join(dirAbs, entry.name);

    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      walkAndClean(entryRel);
    } else if (entry.isFile()) {
      for (const pattern of filePatterns) {
        if (pattern.regex.test(entry.name)) {
          rmFile(entryAbs, entryRel);
          break;
        }
      }
    }
  }
}

console.log(`Cleaning caches${deep ? ' (deep)' : ''}...`);
dirTargets.forEach(rmDir);
walkAndClean('.');
console.log('Done.');
