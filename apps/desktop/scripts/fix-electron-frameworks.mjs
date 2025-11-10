import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('node_modules/electron/dist/Electron.app/Contents/Frameworks');

function exists(p) {
  try {
    fs.lstatSync(p);
    return true;
  } catch {
    return false;
  }
}

function ensureSymlink(target, linkPath) {
  if (exists(linkPath)) return;
  fs.symlinkSync(target, linkPath);
}

function fixFramework(name, { withHelpers = false, withLibraries = false } = {}) {
  const fwDir = path.join(root, `${name}.framework`);
  if (!exists(fwDir)) return;

  const versionsDir = path.join(fwDir, 'Versions');
  const aDir = path.join(versionsDir, 'A');
  if (!exists(aDir)) return;

  const currentLink = path.join(versionsDir, 'Current');
  if (!exists(currentLink)) {
    fs.symlinkSync('A', currentLink);
  }

  // Top-level links
  ensureSymlink(path.join('Versions', 'Current', name), path.join(fwDir, name));
  ensureSymlink(path.join('Versions', 'Current', 'Resources'), path.join(fwDir, 'Resources'));
  if (withHelpers)
    ensureSymlink(path.join('Versions', 'Current', 'Helpers'), path.join(fwDir, 'Helpers'));
  if (withLibraries)
    ensureSymlink(path.join('Versions', 'Current', 'Libraries'), path.join(fwDir, 'Libraries'));
}

// Electron Framework needs Helpers/Libraries links
fixFramework('Electron Framework', { withHelpers: true, withLibraries: true });
// Other dependent frameworks
fixFramework('Squirrel');
fixFramework('ReactiveObjC');
fixFramework('Mantle');

console.log('[fix-electron-frameworks] macOS framework symlinks ensured.');
