import { ScrollSection } from '@/components/brand/ScrollSection';
import { SectionDivider } from '@/components/brand/SectionUtils';
import { PageBanner } from '@/components/brand/PageBanner';
import { TelemetryFooter } from '@/components/brand/telemetry';
import { DecisionQuestions } from '@/components/brand/DecisionQuestions';
import { AdditionalDonts } from '@/components/brand/AdditionalDonts';
import SectionCrossLink from '@/components/brand/SectionCrossLink';
import { EvidenceNotice } from '@/components/brand/EvidenceNotice';

const statuses = [
  { title: 'Approved evidence', body: 'A claim with a linked source, date, method, conditions and recorded approval. Only this status permits reuse in published material.' },
  { title: 'Illustrative example', body: 'A layout or writing demonstration. Use placeholders or label simulated readings beside the example. It is not product evidence.' },
  { title: 'Awaiting verification', body: 'A candidate result that still needs its source or approval. Keep it out of published claims until the evidence is complete.' },
];
const ProofPage = () => (
  <>
    <PageBanner number="09.B" title="Proof" subtitle="How to publish field results, comparisons and customer references with evidence people can check." />
    <ScrollSection id="comparison">
      <h2 className="font-ui text-2xl font-semibold mb-4">State the evidence status</h2>
      <p className="text-base text-muted-foreground max-w-prose mb-6">Approved evidence records have not yet been added to this reference. Use the structure below to prepare a claim, then attach the supporting report and record approval before publication.</p>
      <div className="grid md:grid-cols-3 gap-6">{statuses.map(status => <article key={status.title} className="bg-card rounded-lg p-6 border border-border">
        <h3 className="font-ui text-lg font-semibold mb-3">{status.title}</h3>
        <p className="text-base text-muted-foreground">{status.body}</p>
      </article>)}</div>
    </ScrollSection>
    <SectionDivider label="09.B.1" />
    <ScrollSection id="triads" variant="tinted">
      <h2 className="font-ui text-2xl font-semibold mb-6">A reusable field-result structure</h2>
      <EvidenceNotice>Bracketed fields below are placeholders. No customer result or quotation is approved by this example.</EvidenceNotice>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          ['Process context', '[Customer-approved site and date]', 'Show the relevant process and instrument. Credit the photograph and record permission for publication.'],
          ['Measured outcome', '[Change] [unit] versus [baseline]', 'Link the report. Name the method, operating conditions, sample or time window, uncertainty and approver.'],
          ['Customer perspective', '[Approved verbatim quotation]', 'Name the speaker, role and organisation where permission allows. Omit the quotation until the wording is confirmed.'],
        ].map(([title, example, body]) => <article key={title} className="bg-background rounded-lg p-6">
          <h3 className="font-ui text-lg font-semibold mb-3">{title}</h3>
          <p className="font-data text-sm mb-4">{example}</p>
          <p className="text-base text-muted-foreground">{body}</p>
        </article>)}
      </div>
    </ScrollSection>
    <SectionDivider label="09.B.2" />
    <ScrollSection id="worked-example">
      <h2 className="font-ui text-2xl font-semibold mb-4">What a complete record looks like</h2>
      <p className="text-base text-muted-foreground max-w-prose mb-6">A claim is publishable when a reader can reconstruct it. Every field below is required; a missing field keeps the claim at &ldquo;awaiting verification&rdquo;.</p>
      <EvidenceNotice>The fields below describe the required structure. The bracketed values are placeholders, not results.</EvidenceNotice>
      <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded overflow-hidden">
        {[
          ['Claim', 'One sentence, one quantity, one unit'],
          ['Baseline', 'What it is measured against, and when'],
          ['Method', 'Instrument, configuration, sampling'],
          ['Conditions', 'Process, medium, temperature, duration'],
          ['Uncertainty', 'Stated range, not a single figure'],
          ['Source', 'Linked report, author and date'],
          ['Permission', 'Named customer approval on file'],
          ['Approver', 'Who signed off, and when'],
          ['Review date', 'When the claim must be rechecked'],
        ].map(([term, detail]) => (
          <div key={term} className="bg-background p-5">
            <dt className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{term}</dt>
            <dd className="text-sm text-foreground">{detail}</dd>
          </div>
        ))}
      </dl>
    </ScrollSection>
    <SectionDivider label="09.B.3" />
    <ScrollSection id="references" variant="tinted">
      <h2 className="font-ui text-2xl font-semibold mb-4">Comparisons and references</h2>
      <p className="text-base text-muted-foreground max-w-prose">Compare named configurations under defined conditions. State the quantity, units and uncertainty; never assign a single accuracy score to a whole technology. SDM ECO uses ultrasound, so an ultrasonic comparison must identify the alternative instrument or method. Publish customer names and logos only with recorded permission. Installation totals need a definition, scope and as-of date.</p>
    </ScrollSection>
    <SectionDivider label="09.B.4" />
    <ScrollSection id="language">
      <h2 className="font-ui text-2xl font-semibold mb-6">Wording that holds up</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <article className="bg-card rounded p-6 border border-border">
          <h3 className="font-ui text-lg font-semibold mb-3">Write</h3>
          <ul className="space-y-2 text-base text-muted-foreground list-disc pl-5 max-w-[55ch]">
            <li>&ldquo;Density reading within ±0.5% of laboratory reference over a 30-day trial.&rdquo;</li>
            <li>&ldquo;Calibration interval extended from monthly to quarterly at this site.&rdquo;</li>
            <li>&ldquo;Reported by the site process engineer, March 2026.&rdquo;</li>
          </ul>
        </article>
        <article className="bg-card rounded p-6 border border-border">
          <h3 className="font-ui text-lg font-semibold mb-3">Do not write</h3>
          <ul className="space-y-2 text-base text-muted-foreground list-disc pl-5 max-w-[55ch]">
            <li>&ldquo;The most accurate density meter available.&rdquo;</li>
            <li>&ldquo;Up to 30% savings&rdquo; with no baseline or period.</li>
            <li>&ldquo;Proven worldwide&rdquo; with no installation definition or date.</li>
          </ul>
        </article>
      </div>
    </ScrollSection>
    <SectionDivider label="09.B.5" />
    <ScrollSection id="sustainability" variant="tinted">
      <h2 className="font-ui text-2xl font-semibold mb-4">Environmental claims need a baseline</h2>
      <p className="text-base text-muted-foreground max-w-prose">State the measured change, baseline, period and contributing process changes. For fleet totals, disclose inclusion criteria and avoid double counting. Name an independent verifier or assurance standard only when the report supports that attribution, and link the report.</p>
    </ScrollSection>
    <SectionDivider label="09.B.4" />
    <ScrollSection id="governance">
      <div className="grid lg:grid-cols-2 gap-10">
        <DecisionQuestions code="09.B.4" questions={['Can the reader open the source behind every claim?', 'Are baseline, method, conditions and date stated?', 'Has the customer approved the quotation and reference?', 'Is the evidence status clear wherever the example appears?']} />
        <AdditionalDonts code="09.B.5" items={['Never publish illustrative readings as product specifications.', 'Never attribute verification without a supporting report.', 'Never invent a quotation, customer reference or approval.', 'Never hide material test conditions behind a headline.']} />
      </div>
    </ScrollSection>
    <SectionCrossLink links={[{ label: 'Applications', to: '/applications', description: 'Labelled interface examples' }, { label: 'Resources', to: '/resources', description: 'Asset availability and ownership' }]} />
    <TelemetryFooter className="mt-16" items={[{ label: 'Section', value: '09.B · Proof' }, { label: 'Evidence', value: 'Verification pending' }, { label: 'Owner', value: 'MarComms' }, { label: 'Status', value: 'Reference template', emphasis: true }]} />
  </>
);
export default ProofPage;
