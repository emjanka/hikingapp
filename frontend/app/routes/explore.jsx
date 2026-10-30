import { useLoaderData } from "react-router";
import Section from "../components/Section";
import BuddyAvatar from "../components/BuddyAvatar";
import TrailHero from "../components/trailHero";
import TrailCard from "../components/TrailCard";
import BlogCard from "../components/blogCard";
import Createtrailcard from "../components/Createtrailcard";
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
// Promise.all loads all three tables at the same time.
export async function clientLoader() {
  const [buddies, trails, blogs] = await Promise.all([
    fetchTable("hikingbuddies"),
    fetchTable("trails"),
    fetchTable("blogs"),
  ]);
  return { buddies, trails, blogs };
}

export default function Explore() {
  // The data returned by clientLoader above
  const { buddies, trails, blogs } = useLoaderData();

  return (
    <main className="explore">
      <Section title="Hiking buddies" seeAllTo="/buddies">
        {buddies.map((buddy) => (
          <BuddyAvatar
            key={buddy.id}
            id={buddy.id}
            name={buddy.buddies_name}
            imageUrl={buddy.avatar_url}
          />
        ))}
      </Section>

      <Section title="Trails for you" seeAllTo="/trails/recommended">
        {/* First 3 trails for now; real personalisation can come later */}
        {trails.slice(0, 3).map((trail) => (
          <TrailHero key={trail.id} trail={trail} />
        ))}
      </Section>

      <Section title="Period problems?" seeAllTo="/blog">
        {/* Emilija's blog cards, first 5 articles for now */}
        {blogs.slice(0, 5).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Section>

      <Section title="Trails for groups" seeAllTo="/trails/groups">
        {/* Later: filter with a "group friendly" column */}
        {trails.slice(3, 8).map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </Section>
    </main>
  );
}