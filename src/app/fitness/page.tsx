import React from "react";
import type { Metadata } from "next";
import FitnessCalculator from "@/components/tools/FitnessCalculator";

export const metadata: Metadata = {
  title: "TDEE, BMI, Macro & Strength Level Calculator | MegaTools Fitness Hub",
  description:
    "Calculate your daily maintenance calories (TDEE), optimal protein macro split, weight loss goal date, and barbell strength standards by bodyweight.",
};

export default function FitnessHubPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          Vertical 1 • 3.8M+ Monthly Search Potential • $22–$38 RPM
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Body Stats, TDEE, Macro & Strength Standard Calculator
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Instant Mifflin-St Jeor TDEE & calorie deficit timeline, high-protein macro split, and 1-Rep Max strength benchmarks across every height and bodyweight combination.
        </p>
      </div>

      <FitnessCalculator />
    </div>
  );
}
