"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AIR_FRYER_ITEMS,
  AP_EXAMS,
  BMI_PRESETS,
  FINAL_GRADE_PRESETS,
  INGREDIENT_CONVERSION_PRESETS,
  VERTICALS,
  WHEEL_PRESETS,
  WORD_COUNT_PRESETS,
  WORD_PATTERN_PRESETS,
  WORK_SHIFT_PRESETS,
} from "@/data/pseoData";
import { DollarSign, ExternalLink, Globe, Layers, Sparkles, TrendingUp } from "lucide-react";

export default function SeoMatrixClient() {
  const [monthlySessions, setMonthlySessions] = useState<number>(500000);
  const [pagesPerSession, setPagesPerSession] = useState<number>(2.4);
  const [adRpm, setAdRpm] = useState<number>(28);
  const [affiliateCtrPct, setAffiliateCtrPct] = useState<number>(3.5);
  const [affiliateConvPct, setAffiliateConvPct] = useState<number>(4.0);
  const [avgCommission, setAvgCommission] = useState<number>(22);

  const totalPageviews = Math.round(monthlySessions * pagesPerSession);
  const monthlyAdRevenue = Math.round((totalPageviews / 1000) * adRpm);
  const affiliateClicks = Math.round(monthlySessions * (affiliateCtrPct / 100));
  const affiliateSales = Math.round(affiliateClicks * (affiliateConvPct / 100));
  const monthlyAffiliateRevenue = affiliateSales * avgCommission;
  const totalMonthlyRevenue = monthlyAdRevenue + monthlyAffiliateRevenue;
  const totalAnnualRevenue = totalMonthlyRevenue * 12;

  const allRoutes = [
    ...BMI_PRESETS.map((p) => ({
      vertical: "Body & TDEE",
      url: `/fitness/${p.slug}`,
      keyword: `${p.feet}'${p.inches}" ${p.weightLbs} lbs BMI & TDEE`,
      volume: p.searchVolume,
      rpm: "$28 RPM",
    })),
    ...AIR_FRYER_ITEMS.map((a) => ({
      vertical: "Kitchen",
      url: `/kitchen/${a.slug}`,
      keyword: `How long to air fry ${a.name.toLowerCase()}`,
      volume: a.searchVolume,
      rpm: "$42 RPM",
    })),
    ...INGREDIENT_CONVERSION_PRESETS.map((c) => ({
      vertical: "Kitchen",
      url: `/kitchen/${c.slug}`,
      keyword: c.slug.replace(/-/g, " "),
      volume: c.searchVolume,
      rpm: "$38 RPM",
    })),
    ...WORK_SHIFT_PRESETS.map((s) => ({
      vertical: "Hours & Sleep",
      url: `/time/${s.slug}`,
      keyword: `How many hours is ${s.label}`,
      volume: s.searchVolume,
      rpm: "$24 RPM",
    })),
    ...AP_EXAMS.map((e) => ({
      vertical: "Grades & AP",
      url: `/grades/${e.slug}`,
      keyword: `${e.name} score calculator`,
      volume: e.searchVolume,
      rpm: "$26 RPM",
    })),
    ...FINAL_GRADE_PRESETS.map((f) => ({
      vertical: "Grades & AP",
      url: `/grades/${f.slug}`,
      keyword: `${f.currentGrade}% grade with ${f.finalWeight}% final`,
      volume: f.searchVolume,
      rpm: "$24 RPM",
    })),
    ...WORD_COUNT_PRESETS.map((w) => ({
      vertical: "Text & Fonts",
      url: `/text/${w.slug}`,
      keyword: `How long to speak ${w.words} words`,
      volume: w.searchVolume,
      rpm: "$19 RPM",
    })),
    ...WORD_PATTERN_PRESETS.map((wp) => ({
      vertical: "Games & Words",
      url: `/games/${wp.slug}`,
      keyword: wp.label,
      volume: wp.searchVolume,
      rpm: "$22 RPM",
    })),
    ...WHEEL_PRESETS.map((wh) => ({
      vertical: "Games & Words",
      url: `/games/${wh.slug}`,
      keyword: wh.title,
      volume: wh.searchVolume,
      rpm: "$24 RPM",
    })),
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <TrendingUp className="w-3.5 h-3.5" /> Everyday Calculator Directory & Traffic Model
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          All Calculator Routes & Traffic Scenario Planner ({allRoutes.length} Pre-Built Pages)
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Browse every pre-rendered calculator page across all 6 categories or model display and affiliate scenarios below.
        </p>
      </div>

      {/* Interactive Revenue Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            Traffic & Monetization Scenario Controls
          </h2>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">Monthly Organic Sessions</span>
              <span className="text-emerald-400 font-bold">
                {monthlySessions.toLocaleString()} sessions / mo
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={50000}
              value={monthlySessions}
              onChange={(e) => setMonthlySessions(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Pages / Session</label>
              <input
                type="number"
                step={0.2}
                value={pagesPerSession}
                onChange={(e) => setPagesPerSession(Number(e.target.value) || 2)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Blended Ad RPM ($)</label>
              <input
                type="number"
                value={adRpm}
                onChange={(e) => setAdRpm(Number(e.target.value) || 25)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Avg Affiliate Payout ($)</label>
              <input
                type="number"
                value={avgCommission}
                onChange={(e) => setAvgCommission(Number(e.target.value) || 20)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Affiliate Slot CTR (%)</label>
              <input
                type="number"
                step={0.5}
                value={affiliateCtrPct}
                onChange={(e) => setAffiliateCtrPct(Number(e.target.value) || 3)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Affiliate Conversion (%)</label>
              <input
                type="number"
                step={0.5}
                value={affiliateConvPct}
                onChange={(e) => setAffiliateConvPct(Number(e.target.value) || 4)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white font-bold"
              />
            </div>
          </div>
        </div>

        {/* Revenue Output Card */}
        <div className="lg:col-span-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 p-6 flex flex-col justify-between space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Scenario Ad Revenue
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                ${monthlyAdRevenue.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal"> / mo</span>
              </p>
              <span className="text-[11px] text-emerald-400">
                {totalPageviews.toLocaleString()} pageviews @ ${adRpm} RPM
              </span>
            </div>

            <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Scenario Affiliates
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mt-1">
                ${monthlyAffiliateRevenue.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal"> / mo</span>
              </p>
              <span className="text-[11px] text-slate-400">
                {affiliateSales.toLocaleString()} conversions @ ${avgCommission}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 border border-emerald-500/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                Modeled Monthly Total
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-white mt-0.5">
                ${totalMonthlyRevenue.toLocaleString()} <span className="text-sm text-slate-400 font-normal">/ month</span>
              </p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-slate-400 block">Modeled Annual Total</span>
              <span className="text-xl font-extrabold text-emerald-400">
                ${totalAnnualRevenue.toLocaleString()} / yr
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Breakdown Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          The 6 Everyday Tool Suites
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Vertical</th>
                <th className="py-3 px-3">Primary Calculators</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {VERTICALS.map((v) => (
                <tr key={v.id} className="hover:bg-slate-900/90">
                  <td className="py-3 px-3 font-bold text-white">{v.name}</td>
                  <td className="py-3 px-3 text-slate-300">{v.tagline}</td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={v.href}
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      <span>Open Hub</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Pre-Rendered pSEO Route Directory */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              Complete Pre-Rendered Calculator Index ({allRoutes.length} Pages)
            </h2>
            <p className="text-xs text-slate-400">
              Select any calculator page below:
            </p>
          </div>
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[520px] overflow-y-auto pr-1">
          {allRoutes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="rounded-xl bg-slate-950 border border-slate-800/90 hover:border-indigo-500/50 p-3 flex flex-col justify-between transition"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-bold uppercase text-indigo-400">{route.vertical}</span>
              </div>
              <p className="text-xs font-bold text-white mt-1 capitalize">{route.keyword}</p>
              <span className="text-[11px] font-mono text-slate-500 mt-1">{route.url}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
