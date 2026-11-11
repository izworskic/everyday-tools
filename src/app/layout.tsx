import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { VERTICALS } from "@/data/pseoData";
import { buildPageMetadata, CANONICAL_PROFILE_URL, TOOLS_HUB_URL } from "@/lib/seo-schema";

export const metadata: Metadata = buildPageMetadata(
  "",
  "Everyday Calculators & Reference Tools | Chris Izworski",
  "Fast calculators for TDEE & BMI, air fryer times, grams to cups, work shift hours, AP & final exam grades, Unicode fonts, and 5-letter word solvers."
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-800/80 bg-slate-950/80 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {VERTICALS.map((v) => (
                <div key={v.id} className="space-y-1.5">
                  <Link
                    href={v.href}
                    className="text-xs font-bold text-white hover:text-indigo-400 transition"
                  >
                    {v.shortName}
                  </Link>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{v.tagline}</p>
                  <p className="text-[10px] font-semibold text-emerald-400">
                    {v.monthlySearchPotential} • {v.estimatedRpm}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
              <span>
                © 2026{" "}
                <a
                  href={CANONICAL_PROFILE_URL}
                  rel="author"
                  className="text-slate-300 hover:text-white underline"
                >
                  Chris Izworski
                </a>{" "}
                · Everyday Consumer Calculators & Utility Suite
              </span>
              <div className="flex items-center gap-4">
                <Link href="/seo-matrix" className="text-indigo-400 hover:underline font-medium">
                  All Calculator Pages →
                </Link>
                <a href={TOOLS_HUB_URL} className="text-slate-400 hover:underline">
                  chrisizworski.com/tools/
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
