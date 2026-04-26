export type Subject = {
  slug: string;
  name: string;
  color: string;
  icon: string;
  module: ModuleKey;
  topics: Topic[];
};
export type Topic = {
  slug: string;
  name: string;
  mastery: number;
  questions: number;
};
export type MCQ = {
  id: string;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type ModuleKey = "mdcat" | "ecat" | "nts" | "net" | "css";

export const modules: Record<ModuleKey, { name: string; tone: string; accentClass: string; description: string }> = {
  mdcat: { name: "MDCAT", tone: "Caring · Medical", accentClass: "module-mdcat", description: "Medical college admission test prep." },
  ecat:  { name: "ECAT",  tone: "Focused · Engineering", accentClass: "module-ecat",  description: "Engineering college admission test prep." },
  nts:   { name: "NTS",   tone: "Academic · Trusting",  accentClass: "module-nts",   description: "National testing service prep." },
  net:   { name: "NUST NET", tone: "Premium · STEM",     accentClass: "module-net",   description: "NUST entrance test, modular by part." },
  css:   { name: "CSS",   tone: "Prestige · Civil",     accentClass: "module-css",   description: "Central superior services exam." },
};

export const subjects: Subject[] = [
  {
    slug: "biology", name: "Biology", color: "oklch(0.55 0.18 25)", icon: "🧬", module: "mdcat",
    topics: [
      { slug: "cell-biology", name: "Cell Biology", mastery: 78, questions: 240 },
      { slug: "genetics", name: "Genetics & Inheritance", mastery: 54, questions: 180 },
      { slug: "human-physiology", name: "Human Physiology", mastery: 42, questions: 320 },
      { slug: "ecology", name: "Ecology", mastery: 88, questions: 120 },
      { slug: "biotechnology", name: "Biotechnology", mastery: 35, questions: 140 },
    ],
  },
  {
    slug: "chemistry", name: "Chemistry", color: "oklch(0.5 0.17 200)", icon: "⚗️", module: "ecat",
    topics: [
      { slug: "atomic-structure", name: "Atomic Structure", mastery: 65, questions: 200 },
      { slug: "chemical-bonding", name: "Chemical Bonding", mastery: 71, questions: 180 },
      { slug: "organic", name: "Organic Chemistry", mastery: 38, questions: 280 },
      { slug: "thermodynamics", name: "Thermodynamics", mastery: 50, questions: 160 },
    ],
  },
  {
    slug: "physics", name: "Physics", color: "oklch(0.5 0.17 200)", icon: "⚛️", module: "ecat",
    topics: [
      { slug: "mechanics", name: "Mechanics", mastery: 72, questions: 260 },
      { slug: "electricity", name: "Electricity & Magnetism", mastery: 48, questions: 220 },
      { slug: "waves", name: "Waves & Optics", mastery: 60, questions: 180 },
      { slug: "modern-physics", name: "Modern Physics", mastery: 30, questions: 140 },
    ],
  },
  {
    slug: "english", name: "English", color: "oklch(0.5 0.16 290)", icon: "📘", module: "nts",
    topics: [
      { slug: "grammar", name: "Grammar", mastery: 82, questions: 200 },
      { slug: "vocabulary", name: "Vocabulary", mastery: 70, questions: 300 },
      { slug: "comprehension", name: "Comprehension", mastery: 64, questions: 120 },
    ],
  },
  {
    slug: "logical-reasoning", name: "Logical Reasoning", color: "oklch(0.5 0.16 290)", icon: "🧠", module: "nts",
    topics: [
      { slug: "analytical", name: "Analytical Reasoning", mastery: 58, questions: 160 },
      { slug: "verbal", name: "Verbal Reasoning", mastery: 66, questions: 140 },
    ],
  },
];

export const mcqBank: Record<string, MCQ[]> = {
  "cell-biology": [
    { id: "cb1", topic: "cell-biology", question: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"], answer: 1, explanation: "Mitochondria produce ATP through cellular respiration, hence 'powerhouse'." },
    { id: "cb2", topic: "cell-biology", question: "The fluid mosaic model describes the structure of:", options: ["DNA", "Cell membrane", "Ribosomes", "Chloroplasts"], answer: 1, explanation: "Singer & Nicolson's model describes the plasma membrane as a fluid lipid bilayer with embedded proteins." },
    { id: "cb3", topic: "cell-biology", question: "Which of the following is NOT found in a prokaryotic cell?", options: ["Cell wall", "Ribosomes", "Mitochondria", "Plasmid"], answer: 2, explanation: "Prokaryotes lack membrane-bound organelles like mitochondria." },
    { id: "cb4", topic: "cell-biology", question: "Lysosomes are formed by:", options: ["RER", "SER", "Golgi apparatus", "Mitochondria"], answer: 2, explanation: "Lysosomes bud off from the Golgi apparatus and contain hydrolytic enzymes." },
    { id: "cb5", topic: "cell-biology", question: "Cytoskeleton is made of:", options: ["Microtubules only", "Microfilaments only", "Microtubules, microfilaments, intermediate filaments", "Cellulose"], answer: 2, explanation: "All three filament types together form the cytoskeleton." },
  ],
  "genetics": [
    { id: "g1", topic: "genetics", question: "A test cross is performed between:", options: ["Two heterozygotes", "Homozygous dominant and recessive", "Unknown genotype and homozygous recessive", "Two homozygous recessives"], answer: 2, explanation: "A test cross uses a homozygous recessive parent to determine the genotype of the unknown." },
    { id: "g2", topic: "genetics", question: "Down syndrome is caused by:", options: ["Trisomy 21", "Monosomy X", "Trisomy 18", "Trisomy 13"], answer: 0, explanation: "An extra copy of chromosome 21 causes Down syndrome." },
    { id: "g3", topic: "genetics", question: "DNA replication is:", options: ["Conservative", "Semi-conservative", "Dispersive", "Random"], answer: 1, explanation: "Meselson and Stahl's experiment proved DNA replication is semi-conservative." },
  ],
  "human-physiology": [
    { id: "hp1", topic: "human-physiology", question: "The pacemaker of the heart is:", options: ["AV node", "SA node", "Bundle of His", "Purkinje fibers"], answer: 1, explanation: "The SA (sinoatrial) node initiates the heartbeat." },
    { id: "hp2", topic: "human-physiology", question: "Insulin is secreted by:", options: ["Alpha cells", "Beta cells", "Delta cells", "Acinar cells"], answer: 1, explanation: "Beta cells of the islets of Langerhans secrete insulin." },
    { id: "hp3", topic: "human-physiology", question: "The functional unit of the kidney is:", options: ["Neuron", "Nephron", "Alveolus", "Hepatocyte"], answer: 1, explanation: "The nephron filters blood and produces urine." },
  ],
  "ecology": [
    { id: "e1", topic: "ecology", question: "The 10% law of energy transfer was proposed by:", options: ["Lindeman", "Odum", "Tansley", "Darwin"], answer: 0, explanation: "Lindeman proposed that only ~10% of energy moves between trophic levels." },
  ],
  "biotechnology": [
    { id: "b1", topic: "biotechnology", question: "PCR is used to:", options: ["Sequence DNA", "Amplify DNA", "Cut DNA", "Translate DNA"], answer: 1, explanation: "Polymerase Chain Reaction amplifies specific DNA sequences." },
  ],
  "atomic-structure": [
    { id: "as1", topic: "atomic-structure", question: "The maximum number of electrons in the M shell is:", options: ["8", "18", "32", "2"], answer: 1, explanation: "M shell (n=3) holds 2n² = 18 electrons." },
    { id: "as2", topic: "atomic-structure", question: "Isotopes differ in:", options: ["Number of protons", "Number of neutrons", "Number of electrons", "Atomic number"], answer: 1, explanation: "Isotopes have the same atomic number but different mass numbers due to neutron count." },
  ],
  "chemical-bonding": [
    { id: "cbo1", topic: "chemical-bonding", question: "Which has the strongest hydrogen bonding?", options: ["HCl", "HF", "HBr", "HI"], answer: 1, explanation: "HF has the strongest H-bonding due to fluorine's high electronegativity." },
  ],
  "organic": [
    { id: "o1", topic: "organic", question: "Markovnikov's rule applies to:", options: ["Symmetrical alkenes", "Unsymmetrical alkenes with HX", "Alkanes", "Aromatic compounds"], answer: 1, explanation: "The H of HX attaches to the carbon with more H atoms." },
    { id: "o2", topic: "organic", question: "The functional group of an aldehyde is:", options: ["-COOH", "-CHO", "-OH", "-NH2"], answer: 1, explanation: "Aldehydes contain a -CHO group." },
  ],
  "thermodynamics": [
    { id: "t1", topic: "thermodynamics", question: "ΔG = ΔH − TΔS. A reaction is spontaneous when:", options: ["ΔG > 0", "ΔG = 0", "ΔG < 0", "ΔH < 0"], answer: 2, explanation: "Negative Gibbs free energy means a spontaneous reaction." },
  ],
  "mechanics": [
    { id: "m1", topic: "mechanics", question: "A body moving with constant velocity has:", options: ["Zero acceleration", "Constant acceleration", "Increasing acceleration", "Negative acceleration"], answer: 0, explanation: "Constant velocity = zero net force = zero acceleration." },
    { id: "m2", topic: "mechanics", question: "The SI unit of force is:", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2, explanation: "1 N = 1 kg·m/s²." },
    { id: "m3", topic: "mechanics", question: "Escape velocity from Earth is approximately:", options: ["7.9 km/s", "11.2 km/s", "9.8 m/s", "3.0 × 10⁸ m/s"], answer: 1, explanation: "Escape velocity from Earth's surface is ~11.2 km/s." },
  ],
  "electricity": [
    { id: "el1", topic: "electricity", question: "Ohm's law states:", options: ["V = IR", "P = VI", "F = ma", "E = mc²"], answer: 0, explanation: "Voltage = Current × Resistance, when temperature is constant." },
  ],
  "waves": [
    { id: "w1", topic: "waves", question: "Sound cannot travel through:", options: ["Solid", "Liquid", "Gas", "Vacuum"], answer: 3, explanation: "Sound requires a medium to propagate." },
  ],
  "modern-physics": [
    { id: "mp1", topic: "modern-physics", question: "Photoelectric effect was explained by:", options: ["Newton", "Einstein", "Bohr", "Planck"], answer: 1, explanation: "Einstein won the 1921 Nobel Prize for explaining the photoelectric effect using quanta." },
  ],
  "grammar": [
    { id: "gr1", topic: "grammar", question: "Choose the correct sentence:", options: ["He don't like tea", "He doesn't likes tea", "He doesn't like tea", "He not like tea"], answer: 2, explanation: "Subject-verb agreement: 'doesn't' is followed by the base form 'like'." },
  ],
  "vocabulary": [
    { id: "v1", topic: "vocabulary", question: "Synonym of 'ephemeral':", options: ["Eternal", "Short-lived", "Strong", "Beautiful"], answer: 1, explanation: "Ephemeral means lasting for a very short time." },
  ],
  "comprehension": [
    { id: "c1", topic: "comprehension", question: "The main idea of a passage is best identified by:", options: ["The first sentence", "The last sentence", "The recurring theme across paragraphs", "Words in italics"], answer: 2, explanation: "Look for the unifying theme repeated throughout, not just one sentence." },
  ],
  "analytical": [
    { id: "a1", topic: "analytical", question: "If A > B and B > C, then:", options: ["A < C", "A = C", "A > C", "Cannot determine"], answer: 2, explanation: "Transitive property: A > B > C implies A > C." },
  ],
  "verbal": [
    { id: "vr1", topic: "verbal", question: "Pen is to writer as ___ is to painter.", options: ["Canvas", "Brush", "Color", "Frame"], answer: 1, explanation: "A brush is the painter's tool, like a pen is the writer's tool." },
  ],
};

export function getMCQs(topic: string): MCQ[] { return mcqBank[topic] || []; }
export function getSubject(slug: string) { return subjects.find((s) => s.slug === slug); }
export function getTopic(subjectSlug: string, topicSlug: string) { return getSubject(subjectSlug)?.topics.find((t) => t.slug === topicSlug); }
export function allMCQs(): MCQ[] { return Object.values(mcqBank).flat(); }

// Spaced repetition / daily review queue — keeps knowledge alive
export type ReviewItem = { topicSlug: string; topicName: string; subject: string; lastSeen: string; dueIn: string; questions: number };
export const dailyReview: { totalMinutes: number; items: ReviewItem[] } = {
  totalMinutes: 12,
  items: [
    { topicSlug: "cell-biology", topicName: "Cell Biology", subject: "Biology", lastSeen: "3 days ago", dueIn: "Today", questions: 5 },
    { topicSlug: "mechanics", topicName: "Mechanics", subject: "Physics", lastSeen: "5 days ago", dueIn: "Today", questions: 4 },
    { topicSlug: "organic", topicName: "Organic Chemistry", subject: "Chemistry", lastSeen: "1 week ago", dueIn: "Today", questions: 6 },
    { topicSlug: "grammar", topicName: "Grammar", subject: "English", lastSeen: "4 days ago", dueIn: "Tomorrow", questions: 3 },
  ],
};

// Past papers — by year
export type PastPaper = { year: number; module: ModuleKey; questions: number; attempts: number; topQuestions: string[] };
export const pastPapers: PastPaper[] = [
  { year: 2024, module: "mdcat", questions: 200, attempts: 4821, topQuestions: ["Cell Biology", "Genetics", "Mechanics"] },
  { year: 2023, module: "mdcat", questions: 200, attempts: 12480, topQuestions: ["Physiology", "Organic", "Optics"] },
  { year: 2022, module: "mdcat", questions: 200, attempts: 18290, topQuestions: ["Biotech", "Bonding", "Waves"] },
  { year: 2021, module: "mdcat", questions: 200, attempts: 24105, topQuestions: ["Ecology", "Thermodynamics", "Modern"] },
  { year: 2024, module: "ecat", questions: 100, attempts: 3210, topQuestions: ["Mechanics", "Bonding", "Calculus"] },
  { year: 2023, module: "ecat", questions: 100, attempts: 9874, topQuestions: ["Optics", "Organic", "Algebra"] },
  { year: 2024, module: "nts", questions: 100, attempts: 5610, topQuestions: ["Verbal", "Quant", "Analytical"] },
  { year: 2023, module: "net", questions: 200, attempts: 7402, topQuestions: ["Physics", "Maths", "English"] },
];

// Leaderboard
export type LeaderboardEntry = { rank: number; name: string; city: string; score: number; streak: number; isYou?: boolean };
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Aisha Khan", city: "Lahore", score: 982, streak: 67 },
  { rank: 2, name: "Hamza Sheikh", city: "Karachi", score: 974, streak: 45 },
  { rank: 3, name: "Fatima Ali", city: "Islamabad", score: 968, streak: 89 },
  { rank: 4, name: "Bilal Ahmed", city: "Peshawar", score: 951, streak: 32 },
  { rank: 5, name: "Zara Naveed", city: "Multan", score: 943, streak: 51 },
  { rank: 6, name: "Usman Tariq", city: "Faisalabad", score: 938, streak: 28 },
  { rank: 7, name: "Maryam Shah", city: "Quetta", score: 925, streak: 41 },
  { rank: 287, name: "You", city: "Lahore", score: 742, streak: 12, isYou: true },
];

export const studentStats = {
  predictedScore: 742,
  targetScore: 850,
  streak: 12,
  studyMinutesToday: 87,
  weeklyGoalMinutes: 600,
  weeklyMinutes: 412,
  rank: 287,
  totalStudents: 4821,
  recentActivity: [
    { topic: "Cell Biology", score: "8/10", time: "2h ago" },
    { topic: "Mechanics", score: "7/10", time: "Yesterday" },
    { topic: "Organic Chemistry", score: "5/10", time: "Yesterday" },
    { topic: "Grammar", score: "10/10", time: "2 days ago" },
  ],
  scoreTrend: [620, 645, 660, 680, 695, 710, 725, 742],
  // Predicted-score breakdown
  breakdown: {
    formula: "Weighted accuracy across last 30 quizzes × subject weight in MDCAT × consistency bonus",
    subjectScores: [
      { subject: "Biology", weight: 45, accuracy: 74, contribution: 333 },
      { subject: "Chemistry", weight: 25, accuracy: 58, contribution: 145 },
      { subject: "Physics", weight: 20, accuracy: 62, contribution: 124 },
      { subject: "English", weight: 10, accuracy: 80, contribution: 80 },
    ],
    bonus: 60,
    strengths: ["Ecology (88%)", "Grammar (82%)", "Cell Biology (78%)"],
    weaknesses: ["Modern Physics (30%)", "Biotechnology (35%)", "Organic Chemistry (38%)"],
    confidence: 0.84,
  },
};
