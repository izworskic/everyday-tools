"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WORK_SHIFT_PRESETS, VERTICALS } from "@/data/pseoData";
import MonetizationBanner from "@/components/MonetizationBanner";
import { Calendar, Clock, Moon, Sparkles, Sun } from "lucide-react";

interface Props {
  initialStartTime?: string;
  initialEndTime?: string;
  initialBreakMinutes?: number;
  activeSlug?: string;
}

export default function TimeCalculator({
  initialStartTime = "08:30",
  initialEndTime = "17:00",
  initialBreakMinutes = 30,
  activeSlug,
}: Props) {
  const vertical = VERTICALS.find((v) => v.id === "time")!;

  // 1. Work Hours & Payroll Decimal Calculator
  const [startTime, setStartTime] = useState<string>(initialStartTime);
  const [endTime, setEndTime] = useState<string>(initialEndTime);
  const [breakMinutes, setBreakMinutes] = useState<number>(initialBreakMinutes);
  const [daysWorked, setDaysWorked] = useState<number>(5);

  // Parse start & end times
  const parseMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const startMins = parseMinutes(startTime);
  let endMins = parseMinutes(endTime);
  if (endMins <= startMins) {
    endMins += 24 * 60; // overnight shift support
  }
  const grossMins = endMins - startMins;
  const netMins = Math.max(0, grossMins - breakMinutes);
  const hoursPart = Math.floor(netMins / 60);
  const minsPart = netMins % 60;
  const decimalHours = (netMins / 60).toFixed(2);
  const weeklyDecimalHours = ((netMins * daysWorked) / 60).toFixed(2);
  const weeklyOvertimeHours = Math.max(0, (netMins * daysWorked) / 60 - 40).toFixed(2);

  // 2. Sleep Cycle Calculator (90-min REM cycles + 15-min fall asleep buffer)
  const [wakeUpTarget, setWakeUpTarget] = useState<string>("06:30");
  const wakeUpTotalMins = parseMinutes(wakeUpTarget);

  const format12h = (totalMinutes: number) => {
    const normalized = ((totalMinutes % 1440) + 1440) % 1440;
    const h24 = Math.floor(normalized / 60);
    const m = normalized % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
  };

  // 6 cycles (9h), 5 cycles (7.5h), 4 cycles (6h), 3 cycles (4.5h) + 15m to fall asleep
  const sleepCycles = [6, 5, 4, 3].map((cycles) => {
    const sleepMins = cycles * 90;
    const bedtimeMins = wakeUpTotalMins - sleepMins - 15;
    return {
      cycles,
      hours: (sleepMins / 60).toFixed(1),
      bedtime: format12h(bedtimeMins),
      optimal: cycles === 5 || cycles === 6,
    };
  });

  // 3. Date Duration / Days Between Two Dates
  const [startDate, setStartDate] = useState<string>("2026-11-11");
  const [endDate, setEndDate] = useState<string>("2026-12-25");

  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = (totalDays / 7).toFixed(1);
  const approxBusinessDays = Math.round(totalDays * (5 / 7));

  return (
    <div className="space-y-8">
      {/* Top Grid: Work Hours Calculator + Sleep Cycle Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Work Hours & Timesheet Decimal Calculator */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              Hours Between Two Times & Timesheet Calculator
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
              Payroll Ready
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Clock-In Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Clock-Out Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Break (Mins)</label>
              <input
                type="number"
                min={0}
                max={240}
                step={5}
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Math.max(0, Number(e.target.value) || 0))}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Shifts / Week</label>
              <input
                type="number"
                min={1}
                max={7}
                value={daysWorked}
                onChange={(e) => setDaysWorked(Math.min(7, Math.max(1, Number(e.target.value) || 5)))}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-white font-semibold focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-950 border border-indigo-500/40 p-4">
              <span className="text-[11px] uppercase tracking-wider text-indigo-400 font-semibold">
                Exact Shift Duration
              </span>
              <p className="text-2xl font-extrabold text-white mt-1">
                {hoursPart}h {minsPart}m
              </p>
              <span className="text-xs text-slate-400">{netMins} total minutes</span>
            </div>

            <div className="rounded-xl bg-slate-950 border border-emerald-500/40 p-4">
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                Payroll Decimal
              </span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">{decimalHours} hrs</p>
              <span className="text-xs text-slate-400">For ADP / Gusto / QuickBooks</span>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-xl bg-slate-950 border border-slate-800 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                {daysWorked}-Day Weekly Total
              </span>
              <p className="text-2xl font-extrabold text-white mt-1">{weeklyDecimalHours} hrs</p>
              <span className="text-xs text-amber-400">
                {Number(weeklyOvertimeHours) > 0
                  ? `Includes ${weeklyOvertimeHours}h Overtime`
                  : "0.00h Overtime"}
              </span>
            </div>
          </div>

          {/* Minute-to-Decimal Quick Reference Table */}
          <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3.5">
            <p className="text-xs font-bold text-slate-300 mb-2">
              Quick Payroll Minute-to-Decimal Conversion Chart:
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-center text-xs">
              {[
                { m: "10m", d: "0.17" },
                { m: "15m", d: "0.25" },
                { m: "20m", d: "0.33" },
                { m: "30m", d: "0.50" },
                { m: "45m", d: "0.75" },
                { m: "50m", d: "0.83" },
              ].map((row) => (
                <div key={row.m} className="rounded-lg bg-slate-900 p-1.5 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{row.m}</span>
                  <span className="font-bold text-indigo-300">{row.d} hr</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 90-Minute REM Sleep Cycle & Date Calculator */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-400" />
                90-Minute REM Sleep Cycle Calculator
              </h2>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-300 font-medium">Wake Up At:</span>
                <input
                  type="time"
                  value={wakeUpTarget}
                  onChange={(e) => setWakeUpTarget(e.target.value)}
                  className="rounded-lg bg-slate-950 border border-indigo-500/50 px-2.5 py-1 text-sm text-white font-bold"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Waking up between 90-minute sleep cycles (instead of in the middle of deep REM sleep) eliminates morning grogginess. Includes average 15-minute time to fall asleep:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sleepCycles.map((c) => (
                <div
                  key={c.cycles}
                  className={`rounded-xl p-3.5 border text-center ${
                    c.optimal
                      ? "bg-indigo-950/60 border-indigo-400/50"
                      : "bg-slate-950 border-slate-800"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-300">
                    {c.cycles} Cycles ({c.hours}h)
                  </span>
                  <p className="text-lg font-extrabold text-white mt-1">{c.bedtime}</p>
                  <span className="text-[11px] text-slate-400">
                    {c.optimal ? "Optimal Rest ⭐" : "Minimum Recovery"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Date Duration / Countdown Sub-tool */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              Days Between Two Dates & Workday Counter
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white font-semibold"
                />
              </div>
              <div className="rounded-xl bg-slate-950 border border-indigo-500/40 p-2.5 text-center">
                <span className="text-lg font-extrabold text-white">{totalDays} Days</span>
                <span className="block text-[11px] text-indigo-300">
                  {totalWeeks} wks • ~{approxBusinessDays} weekdays
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monetization Unit */}
      <MonetizationBanner
        vertical={vertical}
        contextualRecommendation={`Working ${decimalHours} Hours/Day (${weeklyDecimalHours} Hrs/Wk)? Automate Payroll & Timesheets or Optimize Your ${sleepCycles[1].bedtime} Sleep Cycle`}
      />

      {/* Programmatic SEO Shift Pages */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Programmatic SEO Shift Duration Pages (High-Volume Daily Searches)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Millions of hourly employees search exact shift times every Friday. Each link below is a pre-configured landing page:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {WORK_SHIFT_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/time/${preset.slug}`}
              className={`rounded-xl p-2.5 border text-xs transition flex flex-col justify-between ${
                activeSlug === preset.slug
                  ? "bg-indigo-600/20 border-indigo-400 text-white"
                  : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-indigo-500/50 hover:text-white"
              }`}
            >
              <span className="font-semibold">Hours: {preset.label}</span>
              <span className="text-[10px] text-indigo-400 mt-1">{preset.searchVolume}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
