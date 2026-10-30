import { Link, useLoaderData } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import BuddyAvatar from "../components/BuddyAvatar";
import "./buddies.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Runs in the browser before the page shows: loads all hiking buddies
export async function clientLoader() {
  const response = await fetch(`${supabaseUrl}/rest/v1/hikingbuddies?select=*`, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
  });
  if (!response.ok) throw new Error("Could not load buddies");
  return { buddies: await response.json() };
}

// "See all" for hiking buddies: everyone in a grid, tap one to see her profile
export default function Buddies() {
  const { buddies } = useLoaderData();

  return (
    <main className="buddies">
      <header className="buddies__header">
        <Link to="/" className="buddies__back" aria-label="Back to Explore">
          <ArrowLeftIcon size={24} />
        </Link>
        <h1 className="buddies__title">Hiking buddies</h1>
      </header>

      <div className="buddies__grid">
        {buddies.map((buddy) => (
          <BuddyAvatar
            key={buddy.id}
            id={buddy.id}
            name={buddy.buddies_name}
            imageUrl={buddy.avatar_url}
          />
        ))}
      </div>
    </main>
  );
}
