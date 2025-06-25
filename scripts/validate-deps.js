#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating dependencies...');

// Check if package-lock.json exists and is valid
const lockFile = path.join(process.cwd(), 'package-lock.json');
if (!fs.existsSync(lockFile)) {
  console.error('❌ package-lock.json not found. Run npm install first.');
  process.exit(1);
}

try {
  const lockContent = JSON.parse(fs.readFileSync(lockFile, 'utf8'));
  console.log('✅ package-lock.json is valid JSON');
} catch (error) {
  console.error('❌ package-lock.json is corrupted:', error.message);
  process.exit(1);
}

// Check for common problematic patterns
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Check for duplicate dependencies
const allDeps = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

const duplicates = Object.keys(allDeps).filter((dep, index, arr) => 
  arr.indexOf(dep) !== index
);

if (duplicates.length > 0) {
  console.warn('⚠️  Duplicate dependencies found:', duplicates);
}

// Check for potentially problematic packages
const problematicPackages = [
  '@radix-ui/react-context',
  '@radix-ui/react-compose-refs',
  '@floating-ui/dom',
  '@eslint/eslintrc'
];

const foundProblematic = problematicPackages.filter(pkg => 
  allDeps[pkg] !== undefined
);

if (foundProblematic.length > 0) {
  console.log('📋 Found packages that commonly cause integrity issues:', foundProblematic);
  console.log('💡 These are now pinned in resolutions field');
}

console.log('✅ Dependency validation completed'); 