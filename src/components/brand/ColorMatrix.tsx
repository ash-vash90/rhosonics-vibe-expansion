import { colorToken, contrastRatio, type ColorToken } from '@/lib/brandTokens';
import { BrandCallout } from './BrandCallout';

type Swatch = { token: ColorToken; name: string; use: string };
const groups: { title: string; description: string; swatches: Swatch[] }[] = [
  { title: 'Foundations', description: 'Slate structures light interfaces. Obsidian anchors dark surfaces and product presentations.', swatches: [
    { token: 'slate-50', name: 'Slate 50', use: 'Page backgrounds' },
    { token: 'slate-200', name: 'Slate 200', use: 'Borders and dividers' },
    { token: 'slate-600', name: 'Slate 600', use: 'Secondary text on light surfaces' },
    { token: 'slate-900', name: 'Slate 900', use: 'Primary text' },
    { token: 'rho-obsidian', name: 'Obsidian', use: 'Dark surfaces and hardware' },
    { token: 'rho-obsidian-light', name: 'Obsidian Light', use: 'Dark panels' },
  ] },
  { title: 'Brand and actions', description: 'Brand green identifies Rhosonics. Darker action green supports white button labels. Lime is reserved for approved gradients.', swatches: [
    { token: 'rho-green', name: 'Rhosonics Green', use: 'Brand accents and measurement emphasis' },
    { token: 'rho-green-accent', name: 'Lime Accent', use: 'Brand gradients; never white text' },
    { token: 'action', name: 'Action Green', use: 'Primary buttons with white labels; links on light surfaces' },
    { token: 'action-hover', name: 'Action Hover', use: 'Button hover and pressed states' },
  ] },
  { title: 'Operational state', description: 'Use status colours with a label or icon. A brand accent is not a success indicator.', swatches: [
    { token: 'success', name: 'Success Green', use: 'Confirmation indicators' },
    { token: 'success-surface', name: 'Success Surface', use: 'Confirmation backgrounds' },
    { token: 'info', name: 'Info Slate', use: 'Informational indicators' },
    { token: 'info-surface', name: 'Info Surface', use: 'Guidance backgrounds' },
    { token: 'warning', name: 'Warning Amber', use: 'Caution indicators' },
    { token: 'warning-surface', name: 'Warning Surface', use: 'Caution backgrounds' },
    { token: 'error', name: 'Error Red', use: 'Errors and destructive actions' },
    { token: 'error-surface', name: 'Error Surface', use: 'Error backgrounds' },
  ] },
  { title: 'Context', description: 'Mineral supports field imagery and environmental content, not general interface chrome. Eco surfaces accompany sourced environmental metrics.', swatches: [
    { token: 'mineral-surface', name: 'Mineral Surface', use: 'Field-context backgrounds' },
    { token: 'mineral-neutral', name: 'Mineral Neutral', use: 'Field accents' },
    { token: 'mineral-deep', name: 'Mineral Deep', use: 'Text on mineral surfaces' },
    { token: 'mineral-bronze', name: 'Mineral Bronze', use: 'Secondary field accents' },
    { token: 'eco-surface', name: 'Eco Surface', use: 'Environmental metric backgrounds' },
    { token: 'eco-border', name: 'Eco Border', use: 'Environmental metric borders' },
  ] },
];
const pairs: { foreground: ColorToken; background: ColorToken; use: string }[] = [
  { foreground: 'slate-900', background: 'slate-50', use: 'Body text' },
  { foreground: 'slate-600', background: 'white', use: 'Secondary text' },
  { foreground: 'white', background: 'rho-obsidian', use: 'Dark surfaces' },
  { foreground: 'white', background: 'action', use: 'Primary button' },
  { foreground: 'white', background: 'action-hover', use: 'Primary button hover' },
  { foreground: 'rho-obsidian', background: 'eco-surface', use: 'Environmental metric text' },
];
export const ColorMatrix = () => (
  <div className="space-y-12">
    {groups.map(group => <section key={group.title}>
      <h3 className="font-ui text-2xl font-semibold mb-3">{group.title}</h3>
      <p className="text-base text-muted-foreground max-w-prose mb-6">{group.description}</p>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        {group.swatches.map(swatch => {
          const value = colorToken(swatch.token);
          return <div key={swatch.token} className="flex gap-4 border-b border-border pb-4">
            <div aria-hidden className="w-16 h-16 shrink-0 rounded border border-border" style={{ backgroundColor: `hsl(${value.hsl})` }} />
            <div className="min-w-0">
              <h4 className="font-ui font-semibold">{swatch.name}</h4>
              <p className="text-sm text-muted-foreground">{swatch.use}</p>
              <p className="font-data text-xs mt-2 break-words">{value.hex} · rgb({value.rgb})</p>
              <p className="font-data text-xs text-muted-foreground break-words">hsl({value.hsl})</p>
            </div>
          </div>;
        })}
      </div>
    </section>)}
    <section>
      <h3 className="font-ui text-2xl font-semibold mb-3">Approved text pairings</h3>
      <p className="text-base text-muted-foreground max-w-prose mb-6">These opaque pairs exceed 4.5:1. Recheck contrast when using opacity, imagery or different surfaces.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pairs.map(pair => <div key={pair.use} className="rounded-lg p-5" style={{ color: colorToken(pair.foreground).hex, backgroundColor: colorToken(pair.background).hex }}>
          <p className="font-ui font-semibold">{pair.use}</p>
          <p className="font-data text-sm mt-2">{contrastRatio(colorToken(pair.foreground).hex, colorToken(pair.background).hex).toFixed(2)}:1</p>
          <p className="font-data text-xs mt-2">{pair.foreground} / {pair.background}</p>
        </div>)}
      </div>
      <BrandCallout variant="info" title="Keep brand green; use action green for white labels" className="mt-6">
        White on Rhosonics Green is {contrastRatio(colorToken('white').hex, colorToken('rho-green').hex).toFixed(2)}:1; white on Lime Accent is {contrastRatio(colorToken('white').hex, colorToken('rho-green-accent').hex).toFixed(2)}:1. Neither meets the 4.5:1 normal-text target. Use Action Green for small white labels.
      </BrandCallout>
    </section>
    <section>
      <h3 className="font-ui text-2xl font-semibold mb-3">Gradients</h3>
      <p className="text-base text-muted-foreground max-w-prose mb-6">Use the approved brand gradient on large marketing surfaces. Keep operational UI flat. Place labels on a solid, tested surface rather than across a gradient.</p>
      <div aria-label="Brand gradient specimen" className="h-20 bg-brand-gradient rounded-lg" />
      <p className="font-data text-xs mt-3">Lime Accent → Rhosonics Green · 135°</p>
    </section>
  </div>
);
export default ColorMatrix;
