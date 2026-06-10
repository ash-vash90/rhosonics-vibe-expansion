import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * CommandPalette — global ⌘K / Ctrl+K launcher.
 *
 * Industrial: no glassmorphism, no chamfers. Mono caps for section codes,
 * Instrument Sans for labels. Lightweight — no cmdk dependency.
 */

interface Entry {
  num: string; // e.g. "09" or "09.1"
  label: string;
  hint?: string;
  path: string; // route
  hash?: string; // section id
}

const ENTRIES: Entry[] = [
  { num: "00", label: "Introduction", hint: "System directory", path: "/" },
  { num: "01", label: "Brand Position", hint: "Purpose · principles · audience", path: "/position" },
  { num: "02", label: "Voice & Tone", hint: "Lexicon · rewrites · funnel rule", path: "/voice" },
  { num: "02.1", label: "Lexicon", hint: "Words to use / avoid", path: "/voice", hash: "lexicon" },
  { num: "02.2", label: "Before / After rewrites", path: "/voice", hash: "rewrites" },
  { num: "03", label: "Logo", path: "/logo" },
  { num: "04", label: "Color", path: "/color" },
  { num: "05", label: "Typography", path: "/typography" },
  { num: "06", label: "Iconography", hint: "UI icons + pictograms", path: "/iconography" },
  { num: "07", label: "Imagery", path: "/imagery" },
  { num: "08", label: "Data Visualization", hint: "Honesty rules · billboard.js", path: "/data-viz" },
  { num: "09", label: "Applications", path: "/applications" },
  { num: "09.1", label: "Industries", path: "/applications", hash: "applications" },
  { num: "09.2", label: "SDM Eco interface", path: "/applications", hash: "sdm-interface" },
  { num: "09.3", label: "Interface kit", path: "/applications", hash: "components" },
  { num: "09.4", label: "Proof & case studies", path: "/proof" },
  { num: "10", label: "Resources", hint: "Downloads · contacts · changelog", path: "/resources" },
  { num: "AP", label: "Tools", hint: "Photo treatment · icons · exports", path: "/tools" },
];

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ENTRIES;
    return ENTRIES.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.num.toLowerCase().includes(q) ||
        e.hint?.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (cursor >= results.length) setCursor(0);
  }, [results, cursor]);

  const go = (entry: Entry) => {
    setOpen(false);
    navigate(entry.path);
    if (entry.hash) {
      // wait one tick for route to mount
      setTimeout(() => {
        const el = document.getElementById(entry.hash!);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[cursor];
      if (entry) go(entry);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-xl rounded gap-0 border-0 bg-background overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-[hsl(var(--slate-100))]">
          <Search className="w-4 h-4 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onListKey}
            placeholder="Jump to section…"
            className="flex-1 bg-transparent outline-none text-foreground font-ui text-base placeholder:text-muted-foreground"
            aria-label="Command palette search"
          />
          <kbd className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>
        <ul
          role="listbox"
          className="max-h-[60vh] overflow-y-auto py-1"
          onKeyDown={onListKey}
        >
          {results.length === 0 && (
            <li className="px-5 py-6 text-sm text-muted-foreground">
              No matches.
            </li>
          )}
          {results.map((entry, i) => {
            const isActive = i === cursor;
            return (
              <li key={entry.num + entry.label} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => go(entry)}
                  onMouseEnter={() => setCursor(i)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-2.5 text-left",
                    isActive ? "bg-rho-obsidian text-slate-100" : "text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "font-data text-[11px] uppercase tracking-[0.2em] tabular-nums w-12 shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {entry.num}
                  </span>
                  <span className="font-ui text-sm flex-1 min-w-0 truncate">
                    {entry.label}
                  </span>
                  {entry.hint && (
                    <span
                      className={cn(
                        "font-data text-[10px] uppercase tracking-[0.2em] truncate max-w-[40%]",
                        isActive ? "text-slate-300" : "text-muted-foreground",
                      )}
                    >
                      {entry.hint}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--slate-100))] font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>↑↓ navigate · ↵ open</span>
          <span>⌘K toggle</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
