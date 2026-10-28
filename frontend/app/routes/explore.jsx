import { useLoaderData } from "react-router";
import Section from "../components/Section";
import BuddyAvatar from "../components/BuddyAvatar";
import TrailHero from "../componentstrailHero";
import GroupTrailCard from "../components/GroupTrailCards";
import BlogCard from "../components/blogCard";
import DifficultyBadge from "../components/Difficultybadge";
import SaveButton from "../components/saveButton";
import TopNav from "~/components/topNav";
import "./explore.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Runs in the browser before the page shows (same pattern as trails.jsx).
// Fetches all rows from the "buddies" table in Supabase.
export async function clientLoader() {
  const response = await fetch(`${supabaseUrl}/rest/v1/hikingbuddies?select=*`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load buddies");
  }

  const buddies = await response.json();
  return { buddies };
}

export default function Explore() {
  // The data returned by clientLoader above
  const { buddies } = useLoaderData();

  return (
    <main className="explore">
      <Section title="Hiking buddies" seeAllTo="/buddies">
        {/* One round avatar per row in the buddies table */}
        {buddies.map((buddy) => (
          <BuddyAvatar
            key={buddy.id}
            name={buddy.buddies_name}
            imageUrl={buddy.avatar_url}
          />
        ))}
      </Section>

      <Section title="Trails for you" seeAllTo="/trails">
        {/* FeaturedTrailCard */}
      </Section>

      <Section title="Period problems?" seeAllTo="/blog">
        {/* blogCard */}
      </Section>

      <Section title="Trails for groups" seeAllTo="/trails">
        {/* GroupTrailCard */}
      </Section>
    </main>
  );
}