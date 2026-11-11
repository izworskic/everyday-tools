"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VERTICALS } from "@/data/pseoData";
import {
  Activity,
  Utensils,
  Clock,
  GraduationCap,
  Type,
  Dices,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  fitness: <Activity className="w-4 h-4" />,
  kitchen: <Utensils className="w-4 h-4" />,
  time: <Clock className="w-4 h-4" />,
  grades: <GraduationCap className="w-4 h-4" />,
  text: <Type className="w-4 h-4" />,
  games: <Dices className="w-4 h-4" />,
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white">
                Mega<span className="text-indigo-400">Tools</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                41M+ Monthly Vol Engine
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar">
            {VERTICALS.map((v) => {
              const isActive = pathname === v.href || pathname.startsWith(v.href + "/");
              return (
                <Link
                  key={v.id}
                  href={v.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                  }`}
                >
                  {ICON_MAP[v.id]}
                  <span>{v.shortName}</span>
                </Link>
              );
            })}

            <Link
              href="/seo-matrix"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition ml-1 ${
                pathname === "/seo-matrix"
                  ? "bg-emerald-600 text-white border-emerald-400"
                  : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>pSEO Matrix & Revenue</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
