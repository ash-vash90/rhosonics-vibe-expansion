import { readFileSync, writeFileSync } from 'node:fs';
const source = new URL('../src/data/color-tokens.json', import.meta.url);
const destination = new URL('../src/brand-tokens.css', import.meta.url);
const tokens = JSON.parse(readFileSync(source, 'utf8'));
const css = '/* Generated from src/data/color-tokens.json. Run node scripts/generate-brand-tokens.mjs. */\n:root {\n' + Object.entries(tokens).map(([key, value]) => `  --${key}: ${value};`).join('\n') + '\n}\n';
if (process.argv.includes('--check')) {
  if (readFileSync(destination, 'utf8') !== css) throw new Error('Brand CSS is stale. Run node scripts/generate-brand-tokens.mjs.');
} else writeFileSync(destination, css);
