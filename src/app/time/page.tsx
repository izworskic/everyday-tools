import React from "react";
import type { Metadata } from "next";
import TimeCalculator from "@/components/tools/TimeCalculator";
import { buildPageMetadata, CreatorAuthority } from "@/lib/seo-schema";

export const metadata: Metadata = buildPageMetadata(
  "time",
  "Work Hours, Timesheet & Sleep Cycle Calculator",
  "Calculate exact hours and minutes between two times, convert timesheets to payroll decimals, and find 90-minute REM sleep cycle bedtimes."
);

export default function TimeHubPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          Time, Payroll & Sleep Utilities
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Work Hours, Timesheet Decimal & 90-Minute Sleep Cycle Calculator
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Calculate exact hours between two times with unpaid lunch breaks, convert minutes into payroll decimals for ADP/Gusto, or plan your wake-up time around 90-minute REM cycles.
        </p>
      </div>

      <TimeCalculator />

      <CreatorAuthority
        relPath="time"
        pageName="Work Hours, Timesheet & Sleep Cycle Calculator"
      />
    </div>
  );
}
