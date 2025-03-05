import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      // Build and dependency directories
      'node_modules/',
      '.next/',
      'build/',
      'dist/',

      // Environment and configuration files
      '.env',
      '.env.local',
      '.env.development',
      '.env.production',

      // Dependency lock files
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',

      // Testing and coverage
      'coverage/',
      '.nyc_output/',

      // Miscellaneous
      '*.config.js',
      '*.config.ts',
      'eslint.config.js',
      'next.config.js',
      'next.config.mjs',

      // Type definitions
      '**/*.d.ts',

      // Generated files
      '.vercel/',
      '.turbo/'
    ]
  }
];

export default eslintConfig;
