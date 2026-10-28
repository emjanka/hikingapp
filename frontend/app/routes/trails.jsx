import { useLoaderData } from "react-router";
import Section from "../components/Section";
import TrailHero from "../components/trailHero";
import GroupTrailCard from "../components/GroupTrailCards";
import "./trails.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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

export default function Trails() {
  const { trails } = useLoaderData();

  return (
    <main className="trails">
      <Section title="Recommended Trails" seeAllTo="/trails">
        {/* Big cards, like on the Explore page */}
        {trails.slice(0, 3).map((trail) => (
          <TrailHero key={trail.id} trail={trail} />
        ))}
      </Section>

      <Section title="Solo Trails" seeAllTo="/trails">
        {/* Later: filter with a "solo friendly" column */}
        {trails.slice(1, 6).map((trail) => (
          <GroupTrailCard key={trail.id} trail={trail} />
        ))}
      </Section>

      <Section title="Trails for groups" seeAllTo="/trails">
        {/* Later: filter with a "group friendly" column */}
        {trails.slice(4, 9).map((trail) => (
          <GroupTrailCard key={trail.id} trail={trail} />
        ))}
      </Section>

      <Section title="All Trails" seeAllTo="/trails">
        {trails.map((trail) => (
          <GroupTrailCard key={trail.id} trail={trail} />
        ))}
      </Section>
    </main>
  );
}