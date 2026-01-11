import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "@/components/AnimatedLogo";

interface CaseStudyPageLayoutProps {
  children: React.ReactNode;
  pageIndex: number;
  totalPages: number;
  pageTitle?: string;
  companyName?: string;
  className?: string;
}

export function CaseStudyPageLayout({
  children,
  pageIndex,
  totalPages,
  pageTitle = "CASE STUDY",
  companyName,
  className,
}: CaseStudyPageLayoutProps) {
  const headerTitle = pageIndex === 0 
    ? "CASE STUDY" 
    : companyName 
      ? `${companyName.toUpperCase()} — RESULTS` 
      : pageTitle.toUpperCase();

  return (
    <div className={cn("relative flex flex-col h-full", className)}>
      {/* Header Bar */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-obsidian">
        <div className="flex items-center gap-3">
          <AnimatedLogo variant="white" className="w-6 h-6" />
          <span className="font-logo text-sm font-semibold text-white tracking-wide">
            RHOSONICS
          </span>
        </div>
        <span className="font-data text-xs text-white/60 tracking-wider uppercase">
          {headerTitle}
        </span>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Footer Bar */}
      <footer className="flex-shrink-0 flex items-center justify-between px-6 py-2 bg-white border-t border-slate-200">
        <div className="flex items-center gap-4">
          <span className="font-ui text-xs text-slate-500">
            rhosonics.com
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-ui text-xs text-slate-500">
            Headquarters: The Netherlands
          </span>
        </div>
        <span className="font-data text-xs text-slate-400">
          {pageIndex + 1} / {totalPages}
        </span>
      </footer>
    </div>
  );
}
