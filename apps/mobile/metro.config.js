const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the workspace root (monorepo root)
const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// Let Metro find workspace packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Allow hierarchical lookup while still aliasing core libs to avoid duplicate React
config.resolver.disableHierarchicalLookup = false;

// Ensure single instances of core libraries across the monorepo
config.resolver.alias = {
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-web': path.resolve(projectRoot, 'node_modules/react-native-web'),
  zustand: path.resolve(projectRoot, 'node_modules/zustand'),
  'expo-modules-core': path.resolve(projectRoot, 'node_modules/expo-modules-core'),
};

module.exports = config;
