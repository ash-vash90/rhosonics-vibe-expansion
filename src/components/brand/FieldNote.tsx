interface FieldNoteProps {
  stamp: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const FieldNote = ({ stamp, quote, name, role, initials }: FieldNoteProps) => (
  <aside className="relative max-w-md pl-6 py-5 pr-5 bg-muted/30 clip-chamfer-sm rotate-[-0.4deg]">
    {/* Inner accent rail — inside the clipped surface so the chamfer doesn't cut it */}
    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-0.5 bg-primary" aria-hidden="true" />

    <div className="flex items-center gap-3 mb-3">
      <span className="font-data text-[10px] uppercase tracking-[0.2em] text-primary">
        {stamp}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>

    <p className="font-ui italic text-base leading-relaxed text-foreground">
      &ldquo;{quote}&rdquo;
    </p>

    <div className="mt-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-rho-obsidian flex items-center justify-center shrink-0">
        <span className="font-data text-[11px] uppercase tracking-wider text-primary-foreground">
          {initials}
        </span>
      </div>
      <div>
        <div className="font-data text-xs uppercase tracking-wider text-foreground">
          {name}
        </div>
        <div className="font-ui text-xs text-muted-foreground">
          {role}
        </div>
      </div>
    </div>
  </aside>
);

export default FieldNote;
