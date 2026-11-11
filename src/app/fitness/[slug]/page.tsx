import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BMI_PRESETS } from "@/data/pseoData";
import FitnessCalculator from "@/components/tools/FitnessCalculator";
import { buildPageMetadata, CreatorAuthority } from "@/lib/seo-schema";

export function generateStaticParams() {
  return BMI_PRESETS.map((p) => ({ slug: p.slug }));
}

function parseSlug(slug: string) {
  const preset = BMI_PRESETS.find((p) => p.slug === slug);
  if (preset) return preset;

  const match = slug.match(/(\d+)-ft-(\d+)-(\d+)-lbs/);
  if (match) {
    return {
      slug,
      feet: Number(match[1]),
      inches: Number(match[2]),
      weightLbs: Number(match[3]),
      searchVolume: "Preset",
    };
  }
  return BMI_PRESETS[7];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  return buildPageMetadata(
    `fitness/${slug}`,
    `${parsed.feet}'${parsed.inches}" ${parsed.weightLbs} lbs BMI, TDEE & Macros`,
    `Exact BMI, daily maintenance calories (TDEE), optimal protein intake, and strength standards for ${parsed.feet}'${parsed.inches}" and ${parsed.weightLbs} lbs.`
  );
}

export default async function FitnessSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  const totalInches = parsed.feet * 12 + parsed.inches;
  const heightMeters = (totalInches * 2.54) / 100;
  const weightKg = parsed.weightLbs * 0.453592;
  const bmi = (weightKg / (heightMeters * heightMeters)).toFixed(1);
  const pageTitle = `${parsed.feet}'${parsed.inches}" ${parsed.weightLbs} lbs BMI, TDEE & Macros`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/fitness" className="hover:text-white">Body & TDEE</Link>
        <span>/</span>
        <span className="text-emerald-400 font-semibold">
          {parsed.feet}&apos;{parsed.inches}&quot; {parsed.weightLbs} lbs
        </span>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Pre-Filled Body Stats Calculator
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {parsed.feet}&apos;{parsed.inches}&quot; and {parsed.weightLbs} lbs: Exact BMI ({bmi}), TDEE & Daily Macro Breakdown
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          At <strong>{parsed.feet} feet {parsed.inches} inches</strong> and <strong>{parsed.weightLbs} pounds</strong> ({weightKg.toFixed(1)} kg), your Body Mass Index is <strong>{bmi}</strong>. Adjust your activity level and goal weight below to see your exact daily calorie deficit and protein requirements.
        </p>
      </div>

      <FitnessCalculator
        initialFeet={parsed.feet}
        initialInches={parsed.inches}
        initialWeightLbs={parsed.weightLbs}
        activeSlug={slug}
      />

      <CreatorAuthority relPath={`fitness/${slug}`} pageName={pageTitle} />
    </div>
  );
}
