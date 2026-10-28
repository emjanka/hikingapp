import { useLoaderData } from "react-router";
import Section from "../components/Section";
import BuddyAvatar from "../components/BuddyAvatar";
import TrailHero from "../components/trailHero";
import GroupTrailCard from "../components/GroupTrailCards";
import "./explore.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fetches all rows of one Supabase table (same approach as trails.jsx)
async function fetchTable(table) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not load ${table}`);
  }

  return response.json();
}

// Runs in the browser before the page shows.
// Promise.all loads both tables at the same time.
export async function clientLoader() {
  const [buddies, trails] = await Promise.all([
    fetchTable("hikingbuddies"),
    fetchTable("trails"),
  ]);
  return { buddies, trails };
}

export default function Explore() {
  // The data returned by clientLoader above
  const { buddies, trails } = useLoaderData();

  return (
    <main className="explore">
      <Section title="Hiking buddies" seeAllTo="/buddies">
        {buddies.map((buddy) => (
          <BuddyAvatar
            key={buddy.id}
            name={buddy.buddies_name}
            imageUrl={buddy.avatar_url}
          />
        ))}
      </Section>

      <Section title="Trails for you" seeAllTo="/trails">
        {/* First 3 trails for now; real personalisation can come later */}
        {trails.slice(0, 3).map((trail) => (
          <TrailHero key={trail.id} trail={trail} />
        ))}
      </Section>

      <Section title="Period problems?" seeAllTo="/blog">
        {/* Emilija's blogCard goes here (needs her component, see message) */}
      </Section>

      <Section title="Trails for groups" seeAllTo="/trails">
        {/* Later: filter with a "group friendly" column */}
        {trails.slice(3, 8).map((trail) => (
          <GroupTrailCard key={trail.id} trail={trail} />
        ))}
      </Section>
    </main>
  );
}