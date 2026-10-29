import { Link, useLoaderData, useParams } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import SmallTrailCard from "../components/smallTrailCard";
import "./trailList.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * The "See all" lists. The key is the last part of the address,
 * e.g. /trails/recommended -> LISTS.recommended.
 * "pick" chooses which trails belong in the list. For now every list
 * shows all trails; once the table has columns like solo_friendly or
 * group_friendly, filter here, e.g. (trails) => trails.filter((t) => t.solo_friendly)
 */
const LISTS = {
  recommended: { title: "Recommended Trails", pick: (trails) => trails },
  solo: { title: "Solo Trails", pick: (trails) => trails },
  groups: { title: "Trails for groups", pick: (trails) => trails },
  all: { title: "All Trails", pick: (trails) => trails },
};

// Runs in the browser before the page shows: loads all trails
export async function clientLoader() {
  const response = await fetch(`${supabaseUrl}/rest/v1/trails?select=*`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load trails");
  }

  const trails = await response.json();
  return { trails };
}

export default function TrailList() {
  const { trails } = useLoaderData();
  const { list } = useParams(); // "recommended", "solo", "all", ...
  const config = LISTS[list];

  // Unknown address, e.g. /trails/banana
  if (!config) {
    return (
      <main className="trail-list">
        <p>We couldn't find that list.</p>
        <Link to="/trails">Back to trails</Link>
      </main>
    );
  }

  return (
    <main className="trail-list">
      <header className="trail-list__header">
        <Link to="/trails" className="trail-list__back" aria-label="Back">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="trail-list__title">{config.title}</h1>
      </header>

      {/* Two-column grid of small trail cards */}
      <div className="trail-list__grid">
        {config.pick(trails).map((trail) => (
          <SmallTrailCard key={trail.id} trail={trail} />
        ))}
      </div>
    </main>
  );
}