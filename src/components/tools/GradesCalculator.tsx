"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AP_EXAMS, FINAL_GRADE_PRESETS, VERTICALS } from "@/data/pseoData";
import MonetizationBanner from "@/components/MonetizationBanner";
import { Award, Calculator, GraduationCap, Sparkles } from "lucide-react";

interface Props {
  initialCurrentGrade?: number;
  initialFinalWeight?: number;
  initialTargetGrade?: number;
  initialApSlug?: string;
  activeSlug?: string;
}

export default function GradesCalculator({
  initialCurrentGrade = 85,
  initialFinalWeight = 20,
  initialTargetGrade = 90,
  initialApSlug = "ap-biology",
  activeSlug,
}: Props) {
  const vertical = VERTICALS.find((v) => v.id === "grades")!;

  // 1. Final Grade Calculator State ("What do I need on my final?")
  const [currentGrade, setCurrentGrade] = useState<number>(initialCurrentGrade);
  const [finalWeight, setFinalWeight] = useState<number>(initialFinalWeight);
  const [targetGrade, setTargetGrade] = useState<number>(initialTargetGrade);

  const safeWeight = Math.min(99, Math.max(1, finalWeight));
  const currentWeightFraction = (100 - safeWeight) / 100;
  const finalWeightFraction = safeWeight / 100;

  const neededOnFinal =
    (targetGrade - currentGrade * currentWeightFraction) / finalWeightFraction;

  let difficultyLabel = "Achievable with Solid Review";
  let difficultyColor = "text-emerald-400";
  if (neededOnFinal > 100) {
    difficultyLabel = "Requires Extra Credit (>100%)";
    difficultyColor = "text-rose-400";
  } else if (neededOnFinal >= 92) {
    difficultyLabel = "High-Stakes — Study Intensive!";
    difficultyColor = "text-amber-400";
  } else if (neededOnFinal <= 0) {
    difficultyLabel = "Already Locked In! Even 0% Keeps Target";
    difficultyColor = "text-cyan-400";
  }

  // 2. AP Score Curve Calculator State
  const [selectedApSlug, setSelectedApSlug] = useState<string>(initialApSlug);
  const selectedAp = AP_EXAMS.find((e) => e.slug === selectedApSlug) || AP_EXAMS[0];

  const [mcqCorrect, setMcqCorrect] = useState<number>(Math.round(selectedAp.mcqCount * 0.72));
  const [frqScore, setFrqScore] = useState<number>(Math.round(selectedAp.frqMaxPoints * 0.68));

  const clampedMcq = Math.min(selectedAp.mcqCount, Math.max(0, mcqCorrect));
  const clampedFrq = Math.min(selectedAp.frqMaxPoints, Math.max(0, frqScore));

  const compositePct = Math.round(
    (clampedMcq / selectedAp.mcqCount) * selectedAp.mcqWeightPct +
      (clampedFrq / selectedAp.frqMaxPoints) * selectedAp.frqWeightPct
  );

  let apScore = 1;
  if (compositePct >= selectedAp.cutoffs[3]) apScore = 5;
  else if (compositePct >= selectedAp.cutoffs[2]) apScore = 4;
  else if (compositePct >= selectedAp.cutoffs[1]) apScore = 3;
  else if (compositePct >= selectedAp.cutoffs[0]) apScore = 2;

  const handleApChange = (slug: string) => {
    setSelectedApSlug(slug);
    const exam = AP_EXAMS.find((e) => e.slug === slug);
    if (exam) {
      setMcqCorrect(Math.round(exam.mcqCount * 0.72));
      setFrqScore(Math.round(exam.frqMaxPoints * 0.68));
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: "What Do I Need on My Final?" Calculator */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-400" />
              &ldquo;What Do I Need on My Final Exam?&rdquo; Calculator
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
              RogerHub Style
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Current Grade (%)
              </label>
              <input
                type="number"
                step={0.5}
                value={currentGrade}
                onChange={(e) => setCurrentGrade(Number(e.target.value) || 0)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-bold text-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Final Worth (%)
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={finalWeight}
                onChange={(e) => setFinalWeight(Number(e.target.value) || 20)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-bold text-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Target Class Grade (%)
              </label>
              <input
                type="number"
                step={0.5}
                value={targetGrade}
                onChange={(e) => setTargetGrade(Number(e.target.value) || 90)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-bold text-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Main Output Box */}
          <div className="rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-950 border border-purple-500/40 p-5 text-center space-y-1">
            <span className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
              Required Final Exam Score to Finish With {targetGrade}%
            </span>
            <p className="text-4xl font-extrabold text-white">
              {neededOnFinal.toFixed(1)}%
            </p>
            <p className={`text-xs font-semibold ${difficultyColor}`}>{difficultyLabel}</p>
          </div>

          {/* Multi-Target Scenario Table */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Final Exam Score Needed for Every Letter Grade:
            </p>
            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { letter: "A (93%)", target: 93 },
                { letter: "A- (90%)", target: 90 },
                { letter: "B+ (87%)", target: 87 },
                { letter: "B (83%)", target: 83 },
                { letter: "C (73%)", target: 73 },
              ].map((g) => {
                const req =
                  (g.target - currentGrade * currentWeightFraction) / finalWeightFraction;
                return (
                  <button
                    key={g.letter}
                    type="button"
                    onClick={() => setTargetGrade(g.target)}
                    className="rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 p-2.5 transition cursor-pointer"
                  >
                    <span className="text-[11px] text-slate-400 block">{g.letter}</span>
                    <span
                      className={`text-sm font-extrabold mt-0.5 block ${
                        req > 100
                          ? "text-rose-400"
                          : req <= 75
                          ? "text-emerald-400"
                          : "text-white"
                      }`}
                    >
                      {req.toFixed(1)}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Interactive AP Score Curve Calculator */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                Interactive AP Exam Score Calculator
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                2026 College Board Curves
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Select AP Subject Exam
              </label>
              <select
                value={selectedAp.slug}
                onChange={(e) => handleApChange(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white font-semibold focus:border-purple-500 focus:outline-none"
              >
                {AP_EXAMS.map((exam) => (
                  <option key={exam.slug} value={exam.slug}>
                    {exam.name} ({exam.searchVolume})
                  </option>
                ))}
              </select>
            </div>

            {/* Sliders for MCQ and FRQ */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">
                    Section I: Multiple Choice ({selectedAp.mcqWeightPct}% Weight)
                  </span>
                  <span className="text-purple-300 font-bold">
                    {clampedMcq} / {selectedAp.mcqCount} Correct
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={selectedAp.mcqCount}
                  value={clampedMcq}
                  onChange={(e) => setMcqCorrect(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">
                    Section II: Free Response ({selectedAp.frqWeightPct}% Weight)
                  </span>
                  <span className="text-purple-300 font-bold">
                    {clampedFrq} / {selectedAp.frqMaxPoints} Points
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={selectedAp.frqMaxPoints}
                  value={clampedFrq}
                  onChange={(e) => setFrqScore(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* AP Score Result Box */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-xl bg-slate-950 border border-purple-500/40 p-4 text-center">
                <span className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold">
                  Predicted AP Score
                </span>
                <p className="text-4xl font-extrabold text-white mt-1">{apScore}</p>
                <span className="text-xs text-emerald-400">
                  {apScore >= 4
                    ? "Qualifies for College Credit!"
                    : apScore === 3
                    ? "Passing Score (3+)"
                    : "Below Passing Threshold"}
                </span>
              </div>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-center flex flex-col justify-center">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Weighted Composite
                </span>
                <p className="text-3xl font-extrabold text-purple-400 mt-1">{compositePct}%</p>
                <span className="text-[11px] text-slate-400">
                  Score 5 Cutoff: {selectedAp.cutoffs[3]}%+
                </span>
              </div>
            </div>
          </div>

          {/* Curve Cutoff Bar */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[2, 3, 4, 5].map((score, i) => (
              <div
                key={score}
                className={`rounded-lg p-2 border ${
                  apScore === score
                    ? "bg-purple-600/30 border-purple-400 text-white font-bold"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <span className="block">AP Score {score}</span>
                <span className="text-[11px] text-purple-300">≥{selectedAp.cutoffs[i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monetization Unit */}
      <MonetizationBanner
        vertical={vertical}
        contextualRecommendation={`Need a ${neededOnFinal.toFixed(1)}% on Your Final or a 5 on ${selectedAp.name}? Get Instant Practice Tests & Study Guides`}
      />

      {/* Programmatic SEO Links */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Programmatic SEO Grade & AP Score Pages
            </h3>
            <p className="text-xs text-slate-400">
              Dedicated landing pages for every AP Exam and Final Exam Grade combination:
            </p>
          </div>
          <GraduationCap className="w-5 h-5 text-slate-600" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {AP_EXAMS.map((exam) => (
            <Link
              key={exam.slug}
              href={`/grades/${exam.slug}`}
              className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                activeSlug === exam.slug
                  ? "bg-purple-600/20 border-purple-400 text-white"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-purple-500/50 hover:text-white"
              }`}
            >
              <span className="font-semibold">{exam.name} Score Calculator</span>
              <span className="text-[10px] text-purple-400 mt-1">{exam.searchVolume}</span>
            </Link>
          ))}
          {FINAL_GRADE_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/grades/${preset.slug}`}
              className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                activeSlug === preset.slug
                  ? "bg-purple-600/20 border-purple-400 text-white"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-purple-500/50 hover:text-white"
              }`}
            >
              <span className="font-semibold">
                {preset.currentGrade}% Grade ({preset.finalWeight}% Final)
              </span>
              <span className="text-[10px] text-emerald-400 mt-1">{preset.searchVolume}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
