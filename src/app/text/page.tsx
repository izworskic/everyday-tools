import React from "react";
import type { Metadata } from "next";
import TextTools from "@/components/tools/TextTools";
import { buildPageMetadata, CreatorAuthority } from "@/lib/seo-schema";

export const metadata: Metadata = buildPageMetadata(
  "text",
  "Copy-Paste Unicode Fonts, Invisible Text & Speech Time",
  "Transform text into bold, cursive, gothic, and bubble Unicode fonts, copy invisible Discord characters, and calculate speaking time by word count."
);

export default function TextHubPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30">
          Unicode Text, Symbols & Speech Pacing
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Copy-Paste Unicode Fonts, Invisible Text & Speaking Time Calculator
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          One-click copy aesthetic fonts for TikTok, Instagram, and Discord, grab blank invisible characters (`U+2800` / `U+3164`), or calculate how long any script takes to read out loud.
        </p>
      </div>

      <TextTools />

      <CreatorAuthority
        relPath="text"
        pageName="Copy-Paste Unicode Fonts, Invisible Text & Speech Time"
      />
    </div>
  );
}
