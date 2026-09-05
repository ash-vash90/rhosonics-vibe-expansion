import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { colorToken, colorValues, contrastRatio, buildColorCSS, FONT_CSS, type ColorToken } from '../src/lib/brandTokens';
import { buildTokensStudioJSON, buildStyleDictionaryJSON } from '../src/lib/designTokenExport';

describe('brand delivery consistency', () => {
  it('keeps CSS and both external token formats on the same palette', () => {
    const css = readFileSync(new URL('../src/brand-tokens.css', import.meta.url), 'utf8');
    const studio = JSON.parse(buildTokensStudioJSON())['Rhosonics/Brand'].color.tokens;
    const dictionary = JSON.parse(buildStyleDictionaryJSON()).color.tokens;
    expect(css.slice(css.indexOf(':root'))).toBe(buildColorCSS());
    for (const key of Object.keys(colorValues) as ColorToken[]) {
      expect(studio[key].value).toBe(colorToken(key).hex);
      expect(dictionary[key].value).toBe(colorToken(key).hex);
    }
    expect(colorToken('rho-green').hex).toBe('#33993C');
    expect(colorToken('rho-green-accent').hex).toBe('#73B82E');
  });
  it('keeps white action labels above 4.5:1 in default and hover states', () => {
    for (const token of ['action', 'action-hover'] as const) {
      expect(contrastRatio('#FFFFFF', colorToken(token).hex)).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrastRatio('#FFFFFF', '#33993C')).toBeLessThan(4.5);
  });
  it('exports a font kit referencing the real wordmark font', () => {
    expect(FONT_CSS).toContain('font-weight: 300');
    const fontPath = FONT_CSS.match(/src: url\('([^']+)'\)/)?.[1];
    expect(fontPath).toBe('/fonts/primetime-light.woff2');
    expect(existsSync(new URL(`../public${fontPath}`, import.meta.url))).toBe(true);
  });
});
