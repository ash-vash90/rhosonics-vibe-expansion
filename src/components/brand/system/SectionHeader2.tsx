import { SectionEyebrow } from "./SectionEyebrow";
import { SectionTitle } from "./SectionTitle";

interface SectionHeader2Props {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  onDark?: boolean;
  /** Right-aligned trailing slot (e.g. a link). */
  trailing?: React.ReactNode;
}

/**
 * SectionHeader2 — eyebrow + title + optional intro paragraph, matched
 * to the Claude-generated homepage section header rhythm. The number
 * tag is intentionally dropped — `SectionDivider label="01.x"` between
 * sections already carries the chapter number.
 */
export const SectionHeader2 = ({
  eyebrow,
  title,
  intro,
  onDark = false,
  trailing,
}: SectionHeader2Props) => (
  <header className="mb-10 md:mb-14">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-end">
      <div>
        <SectionEyebrow tone={onDark ? "accent" : "primary"} className="mb-4">
          {eyebrow}
        </SectionEyebrow>
        <SectionTitle onDark={onDark}>{title}</SectionTitle>
        {intro && (
          <p
            className={`mt-5 text-base md:text-[17px] leading-[1.6] max-w-[60ch] ${
              onDark
                ? "text-[hsl(var(--slate-300))]"
                : "text-[hsl(var(--slate-600))]"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
      {trailing && <div className="self-end">{trailing}</div>}
    </div>
  </header>
);

export default SectionHeader2;
