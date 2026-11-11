import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { WHEEL_PRESETS, WORD_PATTERN_PRESETS } from "@/data/pseoData";
import GamesTools from "@/components/tools/GamesTools";

export function generateStaticParams() {
  return [
    ...WORD_PATTERN_PRESETS.map((w) => ({ slug: w.slug })),
    ...WHEEL_PRESETS.map((wh) => ({ slug: wh.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const wp = WORD_PATTERN_PRESETS.find((w) => w.slug === slug);
  if (wp) {
    return {
      title: `${wp.label} — Complete Wordle & Scrabble Word List`,
      description: `All ${wp.label.toLowerCase()} with live excluded-letter filter for Wordle, NYT games, Crosswords, and Words With Friends.`,
    };
  }

  const wh = WHEEL_PRESETS.find((w) => w.slug === slug) || WHEEL_PRESETS[0];
  return {
    title: `${wh.title} — Free Online Random Spinner`,
    description: wh.description,
  };
}

export default async function GamesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wp = WORD_PATTERN_PRESETS.find((w) => w.slug === slug);
  const wh = WHEEL_PRESETS.find((w) => w.slug === slug);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/games" className="hover:text-white">Word Solver & Wheels</Link>
        <span>/</span>
        <span className="text-cyan-400 font-semibold">{slug}</span>
      </div>

      <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-6 space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          Pre-Filled Programmatic SEO Page • Est. Search Vol:{" "}
          {wp ? wp.searchVolume : wh?.searchVolume || "120,000/mo"}
        </span>
        {wp ? (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {wp.label} (Live Filter & Wordle Helper)
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              Browse all 5-letter English words matching <strong>{wp.label}</strong>. Add gray excluded letters or yellow included letters below to narrow down your exact puzzle answer.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {wh?.title || "Interactive Decision Wheel"}
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              {wh?.description} Customize the slices or click Spin Now!
            </p>
          </>
        )}
      </div>

      <GamesTools
        initialWheelSlug={wh ? wh.slug : "what-to-eat-for-dinner"}
        initialStartsWith={wp ? wp.startsWith : "ST"}
        initialEndsWith={wp ? wp.endsWith : ""}
        initialContains={wp ? wp.contains : ""}
        activeSlug={slug}
      />
    </div>
  );
}
