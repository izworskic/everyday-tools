"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AIR_FRYER_ITEMS,
  INGREDIENTS,
  INGREDIENT_CONVERSION_PRESETS,
  VERTICALS,
} from "@/data/pseoData";
import MonetizationBanner from "@/components/MonetizationBanner";
import { Flame, Scale, Sparkles, Timer, Utensils } from "lucide-react";

interface Props {
  initialAirFryerSlug?: string;
  initialGrams?: number;
  initialIngredientId?: string;
  activeSlug?: string;
}

export default function KitchenCalculator({
  initialAirFryerSlug = "chicken-wings",
  initialGrams = 150,
  initialIngredientId = "all-purpose-flour",
  activeSlug,
}: Props) {
  const vertical = VERTICALS.find((v) => v.id === "kitchen")!;

  // 1. Air Fryer Lookup State
  const [selectedFoodSlug, setSelectedFoodSlug] = useState<string>(initialAirFryerSlug);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const selectedFood =
    AIR_FRYER_ITEMS.find((i) => i.slug === selectedFoodSlug) || AIR_FRYER_ITEMS[0];

  // 2. Oven to Air Fryer Converter State
  const [ovenTempF, setOvenTempF] = useState<number>(400);
  const [ovenMinutes, setOvenMinutes] = useState<number>(30);
  const airFryerTempF = Math.max(250, ovenTempF - 25);
  const airFryerMinutes = Math.max(4, Math.round(ovenMinutes * 0.8));

  // 3. Grams to Cups Ingredient Converter State
  const [grams, setGrams] = useState<number>(initialGrams);
  const [ingredientId, setIngredientId] = useState<string>(initialIngredientId);
  const selectedIngredient =
    INGREDIENTS.find((i) => i.id === ingredientId) || INGREDIENTS[0];

  const cups = grams / selectedIngredient.gramsPerCup;
  const tablespoons = grams / selectedIngredient.gramsPerTbsp;
  const teaspoons = grams / selectedIngredient.gramsPerTsp;
  const ounces = grams * 0.035274;

  const filteredFoods =
    categoryFilter === "All"
      ? AIR_FRYER_ITEMS
      : AIR_FRYER_ITEMS.filter((item) => item.category === categoryFilter);

  return (
    <div className="space-y-8">
      {/* Top Grid: Air Fryer Time/Temp + Ingredient Converter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Air Fryer Master Lookup */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              Air Fryer Time & Temp Lookup
            </h2>
            <div className="flex gap-1 flex-wrap">
              {["All", "Poultry", "Meat", "Seafood", "Vegetables", "Frozen"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-950 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Select Food Item ({filteredFoods.length} items)
            </label>
            <select
              value={selectedFood.slug}
              onChange={(e) => setSelectedFoodSlug(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-3 text-white font-semibold focus:border-amber-500 focus:outline-none"
            >
              {filteredFoods.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name} ({item.tempF}°F • {item.timeMin}–{item.timeMax} mins)
                </option>
              ))}
            </select>
          </div>

          {/* Output Display */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-950 border border-amber-500/30 p-4 text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                Temperature
              </span>
              <p className="text-2xl font-extrabold text-white mt-1">{selectedFood.tempF}°F</p>
              <span className="text-xs text-slate-400">{selectedFood.tempC}°C</span>
            </div>

            <div className="rounded-xl bg-slate-950 border border-amber-500/30 p-4 text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                Cook Time
              </span>
              <p className="text-2xl font-extrabold text-white mt-1">
                {selectedFood.timeMin}–{selectedFood.timeMax}
              </p>
              <span className="text-xs text-slate-400">Minutes</span>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Safe Temp / Flip
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">
                {selectedFood.safeInternalTempF ? `${selectedFood.safeInternalTempF}°F` : "Golden"}
              </p>
              <span className="text-xs text-slate-400">
                {selectedFood.shakeHalfway ? "Shake/Flip Halfway" : "No Flip Needed"}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
              Chef&apos;s Crispness Secret for {selectedFood.name}:
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">{selectedFood.proTip}</p>
          </div>

          {/* Mini Oven-to-Air-Fryer Converter */}
          <div className="pt-3 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              Instant Oven-to-Air-Fryer Recipe Converter
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Oven Temp (°F)</label>
                <input
                  type="number"
                  step={5}
                  value={ovenTempF}
                  onChange={(e) => setOvenTempF(Number(e.target.value) || 400)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Oven Time (Min)</label>
                <input
                  type="number"
                  value={ovenMinutes}
                  onChange={(e) => setOvenMinutes(Number(e.target.value) || 25)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white font-semibold"
                />
              </div>
              <div className="col-span-2 rounded-xl bg-slate-950 border border-amber-500/40 p-2.5 text-center">
                <span className="text-[11px] text-slate-400 block">Air Fryer Setting (-25°F & -20% Time)</span>
                <span className="text-base font-extrabold text-amber-400">
                  {airFryerTempF}°F for {airFryerMinutes} mins
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Grams to Cups Ingredient Density Calculator */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                Grams to Cups Converter (By Ingredient Density)
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                1 Cup = {selectedIngredient.gramsPerCup}g
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Weight in Grams (g)
                </label>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, Number(e.target.value) || 100))}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold text-lg focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Select Baking / Cooking Ingredient
                </label>
                <select
                  value={selectedIngredient.id}
                  onChange={(e) => setIngredientId(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-3 text-sm text-white font-semibold focus:border-amber-500 focus:outline-none"
                >
                  {INGREDIENTS.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.gramsPerCup}g/cup)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Gram Presets */}
            <div className="flex flex-wrap gap-1.5">
              {[50, 100, 125, 150, 200, 227, 250, 300, 500].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setGrams(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    grams === val
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-500/40"
                  }`}
                >
                  {val}g
                </button>
              ))}
            </div>

            {/* Conversion Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="rounded-xl bg-slate-950 border border-amber-500/40 p-4 text-center">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                  US Cups
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">{cups.toFixed(2)}</p>
                <span className="text-[11px] text-slate-400">cups</span>
              </div>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Tablespoons
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">
                  {tablespoons.toFixed(1)}
                </p>
                <span className="text-[11px] text-slate-400">tbsp</span>
              </div>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Teaspoons
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">{teaspoons.toFixed(1)}</p>
                <span className="text-[11px] text-slate-400">tsp</span>
              </div>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Ounces (Weight)
                </span>
                <p className="text-2xl font-extrabold text-white mt-1">{ounces.toFixed(2)}</p>
                <span className="text-[11px] text-slate-400">oz</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-4 flex items-start gap-3">
            <Utensils className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white">
                Why {grams}g of {selectedIngredient.name} = {cups.toFixed(2)} Cups:
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{selectedIngredient.notes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monetization Banner */}
      <MonetizationBanner
        vertical={vertical}
        contextualRecommendation={`Cooking ${selectedFood.name} at ${selectedFood.tempF}°F? Upgrade to a Dual-Zone Air Fryer + Instant-Read Meat Thermometer`}
      />

      {/* Programmatic SEO Links: Air Fryer + Grams-to-Cups Matrix */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-5">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Programmatic SEO Kitchen Pages (Air Fryer Times & Ingredient Conversions)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any long-tail search below to load its dedicated pre-rendered landing page:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {AIR_FRYER_ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={`/kitchen/${item.slug}`}
              className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                activeSlug === item.slug
                  ? "bg-amber-500/20 border-amber-400 text-white"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-white"
              }`}
            >
              <span className="font-semibold">Air Fryer {item.name}</span>
              <span className="text-[10px] text-amber-400 mt-1">
                {item.tempF}°F • {item.searchVolume}
              </span>
            </Link>
          ))}
          {INGREDIENT_CONVERSION_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/kitchen/${preset.slug}`}
              className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                activeSlug === preset.slug
                  ? "bg-amber-500/20 border-amber-400 text-white"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-white"
              }`}
            >
              <span className="font-semibold">{preset.slug.replace(/-/g, " ")}</span>
              <span className="text-[10px] text-emerald-400 mt-1">{preset.searchVolume}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
