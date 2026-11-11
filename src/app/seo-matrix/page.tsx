import React from "react";
import type { Metadata } from "next";
import { buildPageMetadata, CreatorAuthority } from "@/lib/seo-schema";
import SeoMatrixClient from "@/components/tools/SeoMatrixClient";

export const metadata: Metadata = buildPageMetadata(
  "seo-matrix",
  "All Everyday Calculators & Tool Directory | Chris Izworski",
  "Complete directory of 95+ interactive calculators for BMI & TDEE, air fryer cooking times, grams to cups, work hours, AP exam scores, and word solvers."
);

export default function SeoMatrixPage() {
  return (
    <div className="space-y-8">
      <SeoMatrixClient />
      <CreatorAuthority
        relPath="seo-matrix"
        pageName="All Everyday Calculators & Tool Directory | Chris Izworski"
      />
    </div>
  );
}
