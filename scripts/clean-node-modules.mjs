#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const targets = [
  'node_modules',

  // Apps
  'apps/web/node_modules',
  'apps/api/node_modules',
  'apps/desktop/node_modules',
  'apps/mobile/node_modules',

  // Packages
  'packages/design-system/node_modules',
  'packages/shared/node_modules',
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

console.log('Removing node_modules across workspace...');
targets.forEach(rm);
console.log('Done.');
