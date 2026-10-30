import { Link, useLoaderData, useNavigate } from "react-router";
import { ArrowLeft, Clock, MapPin, Mountains, Path, Star } from "@phosphor-icons/react";
import SaveButton from "../components/saveButton";
import DifficultyBadge from "../components/Difficultybadge";
import TrailStat from "../components/trailStat";
import "./trailDetail.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Runs in the browser before the page shows.
// params.id is the number from the address, e.g. /trail/4 -> "4"
export async function clientLoader({ params }) {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/trails?id=eq.${params.id}&select=*`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not load trail");
  }

  const rows = await response.json();

  // Supabase returns a list; an empty list means no trail with that id
  if (rows.length === 0) {
    throw new Response("Trail not found", { status: 404 });
  }

  return { trail: rows[0] };
}

// Turns minutes into text like "4h 45 m" (285 -> "4h 45 m", 60 -> "1h")
function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes} m`;
}

export default function TrailDetail() {
  const { trail } = useLoaderData();
  const navigate = useNavigate();

 // "Navigate" opens Google Maps directions to the trail's start point.
// Uses coordinates if the table has them, otherwise the name and place.
const destination =
  trail.latitude && trail.longitude
    ? `${trail.latitude},${trail.longitude}`
    : `${trail.name} ${trail.location}`;

const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  destination
)}`;

  return (
    <main className="trail-detail">
      {/* Full-width photo with back and save buttons on top */}
      <div className="trail-detail__hero">
        <img
          className="trail-detail__img"
          src={trail.image_url}
          alt={trail.name}
        />

        <button
          type="button"
          className="trail-detail__back"
          aria-label="Back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <div className="trail-detail__save">
          <SaveButton type="trail" id={trail.id} />
        </div>
      </div>

      {/* White sheet that overlaps the bottom of the photo */}
      <div className="trail-detail__sheet">
        <header className="trail-detail__header">
          <div className="trail-detail__title-row">
            <h1 className="trail-detail__name">{trail.name}</h1>
            <DifficultyBadge level={trail.level} />
          </div>

          <p className="trail-detail__meta">
            {/* Rating only shows if the table has a "rating" column */}
            {trail.rating && (
              <span className="trail-detail__rating">
                <Star size={18} weight="fill" /> {trail.rating}
              </span>
            )}
            <span className="trail-detail__place">
              <MapPin size={18} /> {trail.location}
            </span>
          </p>
        </header>

        {/* 2 x 2 grid of facts */}
        <section className="trail-detail__stats">
          <TrailStat
            icon={<Path size={26} />}
            value={`${trail.length_km} km`}
            label="Trail length"
          />
          <TrailStat
            icon={<Mountains size={26} />}
            value={`${trail.elevation_gain} m`}
            label="Elevation gain"
          />
          <TrailStat
            icon={<Clock size={26} />}
            value={formatDuration(trail.duration_minutes)}
            label="Estimated time"
          />
          <TrailStat
            icon={<MapPin size={26} />}
            value={trail.location}
            label="Location"
          />
        </section>

        <p className="trail-detail__description">{trail.description}</p>

        <div className="trail-detail__actions">
          {/* Download isn't built yet → goes to the 404 page for now */}
          <Link to="/download" className="trail-detail__btn trail-detail__btn--primary">
            Download map
          </Link>
          <a
            className="trail-detail__btn trail-detail__btn--secondary"
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Navigate
          </a>
        </div>
      </div>
    </main>
  );
}