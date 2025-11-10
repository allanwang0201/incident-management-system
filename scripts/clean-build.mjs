#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const targets = [
  // Root fallbacks
  'build',
  'dist',
  'out',

  // Web (Vite)
  'apps/web/dist',

  // API (Next.js)
  'apps/api/.next',
  'apps/api/out',

  // Desktop (Vite + Electron Builder)
  'apps/desktop/dist',
  'apps/desktop/dist_electron',
  'apps/desktop/release',

  // Design System (tsup, Storybook build)
  'packages/design-system/dist',
  'packages/design-system/storybook-static',

  // Shared (tsup)
  'packages/shared/dist',

  // Mobile native build outputs
  'apps/mobile/android/build',
  'apps/mobile/android/app/build',
  'apps/mobile/ios/build',
];

function rm(dir) {
  const p = path.resolve(root, dir);
  if (fs.existsSync(p)) {
    try {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`Removed: ${dir}`);
    } catch (err) {
      console.warn(`Failed to remove: ${dir} -> ${err?.message ?? err}`);
    }
  }
}

console.log('Cleaning build artifacts...');
targets.forEach(rm);
console.log('Done.');
