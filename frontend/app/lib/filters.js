// The filter options from the Figma "Filters" sheet, and how each one
// decides which trails / blogs to show on the results page.

// Turns "How to pack?" and "how to pack" into the same text,
// so small differences in the Supabase category names don't matter.
function simplify(text = "") {
  return text.toLowerCase().replace(/[^a-z]/g, "");
}

export const trailFilters = [
  {
    label: "Period - friendly",
    // TODO: needs a column in the trails table (e.g. period_friendly)
    matches: () => true,
  },
  {
    label: "Group hikes",
    // TODO: needs a column in the trails table (e.g. group_friendly)
    matches: () => true,
  },
  {
    label: "Beginner friendly",
    matches: (trail) => trail.level?.toLowerCase() === "easy",
  },
  {
    label: "Solo hiking",
    // TODO: needs a column in the trails table (e.g. solo_friendly)
    matches: () => true,
  },
];

export const blogFilters = [
  "Period problems",
  "Get ready for hiking",
  "How to pack?",
  "Gear and clothing",
].map((label) => ({
  label,
  matches: (blog) => simplify(blog.category).includes(simplify(label)),
}));

// Builds the results address, e.g. /results?trail=Beginner+friendly&blog=How+to+pack%3F
export function resultsUrl(selectedTrails, selectedBlogs) {
  const params = new URLSearchParams();
  selectedTrails.forEach((label) => params.append("trail", label));
  selectedBlogs.forEach((label) => params.append("blog", label));
  return `/results?${params}`;
}
