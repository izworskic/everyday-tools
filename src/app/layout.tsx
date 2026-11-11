import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { VERTICALS } from "@/data/pseoData";

export const metadata: Metadata = {
  title: "MegaTools Hub | High-Volume Programmatic SEO Utility & Calculator Suite",
  description:
    "All-in-one high-traffic consumer utility hub: Body & TDEE Calculators, Air Fryer & Ingredient Converters, Work Hours & Sleep Cycles, Final Grade & AP Calculators, Unicode Fonts, and Word Game Solvers.",
};

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
                MegaTools Programmatic SEO Empire — 6 Mass-Market Non-Finance, Non-Outdoor Verticals
              </span>
              <div className="flex items-center gap-4">
                <Link href="/seo-matrix" className="text-indigo-400 hover:underline font-medium">
                  pSEO Sitemap & Revenue Calculator →
                </Link>
                <Link href="/sitemap.xml" className="text-slate-400 hover:underline">
                  /sitemap.xml
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
