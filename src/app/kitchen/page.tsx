import React from "react";
import type { Metadata } from "next";
import KitchenCalculator from "@/components/tools/KitchenCalculator";

export const metadata: Metadata = {
  title: "Air Fryer Time & Temp Chart + Grams to Cups Converter | MegaTools Kitchen",
  description:
    "Instant Air Fryer cooking time and temperature lookup for chicken wings, salmon, bacon, and steak, plus exact ingredient weight-to-cups conversion.",
};

export default function KitchenHubPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
          Vertical 2 • 5.2M+ Monthly Search Potential • $32–$48 RPM (Highest Ad Rates)
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Air Fryer Time & Temp Lookup + Grams-to-Cups Ingredient Converter
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Never guess cooking times or baking ratios again. Look up exact air fryer temperatures, convert oven recipes in one click, or convert grams to US cups by specific ingredient density.
        </p>
      </div>

      <KitchenCalculator />
    </div>
  );
}
