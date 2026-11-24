/**
 * Project Showcase Data
 *
 * Each project contains metadata for presentation within the horizontal showcase.
 */
export const showcaseIntro = {
  eyebrow: "POINTFEX / SELECTED WORK",
  headlineLine1: "Digital experiences.",
  headlineLine2: "Built to matter.",
  description: "We design and develop distinctive digital experiences that help ambitious brands stand out, connect, and grow.",
  scrollIndicator: "SCROLL TO EXPLORE →",
};

export const projectsData = [
  {
    id: "mamladibe",
    name: "Mamladibe",
    category: "Civic Platform & Live Incident Map",
    year: "2026",
    description: "Anonymous civic road-safety and incident reporting platform featuring a live Dhaka map, real-time alerts, and community tracking.",
    imageUrl: "/projects/mamladibe.jpg",
    destinationUrl: "https://mamladibe.pointfex.com/",
    altText: "Mamladibe civic road safety and live Dhaka incident map preview",
    aspectRatio: "16 / 10",
  },
  {
    id: "chelebela",
    name: "Chelebela Score",
    category: "Interactive Nostalgia & Quiz Experience",
    year: "2026",
    description: "Retro 1990–2009 Bangladeshi childhood nostalgia experience featuring 180 curated memories, CRT TV interactions, and shareable score cards.",
    imageUrl: "/projects/chelebela.jpg",
    destinationUrl: "https://chelebela.pointfex.com/",
    altText: "Chelebela Score retro Bangladeshi childhood quiz preview",
    aspectRatio: "16 / 10",
  },
  {
    id: "pera-nai-chill",
    name: "Pera Nai Chill!",
    category: "Web Game & Cartoon Action Runner",
    year: "2026",
    description: "Fast-paced Dhaka satire endless runner built for the browser with punchy arcade visuals, custom artwork, and instant tap-to-play action.",
    imageUrl: "/projects/pera-nai-chill.jpg",
    destinationUrl: "https://pera-nai-chill.pointfex.com/",
    altText: "Pera Nai Chill Dhaka satire cartoon runner game preview",
    aspectRatio: "16 / 10",
  },
  {
    id: "petukbangla",
    name: "Petuk Bangla",
    category: "Interactive Culinary Map & Community",
    year: "2026",
    description: "Interactive Bangladesh food discovery platform mapping regional dishes and local street-food stories across all 64 districts.",
    imageUrl: "/projects/petukbangla.jpg",
    destinationUrl: "https://petukbangla.pointfex.com/",
    altText: "Petuk Bangla interactive Bangladesh food map preview",
    aspectRatio: "16 / 10",
  },
];

const PROJECT_ORDER_STORAGE_KEY = "pointfex_project_order";
let cachedShuffledProjects = null;

/**
 * Returns a shuffled copy of `projectsData` once per page load.
 * Combines Fisher-Yates randomization with last-order tracking in localStorage
 * so the first project and overall placement always change on every reload.
 */
export function getShuffledProjects() {
  if (cachedShuffledProjects) {
    return cachedShuffledProjects;
  }

  const list = [...projectsData];
  let previousFirstId = null;
  let previousOrder = null;

  try {
    const raw = window.localStorage.getItem(PROJECT_ORDER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        previousOrder = parsed;
        previousFirstId = parsed[0];
      }
    }
  } catch {
    // Ignore storage errors (e.g. private mode or SSR)
  }

  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }

  // Ensure the first card is never the same as the previous page load
  if (list.length > 1 && previousFirstId && list[0].id === previousFirstId) {
    const swapIndex = 1 + Math.floor(Math.random() * (list.length - 1));
    [list[0], list[swapIndex]] = [list[swapIndex], list[0]];
  }

  // Extra guard: if the full sequence still matches the previous order, rotate
  if (
    list.length > 1 &&
    previousOrder &&
    previousOrder.length === list.length &&
    list.every((item, idx) => item.id === previousOrder[idx])
  ) {
    const first = list.shift();
    list.push(first);
  }

  try {
    window.localStorage.setItem(
      PROJECT_ORDER_STORAGE_KEY,
      JSON.stringify(list.map((item) => item.id))
    );
  } catch {
    // Ignore storage errors
  }

  cachedShuffledProjects = list;
  return cachedShuffledProjects;
}
