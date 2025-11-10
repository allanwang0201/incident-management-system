#!/usr/bin/env node

/**
 * Cross-platform startup script for Incident Management System
 * Works on Windows, macOS, and Linux
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.cyan}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}${msg}${colors.reset}`),
};

// Banner
console.log('');
console.log(`${colors.cyan}================================================${colors.reset}`);
console.log(`${colors.cyan}  Incident Management System - Start All Apps  ${colors.reset}`);
console.log(`${colors.cyan}================================================${colors.reset}`);
console.log('');

// Check if pnpm is installed
async function checkPnpm() {
  return new Promise((resolve) => {
    const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
    const check = spawn(cmd, ['--version'], { stdio: 'ignore' });
    check.on('close', (code) => {
      if (code !== 0) {
        log.error('Error: pnpm is not installed!');
        console.log('Please install pnpm: npm install -g pnpm');
        process.exit(1);
      }
      resolve();
    });
  });
}

// Build shared packages
async function buildSharedPackages() {
  log.info('\nBuilding shared packages...');

  const buildShared = () =>
    new Promise((resolve, reject) => {
      const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
      const build = spawn(cmd, ['--filter', '@incident-system/shared', 'build'], {
        cwd: __dirname,
        stdio: 'inherit',
        shell: true,
      });
      build.on('close', (code) => (code === 0 ? resolve() : reject()));
    });

  const buildDesignSystem = () =>
    new Promise((resolve, reject) => {
      const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
      const build = spawn(cmd, ['--filter', '@incident-system/design-system', 'build'], {
        cwd: __dirname,
        stdio: 'inherit',
        shell: true,
      });
      build.on('close', (code) => (code === 0 ? resolve() : reject()));
    });

  await buildShared();
  await buildDesignSystem();
  log.success('✓ Shared packages built');
}

// Start a service in a new terminal/window
function startService(name, command, args = []) {
  log.info(`Starting ${name}...`);

  const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  const fullArgs = [command, ...args];

  let terminal;

  if (process.platform === 'win32') {
    // Windows: Open new Command Prompt window
    terminal = spawn('cmd.exe', ['/c', 'start', 'cmd.exe', '/k', cmd, ...fullArgs], {
      cwd: __dirname,
      detached: true,
      stdio: 'ignore',
    });
  } else if (process.platform === 'darwin') {
    // macOS: Open new Terminal window
    const script = `tell app "Terminal" to do script "cd '${__dirname}' && ${cmd} ${fullArgs.join(' ')}"`;
    terminal = spawn('osascript', ['-e', script], {
      detached: true,
      stdio: 'ignore',
    });
  } else {
    // Linux: Try common terminal emulators
    const terminals = ['gnome-terminal', 'konsole', 'xterm'];
    let terminalFound = false;

    for (const term of terminals) {
      try {
        if (term === 'gnome-terminal') {
          terminal = spawn(
            term,
            ['--', 'bash', '-c', `cd ${__dirname} && ${cmd} ${fullArgs.join(' ')}; exec bash`],
            {
              detached: true,
              stdio: 'ignore',
            }
          );
        } else {
          terminal = spawn(
            term,
            ['-e', `bash -c "cd ${__dirname} && ${cmd} ${fullArgs.join(' ')}; exec bash"`],
            {
              detached: true,
              stdio: 'ignore',
            }
          );
        }
        terminalFound = true;
        break;
      } catch (e) {
        continue;
      }
    }

    if (!terminalFound) {
      log.warning(`No supported terminal found. Running ${name} in background...`);
      terminal = spawn(cmd, fullArgs, {
        cwd: __dirname,
        detached: true,
        stdio: 'ignore',
      });
    }
  }

  if (terminal) {
    terminal.unref();
  }
}

// Delay helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Ask user a question
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}

// Main function
async function main() {
  try {
    // Check dependencies
    log.info('Checking dependencies...');
    await checkPnpm();
    log.success('✓ pnpm found');

    // Build shared packages
    await buildSharedPackages();

    console.log('');
    log.info('Starting applications...');
    console.log('');

    // Start Web App
    startService('Web App (port 3000)', 'dev:web');
    await sleep(2000);

    // Start API Server
    startService('API Server (port 3001)', 'dev:api');
    await sleep(2000);

    // Start Desktop App
    startService('Desktop App', 'dev:desktop');
    await sleep(2000);

    // Start Mobile App (use root script for consistent predev & ports)
    startService('Mobile App (Expo)', 'dev:mobile');
    await sleep(2000);

    // Ask about Storybook
    console.log('');
    const startStorybook = await askQuestion('Do you want to start Storybook? (y/n): ');

    if (startStorybook === 'y' || startStorybook === 'yes') {
      log.info('Starting Storybook (port 6006)...');
      // Use startService for consistency across platforms
      startService('Storybook (port 6006)', '--filter', [
        '@incident-system/design-system',
        'storybook',
      ]);
      await sleep(2000);
    }

    // Success message
    console.log('');
    log.success('================================================');
    log.success('  All applications started successfully!       ');
    log.success('================================================');
    console.log('');

    console.log('Access your applications at:');
    console.log(
      `  • Web App:     ${colors.green}http://localhost:3000${colors.reset} (or 3001 if busy)`
    );
    console.log(`  • API Server:  ${colors.green}http://localhost:3001${colors.reset}`);
    console.log(`  • Desktop:     ${colors.green}Electron Window${colors.reset}`);
    console.log(
      `  • Mobile:      ${colors.green}Expo DevTools (press 'i' for iOS, 'a' for Android, 'w' for web)${colors.reset}`
    );
    if (startStorybook === 'y' || startStorybook === 'yes') {
      console.log(`  • Storybook:   ${colors.green}http://localhost:6006${colors.reset}`);
    }

    console.log('');
    if (process.platform === 'win32') {
      log.warning('Note: Each application is running in a separate Command Prompt window.');
      log.warning('      Close the windows to stop the applications.');
    } else {
      log.warning('Note: Each application is running in a separate Terminal window.');
      log.warning('      Close the windows or use ./stop-all.sh to stop the applications.');
    }
    console.log('');

    process.exit(0);
  } catch (error) {
    log.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
