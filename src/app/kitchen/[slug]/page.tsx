import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  AIR_FRYER_ITEMS,
  INGREDIENTS,
  INGREDIENT_CONVERSION_PRESETS,
} from "@/data/pseoData";
import KitchenCalculator from "@/components/tools/KitchenCalculator";

export function generateStaticParams() {
  return [
    ...AIR_FRYER_ITEMS.map((i) => ({ slug: i.slug })),
    ...INGREDIENT_CONVERSION_PRESETS.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const airItem = AIR_FRYER_ITEMS.find((i) => i.slug === slug);
  if (airItem) {
    return {
      title: `How Long to Air Fry ${airItem.name} at ${airItem.tempF}°F (${airItem.timeMin}–${airItem.timeMax} Mins)`,
      description: `Exact air fryer time and temperature for ${airItem.name}: cook at ${airItem.tempF}°F (${airItem.tempC}°C) for ${airItem.timeMin} to ${airItem.timeMax} minutes. ${airItem.proTip}`,
    };
  }

  const conv = INGREDIENT_CONVERSION_PRESETS.find((p) => p.slug === slug);
  if (conv) {
    const ing = INGREDIENTS.find((i) => i.id === conv.ingredientId) || INGREDIENTS[0];
    const cups = (conv.grams / ing.gramsPerCup).toFixed(2);
    return {
      title: `${conv.grams} Grams of ${ing.name} to Cups (${cups} US Cups & Tbsp)`,
      description: `How many cups is ${conv.grams}g of ${ing.name}? ${conv.grams} grams equals ${cups} US cups or ${(conv.grams / ing.gramsPerTbsp).toFixed(1)} tablespoons.`,
    };
  }

  return {
    title: "Kitchen & Air Fryer Conversion Tool | MegaTools",
  };
}

export default async function KitchenSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const airItem = AIR_FRYER_ITEMS.find((i) => i.slug === slug);
  const conv = INGREDIENT_CONVERSION_PRESETS.find((p) => p.slug === slug);
  const ing = conv
    ? INGREDIENTS.find((i) => i.id === conv.ingredientId) || INGREDIENTS[0]
    : INGREDIENTS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/kitchen" className="hover:text-white">Kitchen & Air Fryer</Link>
        <span>/</span>
        <span className="text-amber-400 font-semibold">{slug}</span>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
          Pre-Filled Programmatic SEO Page • Est. Search Vol:{" "}
          {airItem ? airItem.searchVolume : conv?.searchVolume || "50,000/mo"}
        </span>
        {airItem ? (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              How Long to Air Fry {airItem.name}: {airItem.tempF}°F for {airItem.timeMin}–{airItem.timeMax} Minutes
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              Set your air fryer to <strong>{airItem.tempF}°F ({airItem.tempC}°C)</strong> and cook for <strong>{airItem.timeMin} to {airItem.timeMax} minutes</strong>.{" "}
              {airItem.proTip}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {conv?.grams || 150} Grams of {ing.name} to Cups ={" "}
              {((conv?.grams || 150) / ing.gramsPerCup).toFixed(2)} US Cups
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl">
              Because 1 US cup of <strong>{ing.name}</strong> weighs exactly <strong>{ing.gramsPerCup} grams</strong>,{" "}
              {conv?.grams || 150}g converts to <strong>{((conv?.grams || 150) / ing.gramsPerCup).toFixed(2)} cups</strong> or{" "}
              <strong>{((conv?.grams || 150) / ing.gramsPerTbsp).toFixed(1)} tablespoons</strong>.
            </p>
          </>
        )}
      </div>

      <KitchenCalculator
        initialAirFryerSlug={airItem ? airItem.slug : "chicken-wings"}
        initialGrams={conv ? conv.grams : 150}
        initialIngredientId={conv ? conv.ingredientId : "all-purpose-flour"}
        activeSlug={slug}
      />
    </div>
  );
}
