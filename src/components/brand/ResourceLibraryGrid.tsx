import { cn } from "@/lib/utils";
import { Download, FileText, ArrowUpRight } from "@/lib/icons";

/**
 * ResourceLibraryCard — FLSmidth-pattern downloadable spec sheet card.
 *
 * Cards stack into a uniform grid; each represents one downloadable
 * artefact (datasheet, white paper, calibration guide, certificate of
 * conformity). Format/size/date are first-class metadata, not footnotes —
 * engineers vet provenance before they click.
 */

export type ResourceKind =
  | "datasheet"
  | "whitepaper"
  | "guide"
  | "certificate"
  | "drawing";

const KIND_LABEL: Record<ResourceKind, string> = {
  datasheet: "Datasheet",
  whitepaper: "White paper",
  guide: "Application guide",
  certificate: "Certificate",
  drawing: "Drawing",
};

export interface ResourceItem {
  kind: ResourceKind;
  code: string; // e.g. "DS.SDM-ECO.04"
  title: string;
  summary: string;
  format: "PDF" | "DWG" | "STEP" | "ZIP";
  sizeKb: number;
  pages?: number;
  revision: string; // e.g. "Rev 4 · 2024-11"
  href: string;
  external?: boolean;
}

interface ResourceLibraryGridProps {
  items: ResourceItem[];
  className?: string;
}

const formatSize = (kb: number) => {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export const ResourceLibraryCard = ({ item }: { item: ResourceItem }) => {
  const Icon = item.external ? ArrowUpRight : Download;
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cn(
        "group block bg-background p-5 md:p-6 transition-colors",
        "hover:bg-[hsl(var(--slate-100))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      )}
      aria-label={`${KIND_LABEL[item.kind]} — ${item.title}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <FileText className="w-4 h-4 text-primary shrink-0" />
          <span className="font-data text-[10px] uppercase tracking-[0.25em] text-primary truncate">
            {KIND_LABEL[item.kind]}
          </span>
        </div>
        <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
          {item.code}
        </span>
      </div>

      <h4 className="font-ui text-base md:text-lg font-semibold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
        {item.title}
      </h4>
      <p className="font-ui text-sm text-muted-foreground leading-relaxed max-w-[42ch] mb-5">
        {item.summary}
      </p>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
        <dl className="flex items-baseline gap-4 font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <div className="flex items-baseline gap-1.5">
            <dt className="sr-only">Format</dt>
            <dd className="text-foreground/80">{item.format}</dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="sr-only">Size</dt>
            <dd>{formatSize(item.sizeKb)}</dd>
          </div>
          {item.pages && (
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Pages</dt>
              <dd>{item.pages}p</dd>
            </div>
          )}
        </dl>
        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>

      <div className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 mt-3">
        {item.revision}
      </div>
    </a>
  );
};

export const ResourceLibraryGrid = ({ items, className }: ResourceLibraryGridProps) => (
  <div
    className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden",
      className,
    )}
  >
    {items.map((it) => (
      <ResourceLibraryCard key={it.code} item={it} />
    ))}
  </div>
);

export default ResourceLibraryGrid;
