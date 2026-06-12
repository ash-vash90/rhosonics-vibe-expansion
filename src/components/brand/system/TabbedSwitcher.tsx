import { useState, ReactNode } from "react";

export interface SwitcherTab {
  id: string;
  num: string;
  name: string;
  sub?: string;
  /** Panel content rendered when this tab is active. */
  content: ReactNode;
}

interface TabbedSwitcherProps {
  tabs: SwitcherTab[];
  /** Default-active tab id. Defaults to the first tab. */
  defaultId?: string;
  ariaLabel?: string;
}

/**
 * TabbedSwitcher — full-width bordered tab strip with the green-underline
 * active treatment from the homepage ICP section. Active tab's underline
 * sits at bottom:-1px so it consumes the container border below.
 */
export const TabbedSwitcher = ({
  tabs,
  defaultId,
  ariaLabel = "Switcher",
}: TabbedSwitcherProps) => {
  const [activeId, setActiveId] = useState(defaultId ?? tabs[0]?.id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex items-stretch border-b border-border bg-card"
      >
        {tabs.map((t, i) => {
          const isActive = t.id === activeId;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              onClick={() => setActiveId(t.id)}
              className={`relative flex-1 text-left px-5 md:px-6 py-5 flex flex-col gap-1.5 transition-colors ${
                i < tabs.length - 1 ? "border-r border-border" : ""
              } hover:bg-[hsl(var(--slate-100))]`}
            >
              <span className="font-data text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {t.num}
              </span>
              <span
                className={`font-ui font-semibold text-base md:text-lg tracking-tight transition-colors ${
                  isActive ? "text-foreground" : "text-[hsl(var(--slate-500))]"
                }`}
              >
                {t.name}
              </span>
              {t.sub && (
                <span className="font-data text-[11px] text-[hsl(var(--slate-500))]">
                  {t.sub}
                </span>
              )}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-px h-[2px] bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="bg-card border-x border-b border-border"
      >
        {active.content}
      </div>
    </div>
  );
};

export default TabbedSwitcher;
