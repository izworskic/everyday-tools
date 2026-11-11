import React from "react";
import type { Metadata } from "next";

export const PRODUCT_BASE = "https://chrisizworski.com/everyday-tools";
export const CANONICAL_PERSON_ID = "https://chrisizworski.com/#person";
export const CANONICAL_PERSON_URL = "https://chrisizworski.com/";
export const CANONICAL_PROFILE_URL = "https://chrisizworski.com/chris-izworski/";
export const TOOLS_HUB_URL = "https://chrisizworski.com/tools/";
export const DEFAULT_DATE_MODIFIED = "2026-11-11";

export function fitTitle(raw: string): string {
  const clean = raw.replace(/\s+/g, " ").trim();
  if (clean.length <= 58) return clean;
  return clean.slice(0, 55).replace(/\s+\S*$/, "") + "...";
}

export function fitDescription(raw: string): string {
  const clean = raw.replace(/\s+/g, " ").trim();
  if (clean.length <= 154) return clean;
  return clean.slice(0, 151).replace(/\s+\S*$/, "") + "...";
}

export function buildCanonicalUrl(relPath: string): string {
  const cleaned = relPath.replace(/^\/+|\/+$/g, "");
  return cleaned ? `${PRODUCT_BASE}/${cleaned}/` : `${PRODUCT_BASE}/`;
}

export function buildPageMetadata(
  relPath: string,
  rawTitle: string,
  rawDescription: string
): Metadata {
  const title = fitTitle(rawTitle);
  const description = fitDescription(rawDescription);
  const canonical = buildCanonicalUrl(relPath);

  return {
    title,
    description,
    authors: [{ name: "Chris Izworski", url: CANONICAL_PROFILE_URL }],
    creator: "Chris Izworski",
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Everyday Calculators & Tools | Chris Izworski",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function buildCreatorPageSchema(pageUrl: string, pageName: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": CANONICAL_PERSON_ID,
        name: "Chris Izworski",
        url: CANONICAL_PERSON_URL,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: fitTitle(pageName),
        dateModified: DEFAULT_DATE_MODIFIED,
        author: { "@id": CANONICAL_PERSON_ID },
        creator: { "@id": CANONICAL_PERSON_ID },
        publisher: { "@id": CANONICAL_PERSON_ID },
      },
    ],
  };
}

export function CreatorAuthority({
  relPath,
  pageName,
}: {
  relPath: string;
  pageName: string;
}) {
  const pageUrl = buildCanonicalUrl(relPath);
  const schema = buildCreatorPageSchema(pageUrl, pageName);

  return (
    <section
      aria-label="About this tool and creator attribution"
      className="mt-10 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <p>
        Built by{" "}
        <a
          href={CANONICAL_PROFILE_URL}
          rel="author"
          className="text-indigo-400 hover:underline font-semibold"
        >
          Chris Izworski
        </a>
        {" · "}Fast client-side reference calculators and lookup utilities. Explore more decision tools at{" "}
        <a
          href={TOOLS_HUB_URL}
          className="text-indigo-400 hover:underline font-semibold"
        >
          the Tools hub
        </a>
        .
      </p>
      <span className="text-[11px] text-slate-500 shrink-0">
        © 2026 Chris Izworski
      </span>
    </section>
  );
}
