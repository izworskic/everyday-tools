import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { WORK_SHIFT_PRESETS } from "@/data/pseoData";
import TimeCalculator from "@/components/tools/TimeCalculator";
import { buildPageMetadata, CreatorAuthority } from "@/lib/seo-schema";

export function generateStaticParams() {
  return WORK_SHIFT_PRESETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const shift = WORK_SHIFT_PRESETS.find((s) => s.slug === slug) || WORK_SHIFT_PRESETS[2];
  return buildPageMetadata(
    `time/${slug}`,
    `Hours From ${shift.label} (With 30m Break)`,
    `Calculate exact work hours from ${shift.label} with and without a ${shift.breakMinutes}-minute lunch break, plus payroll decimal hours.`
  );
}

export default async function TimeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shift = WORK_SHIFT_PRESETS.find((s) => s.slug === slug) || WORK_SHIFT_PRESETS[2];

  const [sh, sm] = shift.startTime.split(":").map(Number);
  const [eh, em] = shift.endTime.split(":").map(Number);
  const grossMins = eh * 60 + em - (sh * 60 + sm);
  const netMins = grossMins - shift.breakMinutes;
  const decimalHrs = (netMins / 60).toFixed(2);
  const pageTitle = `Hours From ${shift.label} (With 30m Break)`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/time" className="hover:text-white">Hours & Sleep</Link>
        <span>/</span>
        <span className="text-indigo-400 font-semibold">{shift.label}</span>
      </div>

      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-6 space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          Pre-Filled Shift Duration Page
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          How Many Hours Is {shift.label}? ({decimalHrs} Hrs After {shift.breakMinutes}m Break)
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          From <strong>{shift.label}</strong> is <strong>{(grossMins / 60).toFixed(2)} hours</strong> gross, or <strong>{Math.floor(netMins / 60)} hours {netMins % 60} minutes ({decimalHrs} payroll decimal hours)</strong> after deducting a {shift.breakMinutes}-minute unpaid break.
        </p>
      </div>

      <TimeCalculator
        initialStartTime={shift.startTime}
        initialEndTime={shift.endTime}
        initialBreakMinutes={shift.breakMinutes}
        activeSlug={slug}
      />

      <CreatorAuthority relPath={`time/${slug}`} pageName={pageTitle} />
    </div>
  );
}
