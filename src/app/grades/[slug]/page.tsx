import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AP_EXAMS, FINAL_GRADE_PRESETS } from "@/data/pseoData";
import GradesCalculator from "@/components/tools/GradesCalculator";

export function generateStaticParams() {
  return [
    ...AP_EXAMS.map((e) => ({ slug: e.slug })),
    ...FINAL_GRADE_PRESETS.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ap = AP_EXAMS.find((e) => e.slug === slug);
  if (ap) {
    return {
      title: `${ap.name} Score Calculator (2026 Curve & Cutoff Percentages)`,
      description: `Interactive ${ap.name} score calculator: convert your ${ap.mcqCount} Multiple Choice questions and Free Response points into a 1–5 AP score.`,
    };
  }

  const fg = FINAL_GRADE_PRESETS.find((p) => p.slug === slug) || FINAL_GRADE_PRESETS[0];
  return {
    title: `I Have an ${fg.currentGrade}% and My Final Is Worth ${fg.finalWeight}% — What Do I Need?`,
    description: `Find out what score you need on a final exam worth ${fg.finalWeight}% when your current class grade is ${fg.currentGrade}% to finish with an A (${fg.targetGrade}%).`,
  };
}

export default async function GradesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ap = AP_EXAMS.find((e) => e.slug === slug);
  const fg = FINAL_GRADE_PRESETS.find((p) => p.slug === slug);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/grades" className="hover:text-white">Grades & AP Scores</Link>
        <span>/</span>
        <span className="text-purple-400 font-semibold">{slug}</span>
      </div>

      <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-6 space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          Pre-Filled Academic pSEO Page • Est. Search Vol:{" "}
          {ap ? ap.searchVolume : fg?.searchVolume || "45,000/mo"}
        </span>
        {ap ? (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {ap.name} Score Calculator (2026 Curve & Section Weights)
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              The <strong>{ap.name}</strong> exam weights Multiple Choice at <strong>{ap.mcqWeightPct}%</strong> ({ap.mcqCount} questions) and Free Response at <strong>{ap.frqWeightPct}%</strong> ({ap.frqMaxPoints} points). A composite score of <strong>{ap.cutoffs[3]}%+</strong> typically earns a <strong>5</strong>.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Current Grade {fg?.currentGrade || 85}% With a {fg?.finalWeight || 20}% Final Exam: What Score Do You Need?
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              See the exact final exam score required to finish with an A (90%+), B (80%+), or C (70%+) when your current grade is <strong>{fg?.currentGrade || 85}%</strong> and the final counts for <strong>{fg?.finalWeight || 20}%</strong> of your overall grade.
            </p>
          </>
        )}
      </div>

      <GradesCalculator
        initialCurrentGrade={fg ? fg.currentGrade : 85}
        initialFinalWeight={fg ? fg.finalWeight : 20}
        initialTargetGrade={fg ? fg.targetGrade : 90}
        initialApSlug={ap ? ap.slug : "ap-biology"}
        activeSlug={slug}
      />
    </div>
  );
}
