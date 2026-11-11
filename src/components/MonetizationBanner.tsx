"use client";

import React from "react";
import { VerticalMeta } from "@/data/pseoData";
import { DollarSign, ExternalLink, Sparkles, TrendingUp } from "lucide-react";

interface Props {
  vertical: VerticalMeta;
  contextualRecommendation?: string;
}

export default function MonetizationBanner({ vertical, contextualRecommendation }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
      {/* Contextual Affiliate Conversion Card */}
      <div className="lg:col-span-2 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3 h-3" /> {vertical.affiliateOffer.badge}
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              Est. Payout: {vertical.affiliateOffer.payout}
            </span>
          </div>
          <h3 className="text-base font-bold text-white">
            {contextualRecommendation || vertical.affiliateOffer.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {vertical.affiliateOffer.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert(`Affiliate Redirect Simulation: ${vertical.affiliateOffer.title} (${vertical.affiliateOffer.payout})`)}
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer"
        >
          <span>{vertical.affiliateOffer.cta}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* High-Viewability Display Ad / RPM Unit Slot */}
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="uppercase tracking-wider font-semibold text-slate-500">
            Mediavine / Raptive Sticky Slot
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {vertical.estimatedRpm}
          </span>
        </div>
        <div className="my-2 py-3 px-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
          <p className="text-xs font-medium text-slate-300">
            High-Viewability Above-the-Fold Ad Unit (300×250 / 728×90)
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Auto-refreshes every 30s on active calculator interaction
          </p>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-indigo-400" />
            Vertical Traffic Ceiling:
          </span>
          <span className="font-bold text-white">{vertical.monthlySearchPotential}</span>
        </div>
      </div>
    </div>
  );
}
