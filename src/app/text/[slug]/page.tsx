import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { WORD_COUNT_PRESETS } from "@/data/pseoData";
import TextTools from "@/components/tools/TextTools";

export function generateStaticParams() {
  return WORD_COUNT_PRESETS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const preset = WORD_COUNT_PRESETS.find((w) => w.slug === slug) || WORD_COUNT_PRESETS[3];
  const mins = (preset.words / 130).toFixed(1);
  return {
    title: `How Long Does It Take to Read ${preset.words.toLocaleString()} Words Out Loud? (~${mins} Mins)`,
    description: `A ${preset.words.toLocaleString()}-word speech or script takes roughly ${mins} minutes to speak out loud at a conversational 130 WPM pace.`,
  };
}

export default async function TextSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const preset = WORD_COUNT_PRESETS.find((w) => w.slug === slug) || WORD_COUNT_PRESETS[3];
  const mins = (preset.words / 130).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/text" className="hover:text-white">Fonts & Word Time</Link>
        <span>/</span>
        <span className="text-pink-400 font-semibold">{preset.words} Words</span>
      </div>

      <div className="rounded-2xl border border-pink-500/30 bg-pink-950/20 p-6 space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
          Pre-Filled Speaking Time pSEO Page • Est. Search Vol: {preset.searchVolume}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          How Long to Speak {preset.words.toLocaleString()} Words Out Loud? (~{mins} Minutes)
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          At an average presentation pace of <strong>130 words per minute</strong>, a <strong>{preset.words.toLocaleString()}-word</strong> script takes <strong>{mins} minutes</strong> to read aloud, or <strong>{(preset.words / 150).toFixed(1)} minutes</strong> at a faster 150 WPM podcast pace.
        </p>
      </div>

      <TextTools initialWordCount={preset.words} activeSlug={slug} />
    </div>
  );
}
