import React from "react";
import { resolvePortfolioHighlights } from "@/lib/portfolioHighlights";

/**
 * Premium stat / outcome strip — sits under the project image.
 */
export default function PortfolioHighlightStrip({ project, compact = false }) {
  const { line1, line2, line3 } = resolvePortfolioHighlights(project);

  return (
    <div
      className={`border-b border-white/10 border-l-2 border-l-cyan-500/35 bg-gradient-to-br from-slate-950/95 via-gray-900/90 to-blue-950/50 ${compact ? "px-3 py-2.5" : "px-4 py-3.5"} shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`}
    >
      <p
        className={`font-medium uppercase tracking-[0.12em] text-slate-500 ${compact ? "text-[9px] leading-snug" : "text-[10px] sm:text-[11px]"}`}
      >
        {line1}
      </p>
      <p
        className={`mt-1.5 font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-amber-300 ${compact ? "text-xs" : "text-sm sm:text-base"}`}
      >
        {line2}
      </p>
      <p className={`mt-1.5 text-slate-400 ${compact ? "text-[10px] leading-snug" : "text-[11px] sm:text-xs"}`}>
        {line3}
      </p>
    </div>
  );
}
