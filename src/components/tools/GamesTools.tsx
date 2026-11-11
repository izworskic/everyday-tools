"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FIVE_LETTER_DICTIONARY,
  VERTICALS,
  WHEEL_PRESETS,
  WORD_PATTERN_PRESETS,
} from "@/data/pseoData";
import MonetizationBanner from "@/components/MonetizationBanner";
import { Dices, Plus, RotateCw, Search, Sparkles, Trash2 } from "lucide-react";

interface Props {
  initialWheelSlug?: string;
  initialStartsWith?: string;
  initialEndsWith?: string;
  initialContains?: string;
  activeSlug?: string;
}

export default function GamesTools({
  initialWheelSlug = "what-to-eat-for-dinner",
  initialStartsWith = "ST",
  initialEndsWith = "",
  initialContains = "",
  activeSlug,
}: Props) {
  const vertical = VERTICALS.find((v) => v.id === "games")!;

  // 1. Spin Wheel State
  const initialWheel =
    WHEEL_PRESETS.find((w) => w.slug === initialWheelSlug) || WHEEL_PRESETS[0];
  const [wheelTitle, setWheelTitle] = useState<string>(initialWheel.title);
  const [wheelItems, setWheelItems] = useState<string[]>(initialWheel.items);
  const [newItemText, setNewItemText] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);

  const loadWheelPreset = (slug: string) => {
    const preset = WHEEL_PRESETS.find((w) => w.slug === slug);
    if (preset) {
      setWheelTitle(preset.title);
      setWheelItems(preset.items);
      setWinner(null);
    }
  };

  const spinWheel = () => {
    if (isSpinning || wheelItems.length === 0) return;
    setIsSpinning(true);
    setWinner(null);
    const extraSpins = 1440 + Math.floor(Math.random() * 1440);
    const nextRotation = rotationDeg + extraSpins;
    setRotationDeg(nextRotation);

    setTimeout(() => {
      const normalized = nextRotation % 360;
      const sliceAngle = 360 / wheelItems.length;
      const winningIndex =
        Math.floor(((360 - normalized) % 360) / sliceAngle) % wheelItems.length;
      setWinner(wheelItems[winningIndex]);
      setIsSpinning(false);
    }, 2400);
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    setWheelItems([...wheelItems, newItemText.trim()]);
    setNewItemText("");
  };

  // 2. 5-Letter Word Pattern Solver & Unscrambler State
  const [startsWith, setStartsWith] = useState<string>(initialStartsWith);
  const [endsWith, setEndsWith] = useState<string>(initialEndsWith);
  const [contains, setContains] = useState<string>(initialContains);
  const [excluded, setExcluded] = useState<string>("");

  const matchingWords = FIVE_LETTER_DICTIONARY.filter((word) => {
    const s = startsWith.trim().toUpperCase();
    const e = endsWith.trim().toUpperCase();
    const c = contains.trim().toUpperCase();
    const ex = excluded.trim().toUpperCase();

    if (s && !word.startsWith(s)) return false;
    if (e && !word.endsWith(e)) return false;
    if (c) {
      for (const ch of c) {
        if (!word.includes(ch)) return false;
      }
    }
    if (ex) {
      for (const ch of ex) {
        if (word.includes(ch)) return false;
      }
    }
    return true;
  });

  const SLICE_COLORS = [
    "#06b6d4",
    "#6366f1",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#14b8a6",
  ];

  // Build conic-gradient for the wheel
  const buildWheelGradient = () => {
    if (wheelItems.length === 0) return "#1e293b";
    const step = 100 / wheelItems.length;
    const stops = wheelItems.map((_, idx) => {
      const color = SLICE_COLORS[idx % SLICE_COLORS.length];
      const start = (idx * step).toFixed(2);
      const end = ((idx + 1) * step).toFixed(2);
      return `${color} ${start}% ${end}%`;
    });
    return `conic-gradient(${stops.join(", ")})`;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Decision Spin Wheel */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Dices className="w-5 h-5 text-cyan-400" />
              {wheelTitle}
            </h2>
            <div className="flex gap-1.5 flex-wrap">
              {WHEEL_PRESETS.map((preset) => (
                <button
                  key={preset.slug}
                  type="button"
                  onClick={() => loadWheelPreset(preset.slug)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                    wheelTitle === preset.title
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                  }`}
                >
                  {preset.title.replace(" Wheel", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Spin Wheel + Winner Display */}
          <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
            <div className="relative w-56 h-56 shrink-0 flex items-center justify-center">
              {/* Top Pointer */}
              <div className="absolute -top-3 z-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-white drop-shadow-md" />
              <div
                onClick={spinWheel}
                style={{
                  background: buildWheelGradient(),
                  transform: `rotate(${rotationDeg}deg)`,
                  transition: isSpinning
                    ? "transform 2.4s cubic-bezier(0.15, 0.85, 0.25, 1)"
                    : "none",
                }}
                className="w-52 h-52 rounded-full border-4 border-slate-800 shadow-2xl cursor-pointer flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-white flex items-center justify-center text-xs font-extrabold text-white shadow-inner">
                  SPIN
                </div>
              </div>
            </div>

            <div className="flex-1 w-full space-y-3">
              <button
                type="button"
                onClick={spinWheel}
                disabled={isSpinning}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                <RotateCw className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
                <span>{isSpinning ? "Spinning Wheel..." : "SPIN THE WHEEL NOW"}</span>
              </button>

              {winner && (
                <div className="rounded-xl bg-cyan-500/15 border border-cyan-400 p-3.5 text-center animate-pulse">
                  <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">
                    🎉 Selected Winner
                  </span>
                  <p className="text-lg font-extrabold text-white mt-0.5">{winner}</p>
                </div>
              )}

              {/* Add / Edit Wheel Slices */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                  placeholder="Add custom wheel option..."
                  className="flex-1 rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={addItem}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                {wheelItems.map((item, idx) => (
                  <span
                    key={`${item}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => setWheelItems(wheelItems.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: 5-Letter Wordle & Scrabble Pattern Solver */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                5-Letter Wordle & Crossword Pattern Finder
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                {matchingWords.length} Matches
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Starts With
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={startsWith}
                  onChange={(e) => setStartsWith(e.target.value.toUpperCase())}
                  placeholder="e.g. ST"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white font-bold uppercase focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Ends With
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={endsWith}
                  onChange={(e) => setEndsWith(e.target.value.toUpperCase())}
                  placeholder="e.g. E"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white font-bold uppercase focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Contains Letters
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={contains}
                  onChange={(e) => setContains(e.target.value.toUpperCase())}
                  placeholder="e.g. AR"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white font-bold uppercase focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Exclude (Gray)
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={excluded}
                  onChange={(e) => setExcluded(e.target.value.toUpperCase())}
                  placeholder="e.g. ZQX"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-rose-300 font-bold uppercase focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Matching Word Grid */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 max-h-60 overflow-y-auto">
              {matchingWords.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {matchingWords.slice(0, 72).map((word) => (
                    <div
                      key={word}
                      className="rounded-lg bg-slate-900 border border-slate-800 py-1.5 px-2 text-center font-mono font-bold text-sm text-cyan-300 tracking-widest"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-8">
                  No 5-letter words match all current filters. Try clearing excluded letters!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Monetization Banner */}
      <MonetizationBanner
        vertical={vertical}
        contextualRecommendation={
          winner
            ? `Wheel Picked "${winner}"! Claim $15 Off Express Delivery or Party Game Packs`
            : undefined
        }
      />

      {/* Programmatic SEO Links */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Programmatic SEO Word Pattern & Spin Wheel Pages
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Each pattern and wheel preset below resolves to its own indexable URL:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {WORD_PATTERN_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/games/${preset.slug}`}
              className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                activeSlug === preset.slug
                  ? "bg-cyan-600/20 border-cyan-400 text-white"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white"
              }`}
            >
              <span className="font-semibold">{preset.label}</span>
              <span className="text-[10px] text-cyan-400 mt-1">{preset.searchVolume}</span>
            </Link>
          ))}
          {WHEEL_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/games/${preset.slug}`}
              className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                activeSlug === preset.slug
                  ? "bg-cyan-600/20 border-cyan-400 text-white"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white"
              }`}
            >
              <span className="font-semibold">{preset.title}</span>
              <span className="text-[10px] text-emerald-400 mt-1">{preset.searchVolume}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
