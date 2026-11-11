export interface VerticalMeta {
  id: string;
  name: string;
  shortName: string;
  href: string;
  tagline: string;
  monthlySearchPotential: string;
  estimatedRpm: string;
  color: string;
  badgeColor: string;
  affiliateOffer: {
    title: string;
    cta: string;
    payout: string;
    description: string;
    badge: string;
  };
}

export const VERTICALS: VerticalMeta[] = [
  {
    id: "fitness",
    name: "Body Stats, TDEE & Strength Standards",
    shortName: "Body & TDEE",
    href: "/fitness",
    tagline: "BMI, TDEE, Macro Deficit Timeline & 1-Rep Max Strength Standards by Bodyweight",
    monthlySearchPotential: "3.8M+ / mo",
    estimatedRpm: "$22 - $38 RPM",
    color: "from-emerald-500 to-teal-600",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    affiliateOffer: {
      title: "MacroFactor & Transparent Labs Whey Isolate",
      cta: "Get Custom Macro Plan + 15% Off Protein",
      payout: "$28 - $65 / conversion",
      description: "Matched dynamically to user protein target (e.g. 165g/day) and calorie deficit goal.",
      badge: "Fitness Affiliate Slot",
    },
  },
  {
    id: "kitchen",
    name: "Kitchen, Air Fryer & Ingredient Converter",
    shortName: "Kitchen & Air Fryer",
    href: "/kitchen",
    tagline: "Exact Air Fryer Time/Temp Lookup, Grams-to-Cups by Ingredient & Roast Timer",
    monthlySearchPotential: "5.2M+ / mo",
    estimatedRpm: "$32 - $48 RPM",
    color: "from-amber-500 to-orange-600",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    affiliateOffer: {
      title: "COSORI TurboBlaze 6-Qt Air Fryer + OXO Kitchen Scale",
      cta: "Check Today's Amazon Deal →",
      payout: "4.5% - 8% Amazon / Direct",
      description: "High-intent kitchen hardware & digital food scale recommendations beside every conversion.",
      badge: "Highest Ad RPM Vertical",
    },
  },
  {
    id: "time",
    name: "Work Hours, Timesheet & Sleep Cycle Tools",
    shortName: "Hours & Sleep",
    href: "/time",
    tagline: "Hours Between Two Times, Payroll Decimal Converter & 90-Min REM Sleep Calculator",
    monthlySearchPotential: "6.5M+ / mo",
    estimatedRpm: "$18 - $30 RPM",
    color: "from-indigo-500 to-blue-600",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    affiliateOffer: {
      title: "Gusto Automated Timesheets & Eight Sleep / Hatch Restore",
      cta: "Try Automated Time Tracking Free",
      payout: "$50 - $150 B2B Lead / Sleep Affiliates",
      description: "Dual monetization: B2B payroll software on timesheet pages + sleep tech on wake-up pages.",
      badge: "Repeat Daily Bookmarks",
    },
  },
  {
    id: "grades",
    name: "Final Grade, GPA & AP Score Calculators",
    shortName: "Grades & AP Scores",
    href: "/grades",
    tagline: "'What Do I Need on My Final?', Weighted GPA Predictor & Interactive AP Exam Curves",
    monthlySearchPotential: "4.1M+ / mo",
    estimatedRpm: "$20 - $34 RPM",
    color: "from-purple-500 to-fuchsia-600",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    affiliateOffer: {
      title: "Princeton Review AP Crash Course & Quizlet Plus Study Pass",
      cta: "Unlock Practice Exams & Flashcards →",
      payout: "$15 - $85 / student signup",
      description: "Students run 8+ grade calculations per session, creating massive ad impression multipliers.",
      badge: "8.4 Pages / Session",
    },
  },
  {
    id: "text",
    name: "Copy-Paste Fonts, Invisible Text & Word Time",
    shortName: "Fonts & Symbols",
    href: "/text",
    tagline: "Unicode Social Bio Fonts, Invisible Discord/Fortnite Character & Speech Time Counter",
    monthlySearchPotential: "9.4M+ / mo",
    estimatedRpm: "$14 - $24 RPM",
    color: "from-pink-500 to-rose-600",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    affiliateOffer: {
      title: "ElevenLabs AI Voiceover & Canva Pro Social Creator Kit",
      cta: "Convert Your Script to Studio Audio →",
      payout: "22% Recurring SaaS Commission",
      description: "Speaking-time calculator pitches instant AI voiceover generation; font tools pitch social tools.",
      badge: "Pure Traffic Giant",
    },
  },
  {
    id: "games",
    name: "Word Solvers, Unscrambler & Party Spin Wheels",
    shortName: "Word Solver & Wheels",
    href: "/games",
    tagline: "5-Letter Wordle/Scrabble Pattern Solver, Anagram Unscrambler & Interactive Decision Wheels",
    monthlySearchPotential: "12.0M+ / mo",
    estimatedRpm: "$16 - $28 RPM",
    color: "from-cyan-500 to-sky-600",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    affiliateOffer: {
      title: "NYT Games All-Access / DoorDash Dinner Wheel Offer",
      cta: "Claim $15 Off Your Dinner Wheel Pick →",
      payout: "$10 - $25 CPA",
      description: "Dinner decision wheels link directly to food delivery promos; word solvers drive high time-on-page.",
      badge: "Highest Session Duration",
    },
  },
];

// ==========================================
// 1. FITNESS & BODY STATS pSEO DATA
// ==========================================
export interface BmiPreset {
  slug: string;
  feet: number;
  inches: number;
  weightLbs: number;
  searchVolume: string;
}

export const BMI_PRESETS: BmiPreset[] = [
  { slug: "5-ft-2-125-lbs", feet: 5, inches: 2, weightLbs: 125, searchVolume: "18,400/mo" },
  { slug: "5-ft-4-135-lbs", feet: 5, inches: 4, weightLbs: 135, searchVolume: "29,100/mo" },
  { slug: "5-ft-4-150-lbs", feet: 5, inches: 4, weightLbs: 150, searchVolume: "34,000/mo" },
  { slug: "5-ft-5-145-lbs", feet: 5, inches: 5, weightLbs: 145, searchVolume: "26,500/mo" },
  { slug: "5-ft-6-155-lbs", feet: 5, inches: 6, weightLbs: 155, searchVolume: "31,200/mo" },
  { slug: "5-ft-7-165-lbs", feet: 5, inches: 7, weightLbs: 165, searchVolume: "28,900/mo" },
  { slug: "5-ft-8-170-lbs", feet: 5, inches: 8, weightLbs: 170, searchVolume: "41,000/mo" },
  { slug: "5-ft-9-175-lbs", feet: 5, inches: 9, weightLbs: 175, searchVolume: "46,200/mo" },
  { slug: "5-ft-9-190-lbs", feet: 5, inches: 9, weightLbs: 190, searchVolume: "38,700/mo" },
  { slug: "5-ft-10-180-lbs", feet: 5, inches: 10, weightLbs: 180, searchVolume: "52,400/mo" },
  { slug: "5-ft-10-200-lbs", feet: 5, inches: 10, weightLbs: 200, searchVolume: "44,100/mo" },
  { slug: "5-ft-11-185-lbs", feet: 5, inches: 11, weightLbs: 185, searchVolume: "33,800/mo" },
  { slug: "6-ft-0-195-lbs", feet: 6, inches: 0, weightLbs: 195, searchVolume: "49,500/mo" },
  { slug: "6-ft-0-215-lbs", feet: 6, inches: 0, weightLbs: 215, searchVolume: "37,200/mo" },
  { slug: "6-ft-2-210-lbs", feet: 6, inches: 2, weightLbs: 210, searchVolume: "29,800/mo" },
];

export interface LiftStandard {
  id: string;
  name: string;
  maleMultipliers: [number, number, number, number, number]; // Beginner, Novice, Intermediate, Advanced, Elite
  femaleMultipliers: [number, number, number, number, number];
}

export const LIFT_STANDARDS: LiftStandard[] = [
  {
    id: "bench-press",
    name: "Barbell Bench Press",
    maleMultipliers: [0.5, 0.75, 1.05, 1.4, 1.75],
    femaleMultipliers: [0.25, 0.45, 0.65, 0.9, 1.15],
  },
  {
    id: "squat",
    name: "Barbell Back Squat",
    maleMultipliers: [0.65, 1.0, 1.4, 1.85, 2.3],
    femaleMultipliers: [0.4, 0.65, 0.95, 1.3, 1.65],
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    maleMultipliers: [0.8, 1.2, 1.65, 2.15, 2.65],
    femaleMultipliers: [0.5, 0.8, 1.15, 1.55, 1.95],
  },
  {
    id: "overhead-press",
    name: "Overhead Shoulder Press",
    maleMultipliers: [0.35, 0.5, 0.7, 0.92, 1.15],
    femaleMultipliers: [0.2, 0.3, 0.45, 0.62, 0.8],
  },
];

// ==========================================
// 2. KITCHEN, AIR FRYER & INGREDIENT pSEO DATA
// ==========================================
export interface AirFryerItem {
  slug: string;
  name: string;
  category: "Poultry" | "Meat" | "Seafood" | "Vegetables" | "Frozen";
  tempF: number;
  tempC: number;
  timeMin: number;
  timeMax: number;
  shakeHalfway: boolean;
  safeInternalTempF?: number;
  proTip: string;
  searchVolume: string;
}

export const AIR_FRYER_ITEMS: AirFryerItem[] = [
  {
    slug: "chicken-wings",
    name: "Crispy Chicken Wings (Fresh)",
    category: "Poultry",
    tempF: 400,
    tempC: 200,
    timeMin: 18,
    timeMax: 22,
    shakeHalfway: true,
    safeInternalTempF: 165,
    proTip: "Pat completely dry and toss with 1 tsp baking powder per pound for restaurant-level blistered skin.",
    searchVolume: "165,000/mo",
  },
  {
    slug: "chicken-breast",
    name: "Boneless Skinless Chicken Breast",
    category: "Poultry",
    tempF: 380,
    tempC: 193,
    timeMin: 14,
    timeMax: 17,
    shakeHalfway: true,
    safeInternalTempF: 165,
    proTip: "Pull at 160°F and tent with foil for 5 minutes so carryover cooking hits 165°F without drying out.",
    searchVolume: "135,000/mo",
  },
  {
    slug: "salmon-fillet",
    name: "Fresh Salmon Fillet (1-inch thick)",
    category: "Seafood",
    tempF: 400,
    tempC: 200,
    timeMin: 7,
    timeMax: 9,
    shakeHalfway: false,
    safeInternalTempF: 145,
    proTip: "Skin-side down with a light brush of Dijon mustard and avocado oil; no flipping needed.",
    searchVolume: "110,000/mo",
  },
  {
    slug: "thick-cut-bacon",
    name: "Thick-Cut Bacon Strips",
    category: "Meat",
    tempF: 375,
    tempC: 190,
    timeMin: 9,
    timeMax: 11,
    shakeHalfway: false,
    proTip: "Put 2 tablespoons of water under the basket to stop smoking from rendered bacon grease.",
    searchVolume: "98,000/mo",
  },
  {
    slug: "ribeye-steak",
    name: "1-Inch Ribeye or NY Strip Steak",
    category: "Meat",
    tempF: 400,
    tempC: 200,
    timeMin: 10,
    timeMax: 12,
    shakeHalfway: true,
    safeInternalTempF: 135,
    proTip: "Preheat the air fryer basket for 5 full minutes at 400°F before laying the steak inside for a real sear.",
    searchVolume: "82,000/mo",
  },
  {
    slug: "pork-chops",
    name: "Bone-In or Boneless Pork Chops",
    category: "Meat",
    tempF: 390,
    tempC: 199,
    timeMin: 11,
    timeMax: 14,
    shakeHalfway: true,
    safeInternalTempF: 145,
    proTip: "Avoid overcooking past 145°F internal temperature; rest 4 minutes before slicing.",
    searchVolume: "74,000/mo",
  },
  {
    slug: "frozen-french-fries",
    name: "Frozen French Fries (Shoestring or Crinkle)",
    category: "Frozen",
    tempF: 400,
    tempC: 200,
    timeMin: 14,
    timeMax: 16,
    shakeHalfway: true,
    proTip: "Shake vigorously twice during cooking and mist with 1 second of cooking spray for golden crispiness.",
    searchVolume: "142,000/mo",
  },
  {
    slug: "brussels-sprouts",
    name: "Halved Fresh Brussels Sprouts",
    category: "Vegetables",
    tempF: 390,
    tempC: 199,
    timeMin: 12,
    timeMax: 15,
    shakeHalfway: true,
    proTip: "Soak halved sprouts in water for 10 mins first, then drain and oil—steams the inside while charring outer leaves.",
    searchVolume: "68,000/mo",
  },
  {
    slug: "baked-potato",
    name: "Whole Russet Baked Potato",
    category: "Vegetables",
    tempF: 400,
    tempC: 200,
    timeMin: 38,
    timeMax: 45,
    shakeHalfway: true,
    safeInternalTempF: 205,
    proTip: "Pierce 6 times with a fork and rub skin with oil and coarse kosher salt for a steakhouse jacket crust.",
    searchVolume: "91,000/mo",
  },
  {
    slug: "frozen-chicken-nuggets",
    name: "Frozen Chicken Nuggets or Tenders",
    category: "Frozen",
    tempF: 400,
    tempC: 200,
    timeMin: 10,
    timeMax: 12,
    shakeHalfway: true,
    safeInternalTempF: 165,
    proTip: "Arrange in a single layer without overlapping so hot air circulates completely around the breading.",
    searchVolume: "115,000/mo",
  },
  {
    slug: "shrimp",
    name: "Raw Peeled Jumbo Shrimp",
    category: "Seafood",
    tempF: 400,
    tempC: 200,
    timeMin: 6,
    timeMax: 8,
    shakeHalfway: true,
    safeInternalTempF: 145,
    proTip: "As soon as shrimp curl into a 'C' shape and turn opaque pink, remove immediately—'O' shape means overcooked.",
    searchVolume: "62,000/mo",
  },
  {
    slug: "broccoli-florets",
    name: "Fresh Broccoli Florets",
    category: "Vegetables",
    tempF: 380,
    tempC: 193,
    timeMin: 7,
    timeMax: 9,
    shakeHalfway: true,
    proTip: "Toss with 1 tbsp olive oil and garlic powder; add grated Parmesan for the final 60 seconds.",
    searchVolume: "54,000/mo",
  },
];

export interface IngredientDensity {
  id: string;
  name: string;
  gramsPerCup: number;
  gramsPerTbsp: number;
  gramsPerTsp: number;
  notes: string;
}

export const INGREDIENTS: IngredientDensity[] = [
  { id: "all-purpose-flour", name: "All-Purpose Flour (Spooned)", gramsPerCup: 125, gramsPerTbsp: 7.8, gramsPerTsp: 2.6, notes: "Scooping directly with the cup packs flour up to 150g; fluff and spoon for 125g." },
  { id: "bread-flour", name: "Bread Flour", gramsPerCup: 127, gramsPerTbsp: 7.9, gramsPerTsp: 2.6, notes: "Higher protein content makes bread flour slightly denser than all-purpose." },
  { id: "almond-flour", name: "Almond Flour (Finely Sifted)", gramsPerCup: 96, gramsPerTbsp: 6.0, gramsPerTsp: 2.0, notes: "Keep refrigerated for freshness; measure unpacked." },
  { id: "granulated-sugar", name: "Granulated White Sugar", gramsPerCup: 200, gramsPerTbsp: 12.5, gramsPerTsp: 4.2, notes: "Standard benchmark across US and European pastry recipes." },
  { id: "brown-sugar", name: "Packed Brown Sugar", gramsPerCup: 213, gramsPerTbsp: 13.3, gramsPerTsp: 4.4, notes: "Measured firmly packed into the cup so it holds its shape." },
  { id: "powdered-sugar", name: "Powdered / Confectioners Sugar", gramsPerCup: 120, gramsPerTbsp: 7.5, gramsPerTsp: 2.5, notes: "Sift after weighing if making buttercream frosting." },
  { id: "butter", name: "Butter (Salted or Unsalted)", gramsPerCup: 227, gramsPerTbsp: 14.2, gramsPerTsp: 4.7, notes: "1 US Cup = 2 sticks = 16 tablespoons = 227 grams = 8 ounces." },
  { id: "rolled-oats", name: "Old-Fashioned Rolled Oats", gramsPerCup: 90, gramsPerTbsp: 5.6, gramsPerTsp: 1.9, notes: "Quick oats weigh roughly 85g per cup." },
  { id: "honey", name: "Honey / Maple Syrup / Molasses", gramsPerCup: 340, gramsPerTbsp: 21.3, gramsPerTsp: 7.1, notes: "Coat the measuring cup with a drop of oil so honey slides right out." },
  { id: "uncooked-white-rice", name: "Uncooked Long-Grain White Rice", gramsPerCup: 185, gramsPerTbsp: 11.6, gramsPerTsp: 3.9, notes: "1 cup uncooked (185g) yields roughly 3 cups cooked rice." },
  { id: "cocoa-powder", name: "Unsweetened Cocoa Powder", gramsPerCup: 85, gramsPerTbsp: 5.3, gramsPerTsp: 1.8, notes: "Dutch-process and natural cocoa weigh roughly the same unpacked." },
  { id: "milk", name: "Whole Milk / Buttermilk / Water", gramsPerCup: 240, gramsPerTbsp: 15.0, gramsPerTsp: 5.0, notes: "Standard US legal cup is 240 mL." },
];

export interface IngredientConversionPreset {
  slug: string;
  grams: number;
  ingredientId: string;
  searchVolume: string;
}

export const INGREDIENT_CONVERSION_PRESETS: IngredientConversionPreset[] = [
  { slug: "100-grams-flour-to-cups", grams: 100, ingredientId: "all-purpose-flour", searchVolume: "74,000/mo" },
  { slug: "150-grams-flour-to-cups", grams: 150, ingredientId: "all-purpose-flour", searchVolume: "61,000/mo" },
  { slug: "200-grams-flour-to-cups", grams: 200, ingredientId: "all-purpose-flour", searchVolume: "89,000/mo" },
  { slug: "250-grams-flour-to-cups", grams: 250, ingredientId: "all-purpose-flour", searchVolume: "67,000/mo" },
  { slug: "300-grams-flour-to-cups", grams: 300, ingredientId: "all-purpose-flour", searchVolume: "53,000/mo" },
  { slug: "100-grams-sugar-to-cups", grams: 100, ingredientId: "granulated-sugar", searchVolume: "82,000/mo" },
  { slug: "150-grams-sugar-to-cups", grams: 150, ingredientId: "granulated-sugar", searchVolume: "58,000/mo" },
  { slug: "200-grams-sugar-to-cups", grams: 200, ingredientId: "granulated-sugar", searchVolume: "94,000/mo" },
  { slug: "100-grams-butter-to-cups", grams: 100, ingredientId: "butter", searchVolume: "112,000/mo" },
  { slug: "113-grams-butter-to-cups", grams: 113, ingredientId: "butter", searchVolume: "64,000/mo" },
  { slug: "150-grams-butter-to-cups", grams: 150, ingredientId: "butter", searchVolume: "49,000/mo" },
  { slug: "50-grams-oats-to-cups", grams: 50, ingredientId: "rolled-oats", searchVolume: "42,000/mo" },
  { slug: "200-grams-rice-to-cups", grams: 200, ingredientId: "uncooked-white-rice", searchVolume: "47,000/mo" },
];

// ==========================================
// 3. WORK HOURS & SLEEP CYCLE pSEO DATA
// ==========================================
export interface WorkShiftPreset {
  slug: string;
  startTime: string; // HH:mm (24h)
  endTime: string;   // HH:mm (24h)
  breakMinutes: number;
  label: string;
  searchVolume: string;
}

export const WORK_SHIFT_PRESETS: WorkShiftPreset[] = [
  { slug: "8-00-am-to-4-30-pm", startTime: "08:00", endTime: "16:30", breakMinutes: 30, label: "8:00 AM to 4:30 PM", searchVolume: "110,000/mo" },
  { slug: "8-30-am-to-4-30-pm", startTime: "08:30", endTime: "16:30", breakMinutes: 30, label: "8:30 AM to 4:30 PM", searchVolume: "88,000/mo" },
  { slug: "8-30-am-to-5-00-pm", startTime: "08:30", endTime: "17:00", breakMinutes: 30, label: "8:30 AM to 5:00 PM", searchVolume: "135,000/mo" },
  { slug: "9-00-am-to-5-00-pm", startTime: "09:00", endTime: "17:00", breakMinutes: 30, label: "9:00 AM to 5:00 PM", searchVolume: "165,000/mo" },
  { slug: "9-00-am-to-5-30-pm", startTime: "09:00", endTime: "17:30", breakMinutes: 30, label: "9:00 AM to 5:30 PM", searchVolume: "96,000/mo" },
  { slug: "7-00-am-to-3-30-pm", startTime: "07:00", endTime: "15:30", breakMinutes: 30, label: "7:00 AM to 3:30 PM", searchVolume: "92,000/mo" },
  { slug: "6-00-am-to-2-30-pm", startTime: "06:00", endTime: "14:30", breakMinutes: 30, label: "6:00 AM to 2:30 PM", searchVolume: "64,000/mo" },
  { slug: "7-30-am-to-4-00-pm", startTime: "07:30", endTime: "16:00", breakMinutes: 30, label: "7:30 AM to 4:00 PM", searchVolume: "79,000/mo" },
  { slug: "10-00-am-to-6-30-pm", startTime: "10:00", endTime: "18:30", breakMinutes: 30, label: "10:00 AM to 6:30 PM", searchVolume: "54,000/mo" },
];

// ==========================================
// 4. FINAL GRADE & AP SCORE pSEO DATA
// ==========================================
export interface ApExamPreset {
  slug: string;
  name: string;
  mcqCount: number;
  mcqWeightPct: number;
  frqMaxPoints: number;
  frqWeightPct: number;
  cutoffs: [number, number, number, number]; // min % composite for score 2, 3, 4, 5
  searchVolume: string;
}

export const AP_EXAMS: ApExamPreset[] = [
  { slug: "ap-biology", name: "AP Biology", mcqCount: 60, mcqWeightPct: 50, frqMaxPoints: 36, frqWeightPct: 50, cutoffs: [29, 44, 61, 74], searchVolume: "245,000/mo" },
  { slug: "ap-us-history", name: "AP US History (APUSH)", mcqCount: 55, mcqWeightPct: 40, frqMaxPoints: 22, frqWeightPct: 60, cutoffs: [34, 47, 60, 72], searchVolume: "310,000/mo" },
  { slug: "ap-calculus-ab", name: "AP Calculus AB", mcqCount: 45, mcqWeightPct: 50, frqMaxPoints: 54, frqWeightPct: 50, cutoffs: [26, 38, 51, 64], searchVolume: "280,000/mo" },
  { slug: "ap-calculus-bc", name: "AP Calculus BC", mcqCount: 45, mcqWeightPct: 50, frqMaxPoints: 54, frqWeightPct: 50, cutoffs: [24, 35, 48, 59], searchVolume: "195,000/mo" },
  { slug: "ap-chemistry", name: "AP Chemistry", mcqCount: 60, mcqWeightPct: 50, frqMaxPoints: 46, frqWeightPct: 50, cutoffs: [27, 42, 58, 72], searchVolume: "210,000/mo" },
  { slug: "ap-psychology", name: "AP Psychology", mcqCount: 75, mcqWeightPct: 67, frqMaxPoints: 14, frqWeightPct: 33, cutoffs: [35, 48, 62, 75], searchVolume: "230,000/mo" },
  { slug: "ap-world-history", name: "AP World History: Modern", mcqCount: 55, mcqWeightPct: 40, frqMaxPoints: 22, frqWeightPct: 60, cutoffs: [33, 46, 60, 73], searchVolume: "260,000/mo" },
  { slug: "ap-english-language", name: "AP English Language & Comp", mcqCount: 45, mcqWeightPct: 45, frqMaxPoints: 18, frqWeightPct: 55, cutoffs: [36, 51, 64, 76], searchVolume: "185,000/mo" },
  { slug: "ap-computer-science-a", name: "AP Computer Science A", mcqCount: 40, mcqWeightPct: 50, frqMaxPoints: 36, frqWeightPct: 50, cutoffs: [28, 41, 56, 70], searchVolume: "140,000/mo" },
  { slug: "ap-physics-1", name: "AP Physics 1", mcqCount: 40, mcqWeightPct: 50, frqMaxPoints: 40, frqWeightPct: 50, cutoffs: [25, 38, 54, 68], searchVolume: "175,000/mo" },
];

export interface FinalGradePreset {
  slug: string;
  currentGrade: number;
  finalWeight: number;
  targetGrade: number;
  searchVolume: string;
}

export const FINAL_GRADE_PRESETS: FinalGradePreset[] = [
  { slug: "85-percent-with-20-percent-final", currentGrade: 85, finalWeight: 20, targetGrade: 90, searchVolume: "48,000/mo" },
  { slug: "88-percent-with-20-percent-final", currentGrade: 88, finalWeight: 20, targetGrade: 90, searchVolume: "52,000/mo" },
  { slug: "78-percent-with-20-percent-final", currentGrade: 78, finalWeight: 20, targetGrade: 80, searchVolume: "41,000/mo" },
  { slug: "82-percent-with-25-percent-final", currentGrade: 82, finalWeight: 25, targetGrade: 85, searchVolume: "36,000/mo" },
  { slug: "91-percent-with-15-percent-final", currentGrade: 91, finalWeight: 15, targetGrade: 90, searchVolume: "44,000/mo" },
  { slug: "74-percent-with-30-percent-final", currentGrade: 74, finalWeight: 30, targetGrade: 80, searchVolume: "33,000/mo" },
];

// ==========================================
// 5. COPY-PASTE TEXT, UNICODE & WORD COUNT pSEO DATA
// ==========================================
export interface WordCountPreset {
  slug: string;
  words: number;
  searchVolume: string;
}

export const WORD_COUNT_PRESETS: WordCountPreset[] = [
  { slug: "250-words-speaking-time", words: 250, searchVolume: "38,000/mo" },
  { slug: "500-words-speaking-time", words: 500, searchVolume: "92,000/mo" },
  { slug: "750-words-speaking-time", words: 750, searchVolume: "54,000/mo" },
  { slug: "1000-words-speaking-time", words: 1000, searchVolume: "118,000/mo" },
  { slug: "1500-words-speaking-time", words: 1500, searchVolume: "84,000/mo" },
  { slug: "2000-words-speaking-time", words: 2000, searchVolume: "76,000/mo" },
  { slug: "2500-words-speaking-time", words: 2500, searchVolume: "49,000/mo" },
  { slug: "3000-words-speaking-time", words: 3000, searchVolume: "61,000/mo" },
  { slug: "5000-words-speaking-time", words: 5000, searchVolume: "43,000/mo" },
];

export const COPY_SYMBOLS = [
  { category: "Invisible & Blank Characters", items: [
    { char: "\u2800", name: "Braille Blank (Works in Discord/Fortnite/TikTok)", code: "U+2800" },
    { char: "\u3164", name: "Hangul Filler Invisible Space (Among Us / Gaming)", code: "U+3164" },
    { char: "\u200B", name: "Zero-Width Space", code: "U+200B" },
  ]},
  { category: "Aesthetic Stars & Sparkles", items: [
    { char: "✨", name: "Sparkles", code: "U+2728" },
    { char: "★", name: "Black Star", code: "U+2605" },
    { char: "☆", name: "White Star", code: "U+2606" },
    { char: "✦", name: "Black Four Pointed Star", code: "U+2726" },
    { char: "✧", name: "White Four Pointed Star", code: "U+2727" },
    { char: "✩", name: "Stress Outlined Star", code: "U+2729" },
    { char: "✪", name: "Circled White Star", code: "U+272A" },
    { char: "⋆", name: "Mini Star Operator", code: "U+22C6" },
  ]},
  { category: "Arrows & Dividers", items: [
    { char: "→", name: "Right Arrow", code: "U+2192" },
    { char: "←", name: "Left Arrow", code: "U+2190" },
    { char: "↗", name: "North East Arrow", code: "U+2197" },
    { char: "⟶", name: "Long Right Arrow", code: "U+27F6" },
    { char: "»", name: "Double Angle Quote", code: "U+00BB" },
    { char: "⎯⎯⎯⎯⎯", name: "Aesthetic Bio Line", code: "LINE" },
    { char: "•", name: "Bullet Point", code: "U+2022" },
    { char: "✓", name: "Checkmark", code: "U+2713" },
  ]},
  { category: "Kaomoji & Faces", items: [
    { char: "¯\\_(ツ)_/¯", name: "Shrug Face", code: "SHRUG" },
    { char: "( ͡° ͜ʖ ͡°)", name: "Lenny Face", code: "LENNY" },
    { char: "(╯°□°）╯︵ ┻━┻", name: "Table Flip", code: "FLIP" },
    { char: "༼ つ ◕_◕ ༽つ", name: "Give Energy", code: "GIVE" },
    { char: "(◕‿◕✿)", name: "Cute Flower Face", code: "CUTE" },
    { char: "♡", name: "Outline Heart", code: "U+2661" },
  ]},
];

// ==========================================
// 6. WORD SOLVERS & SPIN WHEELS pSEO DATA
// ==========================================
export interface WheelPreset {
  slug: string;
  title: string;
  description: string;
  searchVolume: string;
  items: string[];
}

export const WHEEL_PRESETS: WheelPreset[] = [
  {
    slug: "what-to-eat-for-dinner",
    title: "What to Eat for Dinner Wheel",
    description: "Can't decide what to cook or order tonight? Spin the dinner decision wheel!",
    searchVolume: "210,000/mo",
    items: ["Tacos & Quesadillas", "Wood-Fired Pizza", "Thai Pad See Ew", "Burgers & Fries", "Sushi Rolls", "Chicken Alfredo Pasta", "Indian Butter Chicken", "Crispy Air Fryer Wings", "Ramen Bowls", "Mediterranean Gyro"],
  },
  {
    slug: "yes-or-no-wheel",
    title: "Yes or No Decision Wheel",
    description: "Instant 50/50 random decision maker with optional 'Maybe / Ask Again' mode.",
    searchVolume: "340,000/mo",
    items: ["YES ✅", "NO ❌", "YES ✅", "NO ❌", "100% YES 🔥", "DEFINITELY NO 🛑", "YES ✅", "NO ❌"],
  },
  {
    slug: "truth-or-dare-wheel",
    title: "Truth or Dare Party Wheel",
    description: "Spin for high-energy party prompts that work for game night, streams, or friends.",
    searchVolume: "145,000/mo",
    items: [
      "TRUTH: Most embarrassing text sent?",
      "DARE: Let the group write a status!",
      "TRUTH: Biggest irrational fear?",
      "DARE: Speak in an accent for 2 rounds!",
      "TRUTH: Last thing you searched on Google?",
      "DARE: Show your camera roll's 5th photo!",
      "TRUTH: Worst date story?",
      "DARE: Do 15 pushups right now!",
    ],
  },
  {
    slug: "movie-night-genre-wheel",
    title: "Movie Night Genre Picker Wheel",
    description: "End the 45-minute Netflix scrolling battle in one spin.",
    searchVolume: "88,000/mo",
    items: ["Mind-Bending Sci-Fi", "90s Action Thriller", "Psychological Horror", "A24 Indie Drama", "Stand-Up Comedy Special", "Heist / Crime Caper", "Animated Classic", "Whodunit Mystery"],
  },
];

export interface WordPatternPreset {
  slug: string;
  label: string;
  startsWith: string;
  endsWith: string;
  contains: string;
  searchVolume: string;
}

export const WORD_PATTERN_PRESETS: WordPatternPreset[] = [
  { slug: "5-letter-words-starting-with-st", label: "5-Letter Words Starting with ST", startsWith: "ST", endsWith: "", contains: "", searchVolume: "165,000/mo" },
  { slug: "5-letter-words-ending-in-e", label: "5-Letter Words Ending in E", startsWith: "", endsWith: "E", contains: "", searchVolume: "240,000/mo" },
  { slug: "5-letter-words-starting-with-cr", label: "5-Letter Words Starting with CR", startsWith: "CR", endsWith: "", contains: "", searchVolume: "110,000/mo" },
  { slug: "5-letter-words-ending-in-er", label: "5-Letter Words Ending in ER", startsWith: "", endsWith: "ER", contains: "", searchVolume: "190,000/mo" },
  { slug: "5-letter-words-containing-qu", label: "5-Letter Words Containing QU", startsWith: "", endsWith: "", contains: "QU", searchVolume: "95,000/mo" },
  { slug: "5-letter-words-starting-with-sh", label: "5-Letter Words Starting with SH", startsWith: "SH", endsWith: "", contains: "", searchVolume: "130,000/mo" },
  { slug: "5-letter-words-ending-in-y", label: "5-Letter Words Ending in Y", startsWith: "", endsWith: "Y", contains: "", searchVolume: "155,000/mo" },
];

export const FIVE_LETTER_DICTIONARY: string[] = [
  "ABOUT","ABOVE","ABUSE","ACTOR","ACUTE","ADMIT","ADOPT","ADULT","AFTER","AGAIN",
  "AGENT","AGREE","AHEAD","ALARM","ALBUM","ALERT","ALIEN","ALIGN","ALIKE","ALIVE",
  "ALLOW","ALONE","ALONG","ALTER","AMONG","ANGER","ANGLE","ANGRY","APART","APPLE",
  "APPLY","ARENA","ARGUE","ARISE","ARRAY","ASIDE","ASSET","AUDIO","AUDIT","AVOID",
  "AWARD","AWARE","BADLY","BAKER","BASES","BASIC","BASIS","BEACH","BEGAN","BEGIN",
  "BEGUN","BEING","BELOW","BENCH","BILLY","BIRTH","BLACK","BLAME","BLIND","BLOCK",
  "BLOOD","BOARD","BOOST","BOOTH","BOUND","BRAIN","BRAND","BREAD","BREAK","BREED",
  "BRIEF","BRING","BROAD","BROKE","BROWN","BUILD","BUILT","BUYER","CABLE","CALIF",
  "CARRY","CATCH","CAUSE","CHAIN","CHAIR","CHART","CHASE","CHEAP","CHECK","CHEST",
  "CHIEF","CHILD","CHINA","CHOSE","CIVIL","CLAIM","CLASS","CLEAN","CLEAR","CLICK",
  "CLOCK","CLOSE","COACH","COAST","COULD","COUNT","COURT","COVER","CRAFT","CRASH",
  "CRAZE","CRAZY","CREAM","CRIME","CRISP","CROSS","CROWD","CROWN","CRANE","CRATE",
  "CRUST","CURVE","CYCLE","DAILY","DANCE","DATED","DEALT","DEATH","DEBUT","DELAY",
  "DEPTH","DOING","DOUBT","DOZEN","DRAFT","DRAMA","DRAWN","DREAM","DRESS","DRILL",
  "DRINK","DRIVE","DROVE","DYING","EAGER","EARLY","EARTH","EIGHT","ELITE","EMPTY",
  "ENEMY","ENJOY","ENTER","ENTRY","EQUAL","ERROR","EVENT","EVERY","EXACT","EXIST",
  "EXTRA","FAITH","FALSE","FAULT","FIBER","FIELD","FIFTH","FIFTY","FIGHT","FINAL",
  "FIRST","FIXED","FLASH","FLEET","FLOOR","FLUID","FOCUS","FORCE","FORTH","FORTY",
  "FORUM","FOUND","FRAME","FRANK","FRAUD","FRESH","FRONT","FRUIT","FULLY","FUNNY",
  "GIANT","GIVEN","GLASS","GLOBE","GOING","GRACE","GRADE","GRAND","GRANT","GRASS",
  "GRAVE","GREAT","GREEN","GROSS","GROUP","GROWN","GUARD","GUESS","GUEST","GUIDE",
  "HAPPY","HARRY","HEART","HEAVY","HENCE","HENRY","HORSE","HOTEL","HOUSE","HUMAN",
  "IDEAL","IMAGE","INDEX","INNER","INPUT","ISSUE","JAPAN","JIMMY","JOINT","JONES",
  "JUDGE","KNOWN","LABEL","LARGE","LASER","LATER","LAUGH","LAYER","LEARN","LEASE",
  "LEAST","LEAVE","LEGAL","LEVEL","LEWIS","LIGHT","LIMIT","LINKS","LIVES","LOCAL",
  "LOGIC","LOOSE","LOWER","LUCKY","LUNCH","LYING","MAGIC","MAJOR","MAKER","MARCH",
  "MARIA","MATCH","MAYBE","MAYOR","MEANT","MEDIA","METAL","MIGHT","MINOR","MINUS",
  "MIXED","MODEL","MONEY","MONTH","MORAL","MOTOR","MOUNT","MOUSE","MOUTH","MOVIE",
  "MUSIC","NEEDS","NEVER","NEWLY","NIGHT","NOISE","NORTH","NOTED","NOVEL","NURSE",
  "OCCUR","OCEAN","OFFER","OFTEN","ORDER","OTHER","OUGHT","PAINT","PANEL","PAPER",
  "PARTY","PEACE","PETER","PHASE","PHONE","PHOTO","PIECE","PILOT","PITCH","PLACE",
  "PLAIN","PLANE","PLANT","PLATE","POINT","POUND","POWER","PRESS","PRICE","PRIDE",
  "PRIME","PRINT","PRIOR","PRIZE","PROOF","PROUD","PROVE","QUEEN","QUICK","QUIET",
  "QUITE","QUOTE","QUACK","QUALM","QUART","QUASH","QUEST","QUEUE","QUIRK","QUOTA",
  "RADIO","RAISE","RANGE","RAPID","RATIO","REACH","READY","REFER","RIGHT","RIVAL",
  "RIVER","ROBIN","ROGER","ROMAN","ROUGH","ROUND","ROUTE","ROYAL","RURAL","SCALE",
  "SCENE","SCOPE","SCORE","SENSE","SERVE","SEVEN","SHALL","SHAPE","SHARE","SHARP",
  "SHEET","SHELF","SHELL","SHIFT","SHIRT","SHOCK","SHOOT","SHORT","SHOWN","SIGHT",
  "SINCE","SIXTH","SIXTY","SIZED","SKILL","SLEEP","SLIDE","SMALL","SMART","SMILE",
  "SMITH","SMOKE","SOLID","SOLVE","SORRY","SOUND","SOUTH","SPACE","SPARE","SPEAK",
  "SPEED","SPEND","SPENT","SPLIT","SPOKE","SPORT","STAFF","STAGE","STAKE","STAND",
  "START","STATE","STEAM","STEEL","STEEP","STEER","STERN","STICK","STILL","STOCK",
  "STONE","STOOD","STORE","STORM","STORY","STOVE","STRAP","STRAW","STRIP","STUCK",
  "STUDY","STUFF","STYLE","SUGAR","SUITE","SUPER","SWEET","TABLE","TAKEN","TASTE",
  "TAXES","TEACH","TEETH","TERRY","TEXAS","THANK","THEFT","THEIR","THEME","THERE",
  "THESE","THICK","THING","THINK","THIRD","THOSE","THREE","THREW","THROW","TIGHT",
  "TIMES","TIRED","TITLE","TODAY","TOPIC","TOTAL","TOUCH","TOUGH","TOWER","TRACK",
  "TRADE","TRAIN","TREAT","TREND","TRIAL","TRIED","TRIES","TRUCK","TRULY","TRUST",
  "TRUTH","TWICE","UNDER","UNDUE","UNION","UNITY","UNTIL","UPPER","UPSET","URBAN",
  "USAGE","USUAL","VALID","VALUE","VIDEO","VIRUS","VISIT","VITAL","VOICE","WASTE",
  "WATCH","WATER","WHEEL","WHERE","WHICH","WHILE","WHITE","WHOLE","WHOSE","WOMAN",
  "WOMEN","WORLD","WORRY","WORSE","WORST","WORTH","WOULD","WOUND","WRITE","WRONG",
  "WROTE","YIELD","YOUNG","YOUTH"
];
