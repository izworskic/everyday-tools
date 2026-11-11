"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COPY_SYMBOLS, VERTICALS, WORD_COUNT_PRESETS } from "@/data/pseoData";
import MonetizationBanner from "@/components/MonetizationBanner";
import { Check, Copy, Mic, Sparkles, Type } from "lucide-react";

interface Props {
  initialWordCount?: number;
  activeSlug?: string;
}

const UNICODE_STYLES: { name: string; badge: string; transform: (s: string) => string }[] = [
  {
    name: "Bold Sans (Social Bio)",
    badge: "Most Popular",
    transform: (str) =>
      str.replace(/[A-Za-z0-9]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5d4 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ee + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ec + (code - 48));
        return c;
      }),
  },
  {
    name: "Script / Cursive",
    badge: "Instagram & TikTok",
    transform: (str) =>
      str.replace(/[A-Za-z]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d4d0 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d4ea + (code - 97));
        return c;
      }),
  },
  {
    name: "Gothic / Fraktur",
    badge: "Gaming & Discord",
    transform: (str) =>
      str.replace(/[A-Za-z]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d56c + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d586 + (code - 97));
        return c;
      }),
  },
  {
    name: "Double-Struck / Hollow",
    badge: "Aesthetic",
    transform: (str) =>
      str.replace(/[A-Za-z0-9]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d538 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d552 + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7d8 + (code - 48));
        return c;
      }),
  },
  {
    name: "Small Caps",
    badge: "Clean Headers",
    transform: (str) => {
      const map: Record<string, string> = {
        a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ",
        j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ",
        s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
      };
      return str
        .split("")
        .map((c) => map[c.toLowerCase()] || c)
        .join("");
    },
  },
  {
    name: "Circled Bubble Text",
    badge: "Cute Bio",
    transform: (str) =>
      str.replace(/[A-Za-z]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
        return c;
      }),
  },
  {
    name: "Fullwidth Vaporwave",
    badge: "ＡＥＳＴＨＥＴＩＣ",
    transform: (str) =>
      str.replace(/[!-~]/g, (c) => String.fromCodePoint(c.charCodeAt(0) + 0xfee0)),
  },
  {
    name: "Sparkle Framed",
    badge: "One-Click Bio",
    transform: (str) => `✧･ﾟ: *✧･ﾟ:* ${str} *:･ﾟ✧*:･ﾟ✧`,
  },
];

export default function TextTools({ initialWordCount = 1000, activeSlug }: Props) {
  const vertical = VERTICALS.find((v) => v.id === "text")!;

  const [inputText, setInputText] = useState<string>("Create Your Aesthetic Bio & Gaming Tag");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Speaking & Reading Time Calculator State
  const [wordCountTarget, setWordCountTarget] = useState<number>(initialWordCount);
  const [wpmSpeed, setWpmSpeed] = useState<number>(130); // Average speech pace: 130 WPM
  const [scriptSample, setScriptSample] = useState<string>("");

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const liveWordCount = scriptSample.trim()
    ? scriptSample.trim().split(/\s+/).length
    : wordCountTarget;

  const speechTotalSeconds = Math.round((liveWordCount / wpmSpeed) * 60);
  const speechMins = Math.floor(speechTotalSeconds / 60);
  const speechSecs = speechTotalSeconds % 60;

  const silentReadSeconds = Math.round((liveWordCount / 238) * 60);
  const silentMins = Math.floor(silentReadSeconds / 60);
  const silentSecs = silentReadSeconds % 60;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Copy-Paste Unicode Font Generator */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Type className="w-5 h-5 text-pink-400" />
              Copy-Paste Unicode Font & Bio Generator
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold">
              Works on TikTok, IG, Discord & X
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Type or Paste Text to Transform Instantly
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your name, bio, or headline..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-white font-semibold text-base focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {UNICODE_STYLES.map((style) => {
              const transformed = style.transform(inputText || "MegaTools Hub");
              const isCopied = copiedKey === style.name;
              return (
                <div
                  key={style.name}
                  className="rounded-xl bg-slate-950 border border-slate-800/90 hover:border-pink-500/40 p-3 flex items-center justify-between gap-3 transition"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {style.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-pink-300 border border-slate-800">
                        {style.badge}
                      </span>
                    </div>
                    <p className="text-base text-white mt-1 truncate">{transformed}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(transformed, style.name)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      isCopied
                        ? "bg-emerald-600 text-white"
                        : "bg-pink-600/20 text-pink-300 border border-pink-500/30 hover:bg-pink-600 hover:text-white"
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Speaking Time Calculator + Invisible Character Copy */}
        <div className="lg:col-span-5 space-y-6">
          {/* Speech & Word Time Calculator */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-pink-400" />
                Words to Speaking Time Calculator
              </h2>
              <span className="text-xs text-pink-300 font-semibold">{liveWordCount} Words</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Target Word Count
                </label>
                <input
                  type="number"
                  min={10}
                  max={50000}
                  step={50}
                  value={wordCountTarget}
                  onChange={(e) => {
                    setScriptSample("");
                    setWordCountTarget(Math.max(1, Number(e.target.value) || 500));
                  }}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white font-bold focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Speaking Pace (WPM)
                </label>
                <select
                  value={wpmSpeed}
                  onChange={(e) => setWpmSpeed(Number(e.target.value))}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-white font-semibold"
                >
                  <option value={110}>Slow / Keynote (110 WPM)</option>
                  <option value={130}>Conversational / Presentation (130 WPM)</option>
                  <option value={150}>Podcast / YouTube Script (150 WPM)</option>
                  <option value={175}>Fast / TikTok Short (175 WPM)</option>
                </select>
              </div>
            </div>

            <textarea
              rows={2}
              value={scriptSample}
              onChange={(e) => setScriptSample(e.target.value)}
              placeholder="Or paste your speech/script here to count exact words automatically..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-200 focus:border-pink-500 focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-950 border border-pink-500/40 p-3.5 text-center">
                <span className="text-[11px] uppercase tracking-wider text-pink-300 font-semibold">
                  Out-Loud Speech Time
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">
                  {speechMins}m {speechSecs}s
                </p>
                <span className="text-[11px] text-slate-400">at {wpmSpeed} WPM</span>
              </div>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-center">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Silent Reading Time
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">
                  {silentMins}m {silentSecs}s
                </p>
                <span className="text-[11px] text-slate-400">at 238 WPM avg</span>
              </div>
            </div>
          </div>

          {/* Invisible Characters & Aesthetic Symbols Board */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">
              One-Click Invisible Character & Symbol Copy Board
            </h3>
            <div className="space-y-3">
              {COPY_SYMBOLS.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => {
                      const key = `${group.category}-${item.code}`;
                      const isCopied = copiedKey === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => copyToClipboard(item.char, key)}
                          title={item.name}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                            isCopied
                              ? "bg-emerald-600 text-white border-emerald-400"
                              : "bg-slate-950 text-white border-slate-800 hover:border-pink-500/50"
                          }`}
                        >
                          <span>
                            {item.code === "U+2800" || item.code === "U+3164" || item.code === "U+200B"
                              ? `[Invisible ${item.code}]`
                              : item.char}
                          </span>
                          {isCopied && <span className="text-[10px]">Copied!</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monetization Banner */}
      <MonetizationBanner
        vertical={vertical}
        contextualRecommendation={`Have a ${liveWordCount}-Word Script (${speechMins}m ${speechSecs}s)? Generate Studio-Grade AI Voiceovers in 1 Click`}
      />

      {/* Programmatic SEO Links */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Programmatic SEO Speaking-Time & Word Count Pages
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            High-volume queries from students, podcasters, YouTubers, and wedding/keynote speakers:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {WORD_COUNT_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/text/${preset.slug}`}
              className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                activeSlug === preset.slug
                  ? "bg-pink-600/20 border-pink-400 text-white"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-pink-500/50 hover:text-white"
              }`}
            >
              <span className="font-semibold">
                {preset.words.toLocaleString()} Words Speaking Time
              </span>
              <span className="text-[10px] text-pink-400 mt-1">{preset.searchVolume}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
