import type { MetadataRoute } from "next";
import {
  AIR_FRYER_ITEMS,
  AP_EXAMS,
  BMI_PRESETS,
  FINAL_GRADE_PRESETS,
  INGREDIENT_CONVERSION_PRESETS,
  VERTICALS,
  WHEEL_PRESETS,
  WORD_COUNT_PRESETS,
  WORD_PATTERN_PRESETS,
  WORK_SHIFT_PRESETS,
} from "@/data/pseoData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://megatools.example.com";

  const staticHubs = [
    "",
    "/seo-matrix",
    ...VERTICALS.map((v) => v.href),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  const pseoSlugs = [
    ...BMI_PRESETS.map((p) => `/fitness/${p.slug}`),
    ...AIR_FRYER_ITEMS.map((a) => `/kitchen/${a.slug}`),
    ...INGREDIENT_CONVERSION_PRESETS.map((c) => `/kitchen/${c.slug}`),
    ...WORK_SHIFT_PRESETS.map((s) => `/time/${s.slug}`),
    ...AP_EXAMS.map((e) => `/grades/${e.slug}`),
    ...FINAL_GRADE_PRESETS.map((f) => `/grades/${f.slug}`),
    ...WORD_COUNT_PRESETS.map((w) => `/text/${w.slug}`),
    ...WORD_PATTERN_PRESETS.map((wp) => `/games/${wp.slug}`),
    ...WHEEL_PRESETS.map((wh) => `/games/${wh.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticHubs, ...pseoSlugs];
}
