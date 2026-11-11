import React from "react";
import type { Metadata } from "next";
import TimeCalculator from "@/components/tools/TimeCalculator";

export const metadata: Metadata = {
  title: "Work Hours Calculator, Payroll Decimal Converter & 90-Min Sleep Cycle Tool",
  description:
    "Calculate exact hours and minutes between two times, convert timesheets to payroll decimals, and find optimal 90-minute REM sleep cycle bedtimes.",
};

export default function TimeHubPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          Vertical 3 • 6.5M+ Monthly Search Potential • Repeat Daily Traffic
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Work Hours, Timesheet Decimal & 90-Minute Sleep Cycle Calculator
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Calculate exact hours between two times with unpaid lunch breaks, convert minutes into payroll decimals for ADP/Gusto, or plan your wake-up time around 90-minute REM cycles.
        </p>
      </div>

      <TimeCalculator />
    </div>
  );
}
