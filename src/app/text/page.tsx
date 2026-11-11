import React from "react";
import type { Metadata } from "next";
import TextTools from "@/components/tools/TextTools";

export const metadata: Metadata = {
  title: "Copy-Paste Unicode Font Generator, Invisible Character & Words to Speaking Time",
  description:
    "Transform text into bold, cursive, gothic, and bubble Unicode social fonts, copy invisible Discord/Fortnite characters, and calculate speaking time by word count.",
};

export default function TextHubPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30">
          Vertical 5 • 9.4M+ Monthly Search Potential • Pure Volume Play
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Copy-Paste Unicode Fonts, Invisible Text & Speaking Time Calculator
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          One-click copy aesthetic fonts for TikTok, Instagram, and Discord, grab blank invisible characters (`U+2800` / `U+3164`), or calculate how long any script takes to read out loud.
        </p>
      </div>

      <TextTools />
    </div>
  );
}
