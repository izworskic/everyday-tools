import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  AIR_FRYER_ITEMS,
  AP_EXAMS,
  BMI_PRESETS,
  VERTICALS,
  WHEEL_PRESETS,
  WORD_COUNT_PRESETS,
  WORK_SHIFT_PRESETS,
} from "@/data/pseoData";
import { buildPageMetadata, CreatorAuthority } from "@/lib/seo-schema";
import {
  Activity,
  ArrowRight,
  Clock,
  Dices,
  DollarSign,
  GraduationCap,
  Layers,
  Sparkles,
  TrendingUp,
  Type,
  Utensils,
} from "lucide-react";

export const metadata: Metadata = buildPageMetadata(
  "",
  "Everyday Calculators & Reference Tools | Chris Izworski",
  "Fast calculators for TDEE & BMI, air fryer times, grams to cups, work shift hours, AP & final exam grades, Unicode fonts, and 5-letter word solvers."
);

const ICON_MAP: Record<string, React.ReactNode> = {
  fitness: <Activity className="w-6 h-6 text-white" />,
  kitchen: <Utensils className="w-6 h-6 text-white" />,
  time: <Clock className="w-6 h-6 text-white" />,
  grades: <GraduationCap className="w-6 h-6 text-white" />,
  text: <Type className="w-6 h-6 text-white" />,
  games: <Dices className="w-6 h-6 text-white" />,
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-8 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>All 6 Everyday Calculator & Reference Suites</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Everyday Utility Engines &{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Instant Reference Calculators
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fast, zero-bloat calculators for daily decisions: TDEE & strength standards, air fryer cooking times & ingredient conversions, work timesheets & 90-minute sleep cycles, final exam & AP score curves, copy-paste Unicode fonts, and 5-letter word solvers.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/seo-matrix"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition shadow-lg shadow-emerald-500/20"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Browse All 95+ Calculator Pages</span>
            </Link>
            <Link
              href="/kitchen"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition"
            >
              <span>Open Kitchen & Air Fryer Converter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Tool Categories
            </span>
            <p className="text-2xl font-extrabold text-white mt-0.5">6 Suites</p>
            <span className="text-[11px] text-emerald-400">Fitness, Kitchen, Time, Grades, Text, Word</span>
          </div>
          <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Pre-Built Pages
            </span>
            <p className="text-2xl font-extrabold text-indigo-400 mt-0.5">96 Routes</p>
            <span className="text-[11px] text-slate-400">Pre-filled instant answers</span>
          </div>
          <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Response Speed
            </span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">Instant</p>
            <span className="text-[11px] text-slate-400">100% Client-Side Compute</span>
          </div>
          <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3.5">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Mobile Ready
            </span>
            <p className="text-2xl font-extrabold text-white mt-0.5">Zero Signup</p>
            <span className="text-[11px] text-slate-400">Works offline & on phone</span>
          </div>
        </div>
      </section>

      {/* The 6 Vertical Hubs Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              All 6 Everyday Calculator Suites
            </h2>
            <p className="text-xs text-slate-400">
              Select any category below to launch its interactive calculator and browse specific preset pages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERTICALS.map((v) => (
            <Link
              key={v.id}
              href={v.href}
              className="group rounded-2xl border border-slate-800 hover:border-indigo-500/60 bg-slate-900/70 hover:bg-slate-900 p-6 flex flex-col justify-between transition shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center shadow-lg`}
                  >
                    {ICON_MAP[v.id]}
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${v.badgeColor}`}
                    >
                      {v.shortName}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-400 transition">
                    {v.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{v.tagline}</p>
                </div>

                <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-300 font-semibold flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Featured Utility
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 truncate">
                    {v.affiliateOffer.title}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                <span>Launch Interactive Tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Programmatic SEO Deep-Link Showcase */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Popular Pre-Filled Calculator Pages
            </h2>
            <p className="text-xs text-slate-400">
              Jump directly into a pre-configured calculation:
            </p>
          </div>
          <Link
            href="/seo-matrix"
            className="text-xs font-bold text-emerald-400 hover:underline shrink-0"
          >
            View All 96 Pages →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Column 1: Fitness + Kitchen */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
            <p className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
              1. Body Stats & 2. Kitchen Calculators
            </p>
            <div className="space-y-1.5">
              {BMI_PRESETS.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  href={`/fitness/${p.slug}`}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-900 text-slate-300 hover:text-white"
                >
                  <span>{p.feet}&apos;{p.inches}&quot; {p.weightLbs} lbs BMI & TDEE</span>
                  <span className="text-[10px] text-emerald-400">Open →</span>
                </Link>
              ))}
              {AIR_FRYER_ITEMS.slice(0, 3).map((a) => (
                <Link
                  key={a.slug}
                  href={`/kitchen/${a.slug}`}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-900 text-slate-300 hover:text-white"
                >
                  <span>Air Fryer {a.name}</span>
                  <span className="text-[10px] text-amber-400">{a.tempF}°F</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Time + Grades */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
            <p className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
              3. Shift Hours & 4. AP Score Calculators
            </p>
            <div className="space-y-1.5">
              {WORK_SHIFT_PRESETS.slice(0, 3).map((s) => (
                <Link
                  key={s.slug}
                  href={`/time/${s.slug}`}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-900 text-slate-300 hover:text-white"
                >
                  <span>Hours: {s.label}</span>
                  <span className="text-[10px] text-indigo-400">Open →</span>
                </Link>
              ))}
              {AP_EXAMS.slice(0, 3).map((e) => (
                <Link
                  key={e.slug}
                  href={`/grades/${e.slug}`}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-900 text-slate-300 hover:text-white"
                >
                  <span>{e.name} Score Calculator</span>
                  <span className="text-[10px] text-purple-400">1–5 Curve</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Text + Games */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
            <p className="font-bold text-pink-400 uppercase tracking-wider text-[11px]">
              5. Word Time & 6. Spin Wheels
            </p>
            <div className="space-y-1.5">
              {WORD_COUNT_PRESETS.slice(0, 3).map((w) => (
                <Link
                  key={w.slug}
                  href={`/text/${w.slug}`}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-900 text-slate-300 hover:text-white"
                >
                  <span>{w.words} Words Speaking Time</span>
                  <span className="text-[10px] text-pink-400">Open →</span>
                </Link>
              ))}
              {WHEEL_PRESETS.slice(0, 3).map((wh) => (
                <Link
                  key={wh.slug}
                  href={`/games/${wh.slug}`}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-slate-900 text-slate-300 hover:text-white"
                >
                  <span>{wh.title}</span>
                  <span className="text-[10px] text-cyan-400">Spin →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CreatorAuthority
        relPath=""
        pageName="Everyday Calculators & Reference Tools | Chris Izworski"
      />
    </div>
  );
}
