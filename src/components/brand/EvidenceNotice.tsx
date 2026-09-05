import { BrandCallout } from './BrandCallout';

export const EvidenceNotice = ({ children }: { children?: React.ReactNode }) => (
  <BrandCallout variant="info" title="Illustrative example — not an approved claim" className="mb-6">
    {children ?? 'Readings and outcomes in this example demonstrate the layout only. Replace them with a sourced, dated and approved record before external use.'}
  </BrandCallout>
);
