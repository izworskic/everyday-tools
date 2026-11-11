import React from "react";
import type { Metadata } from "next";
import GamesTools from "@/components/tools/GamesTools";

export const metadata: Metadata = {
  title: "5-Letter Wordle Pattern Finder & Interactive Spin-the-Wheel Picker",
  description:
    "Solve daily 5-letter word puzzles by starting, ending, and excluded letters, or spin interactive decision wheels for dinner, Yes/No, and party games.",
};

export default function GamesHubPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
          Vertical 6 • 12.0M+ Monthly Search Potential • High Session Duration
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Interactive Spin-the-Wheel Picker & 5-Letter Word Pattern Solver
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Spin custom decision wheels (What to Eat for Dinner, Yes or No, Truth or Dare) or filter 5-letter Wordle and Scrabble words by exact starting, ending, and excluded letters.
        </p>
      </div>

      <GamesTools />
    </div>
  );
}
