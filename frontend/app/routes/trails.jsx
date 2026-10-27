import { useLoaderData } from "react-router";
import TrailCard from "../components/TrailCard";
import "./trails.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
    <main className="page">
      <h1>Trails</h1>
      <div className="trail-list">
        {trails.map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>
    </main>
  );
}