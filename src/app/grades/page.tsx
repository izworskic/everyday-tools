import React from "react";
import type { Metadata } from "next";
import GradesCalculator from "@/components/tools/GradesCalculator";
import { buildPageMetadata, CreatorAuthority } from "@/lib/seo-schema";

export const metadata: Metadata = buildPageMetadata(
  "grades",
  "Final Exam Grade & AP Score Calculator (2026)",
  "Find out what score you need on your final exam to get an A, or use interactive AP Exam score sliders to predict your 1-5 score."
);

export default function GradesHubPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
          Academic Grade & Exam Calculators
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          &ldquo;What Do I Need on My Final?&rdquo; & Interactive AP Score Calculator
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Calculate the exact final exam percentage required to hit your target class grade, or slide Multiple-Choice and Free-Response scores to predict your 1–5 AP exam score.
        </p>
      </div>

      <GradesCalculator />

      <CreatorAuthority
        relPath="grades"
        pageName="Final Exam Grade & AP Score Calculator (2026)"
      />
    </div>
  );
}
