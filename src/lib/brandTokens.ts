import values from '../data/color-tokens.json';

export type ColorToken = keyof typeof values;
export const colorValues = values;
export function colorToken(name: ColorToken) {
  const hsl = values[name];
  const [h, s, l] = hsl.split(' ').map(parseFloat) as [number, number, number];
  const saturation = s / 100;
  const lightness = l / 100;
  const a = saturation * Math.min(lightness, 1 - lightness);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  const rgb = [channel(0), channel(8), channel(4)];
  return { hsl, rgb: rgb.join(', '), hex: '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase() };
}
export function contrastRatio(first: string, second: string) {
  const luminance = (hex: string) => {
    const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return (channels[0] ?? 0) * 0.2126 + (channels[1] ?? 0) * 0.7152 + (channels[2] ?? 0) * 0.0722;
  };
  const a = luminance(first), b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
export const buildColorCSS = () => ':root {\n' + Object.entries(values).map(([key, value]) => `  --${key}: ${value};`).join('\n') + '\n}\n';
export const FONT_CSS = `/* Place primetime-light.woff2 in /fonts. */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
@font-face { font-family: 'Primetime'; src: url('/fonts/primetime-light.woff2') format('woff2'); font-weight: 300; font-style: normal; font-display: swap; }
.font-logo { font-family: 'Primetime', sans-serif; font-weight: 300; }
.font-ui { font-family: 'Instrument Sans', sans-serif; }
.font-data { font-family: 'JetBrains Mono', monospace; font-weight: 500; }
`;
