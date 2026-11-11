"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BMI_PRESETS, LIFT_STANDARDS, VERTICALS } from "@/data/pseoData";
import MonetizationBanner from "@/components/MonetizationBanner";
import { Activity, Dumbbell, Flame, Scale, Sparkles, TrendingDown } from "lucide-react";

interface Props {
  initialFeet?: number;
  initialInches?: number;
  initialWeightLbs?: number;
  activeSlug?: string;
}

export default function FitnessCalculator({
  initialFeet = 5,
  initialInches = 9,
  initialWeightLbs = 175,
  activeSlug,
}: Props) {
  const vertical = VERTICALS.find((v) => v.id === "fitness")!;

  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(28);
  const [feet, setFeet] = useState<number>(initialFeet);
  const [inches, setInches] = useState<number>(initialInches);
  const [weightLbs, setWeightLbs] = useState<number>(initialWeightLbs);
  const [activity, setActivity] = useState<number>(1.55); // Moderate exercise
  const [goalWeightLbs, setGoalWeightLbs] = useState<number>(Math.max(110, initialWeightLbs - 15));
  const [dailyDeficit, setDailyDeficit] = useState<number>(500);

  // Strength standard state
  const [selectedLiftId, setSelectedLiftId] = useState<string>("bench-press");
  const [liftWeightLbs, setLiftWeightLbs] = useState<number>(185);
  const [liftReps, setLiftReps] = useState<number>(5);

  const totalInches = feet * 12 + inches;
  const heightCm = totalInches * 2.54;
  const weightKg = weightLbs * 0.453592;
  const heightMeters = heightCm / 100;

  // BMI
  const bmi = heightMeters > 0 ? weightKg / (heightMeters * heightMeters) : 0;
  let bmiCategory = "Normal Weight";
  let bmiColor = "text-emerald-400";
  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiColor = "text-sky-400";
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = "Overweight";
    bmiColor = "text-amber-400";
  } else if (bmi >= 30) {
    bmiCategory = "Class I+ Obesity";
    bmiColor = "text-rose-400";
  }

  // Ideal body weight (Devine formula range)
  const idealBaseKg =
    gender === "male"
      ? 50 + 2.3 * Math.max(0, totalInches - 60)
      : 45.5 + 2.3 * Math.max(0, totalInches - 60);
  const idealLbsMin = Math.round(idealBaseKg * 2.20462 * 0.9);
  const idealLbsMax = Math.round(idealBaseKg * 2.20462 * 1.1);

  // Mifflin-St Jeor BMR & TDEE
  const bmr =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const tdee = Math.round(bmr * activity);
  const cuttingCalories = Math.max(1200, tdee - dailyDeficit);
  const bulkingCalories = tdee + 350;

  // Macros (High-protein optimal)
  const proteinGrams = Math.round(weightLbs * 0.9);
  const fatGrams = Math.round((cuttingCalories * 0.25) / 9);
  const carbGrams = Math.max(
    40,
    Math.round((cuttingCalories - proteinGrams * 4 - fatGrams * 9) / 4)
  );

  // Goal timeline
  const lbsToLose = Math.max(0, weightLbs - goalWeightLbs);
  const daysToGoal = dailyDeficit > 0 ? Math.round((lbsToLose * 3500) / dailyDeficit) : 0;
  const weeksToGoal = (daysToGoal / 7).toFixed(1);

  // 1-Rep Max (Epley formula) & Strength Level
  const oneRepMax =
    liftReps === 1 ? liftWeightLbs : Math.round(liftWeightLbs * (1 + liftReps / 30));
  const selectedLift = LIFT_STANDARDS.find((l) => l.id === selectedLiftId) || LIFT_STANDARDS[0];
  const multipliers =
    gender === "male" ? selectedLift.maleMultipliers : selectedLift.femaleMultipliers;
  const standardsLbs = multipliers.map((m) => Math.round(weightLbs * m));
  const strengthRatio = weightLbs > 0 ? (oneRepMax / weightLbs).toFixed(2) : "0.00";

  let userTier = "Untrained";
  if (oneRepMax >= standardsLbs[4]) userTier = "Elite (Top 1%)";
  else if (oneRepMax >= standardsLbs[3]) userTier = "Advanced (Top 10%)";
  else if (oneRepMax >= standardsLbs[2]) userTier = "Intermediate (Top 35%)";
  else if (oneRepMax >= standardsLbs[1]) userTier = "Novice";
  else if (oneRepMax >= standardsLbs[0]) userTier = "Beginner";

  return (
    <div className="space-y-8">
      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              Body Stats & TDEE Inputs
            </h2>
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  gender === "male" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  gender === "female" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Height (Ft)</label>
              <input
                type="number"
                min={4}
                max={7}
                value={feet}
                onChange={(e) => setFeet(Number(e.target.value) || 5)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Inches</label>
              <input
                type="number"
                min={0}
                max={11}
                value={inches}
                onChange={(e) => setInches(Number(e.target.value) || 0)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Age (Yrs)</label>
              <input
                type="number"
                min={14}
                max={95}
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || 25)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400 font-medium">Current Body Weight</span>
              <span className="text-emerald-400 font-bold">
                {weightLbs} lbs ({weightKg.toFixed(1)} kg)
              </span>
            </div>
            <input
              type="range"
              min={90}
              max={350}
              value={weightLbs}
              onChange={(e) => setWeightLbs(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Activity Multiplier</label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value={1.2}>Sedentary (Desk job, little exercise)</option>
              <option value={1.375}>Lightly Active (1–2 workouts/week)</option>
              <option value={1.55}>Moderately Active (3–5 workouts/week)</option>
              <option value={1.725}>Very Active (6–7 hard workouts/week)</option>
              <option value={1.9}>Athlete / Physical Trade (2x daily training)</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Goal Weight (lbs)</label>
              <input
                type="number"
                min={85}
                max={350}
                value={goalWeightLbs}
                onChange={(e) => setGoalWeightLbs(Number(e.target.value) || 150)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white font-semibold focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Daily Calorie Deficit</label>
              <select
                value={dailyDeficit}
                onChange={(e) => setDailyDeficit(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value={250}>-250 kcal (0.5 lb/wk)</option>
                <option value={500}>-500 kcal (1.0 lb/wk)</option>
                <option value={750}>-750 kcal (1.5 lb/wk)</option>
                <option value={1000}>-1000 kcal (2.0 lb/wk)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Instant Results Dashboard */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Maintenance TDEE
              </span>
              <p className="text-2xl font-extrabold text-white mt-1">{tdee.toLocaleString()}</p>
              <span className="text-[11px] text-slate-400">kcal / day</span>
            </div>

            <div className="rounded-xl bg-slate-950/90 border border-emerald-500/30 p-4">
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                Fat Loss Target
              </span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                {cuttingCalories.toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-400">-{dailyDeficit} kcal deficit</span>
            </div>

            <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                BMI Score
              </span>
              <p className={`text-2xl font-extrabold mt-1 ${bmiColor}`}>{bmi.toFixed(1)}</p>
              <span className={`text-[11px] font-medium ${bmiColor}`}>{bmiCategory}</span>
            </div>

            <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Ideal Weight Range
              </span>
              <p className="text-xl font-extrabold text-white mt-1">
                {idealLbsMin}–{idealLbsMax}
              </p>
              <span className="text-[11px] text-slate-400">lbs for {feet}&apos;{inches}&quot;</span>
            </div>
          </div>

          {/* Daily Macro Breakdown */}
          <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Optimal High-Protein Macro Split ({cuttingCalories.toLocaleString()} kcal Cut)
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">
                Preserves Lean Muscle Mass
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                <p className="text-xs text-slate-400">Daily Protein</p>
                <p className="text-xl font-extrabold text-emerald-400">{proteinGrams}g</p>
                <p className="text-[11px] text-slate-500">{proteinGrams * 4} kcal</p>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                <p className="text-xs text-slate-400">Net Carbs</p>
                <p className="text-xl font-extrabold text-sky-400">{carbGrams}g</p>
                <p className="text-[11px] text-slate-500">{carbGrams * 4} kcal</p>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                <p className="text-xs text-slate-400">Dietary Fats</p>
                <p className="text-xl font-extrabold text-amber-400">{fatGrams}g</p>
                <p className="text-[11px] text-slate-500">{fatGrams * 9} kcal</p>
              </div>
            </div>
          </div>

          {/* Goal Timeline Box */}
          <div className="rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/40 border border-emerald-500/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {lbsToLose > 0
                    ? `Reach ${goalWeightLbs} lbs (${lbsToLose} lbs lost) in ~${weeksToGoal} weeks (${daysToGoal} days)`
                    : `You are at or below your ${goalWeightLbs} lb goal weight! Lean Bulk target: ${bulkingCalories} kcal/day`}
                </p>
                <p className="text-xs text-slate-300">
                  Eating {cuttingCalories.toLocaleString()} kcal/day + {proteinGrams}g protein at {feet}&apos;{inches}&quot;, {weightLbs} lbs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monetization Unit */}
      <MonetizationBanner
        vertical={vertical}
        contextualRecommendation={`Hit Your ${proteinGrams}g Daily Protein Target Easily (${Math.ceil(proteinGrams / 25)} Scoops Equivalent)`}
      />

      {/* Second Calculator: 1-Rep Max & Strength Level Standards */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-emerald-400" />
              Strength Standards & 1-Rep Max Calculator (at {weightLbs} lbs Bodyweight)
            </h2>
            <p className="text-xs text-slate-400">
              See how your Bench, Squat, Deadlift, and Overhead Press stack up against lifters at your exact weight.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Your Rank: {userTier} ({strengthRatio}x BW)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Select Compound Lift</label>
            <select
              value={selectedLiftId}
              onChange={(e) => setSelectedLiftId(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              {LIFT_STANDARDS.map((lift) => (
                <option key={lift.id} value={lift.id}>
                  {lift.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Weight Lifted (lbs)</label>
            <input
              type="number"
              min={45}
              max={900}
              step={5}
              value={liftWeightLbs}
              onChange={(e) => setLiftWeightLbs(Number(e.target.value) || 135)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Repetitions Performed (Est. 1RM: <span className="text-emerald-400">{oneRepMax} lbs</span>)
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={liftReps}
              onChange={(e) => setLiftReps(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {["Beginner", "Novice", "Intermediate", "Advanced", "Elite"].map((tier, idx) => {
            const target = standardsLbs[idx];
            const achieved = oneRepMax >= target;
            return (
              <div
                key={tier}
                className={`rounded-xl p-3.5 border text-center transition ${
                  achieved
                    ? "bg-emerald-950/50 border-emerald-500/40 text-white"
                    : "bg-slate-950/60 border-slate-800 text-slate-400"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider">{tier}</p>
                <p className="text-xl font-extrabold mt-1 text-white">{target} lbs</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{multipliers[idx]}x BW</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Programmatic SEO Internal Link Matrix */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Programmatic SEO Landing Pages (Height × Weight Matrix)
            </h3>
            <p className="text-xs text-slate-400">
              Each link below is a pre-rendered, indexable landing page targeting high-volume long-tail searches:
            </p>
          </div>
          <Activity className="w-5 h-5 text-slate-600" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {BMI_PRESETS.map((preset) => {
            const isCurrent = activeSlug === preset.slug;
            return (
              <Link
                key={preset.slug}
                href={`/fitness/${preset.slug}`}
                className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                  isCurrent
                    ? "bg-emerald-600/20 border-emerald-400 text-white"
                    : "bg-slate-950/70 border-slate-800/90 text-slate-300 hover:border-emerald-500/50 hover:text-white"
                }`}
              >
                <span className="font-semibold">
                  {preset.feet}&apos;{preset.inches}&quot; {preset.weightLbs} lbs
                </span>
                <span className="text-[10px] text-emerald-400 mt-1">{preset.searchVolume}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
