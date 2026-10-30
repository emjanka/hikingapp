import { Link } from "react-router";
import { MapPin, Path, Mountains } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./glass.css";
import "./trailHero.css";

/**
 * TrailHero
 * The big featured trail card. The whole card links to the detail page.
 * Props: trail - one row of the Supabase "trails" table.
 */
export default function TrailHero({ trail }) {
  return (
    <Link to={`/trail/${trail.id}`} className="trail-hero">
      <img className="trail-hero__img" src={trail.image_url} alt={trail.name} />

      <div className="trail-hero__save">
        <SaveButton type="trail" id={trail.id} />
      </div>

      {/* Frosted-glass panel with the trail info */}
      <div className="trail-hero__info glass">
        <div className="trail-hero__badge">
          <DifficultyBadge level={trail.level} />
        </div>

        <h3 className="trail-hero__name">{trail.name}</h3>
        <p className="trail-hero__location">
          <MapPin size={16} /> {trail.location}
        </p>

        <div className="trail-hero__chips">
          <span className="trail-hero__chip">
            <Path size={16} /> {trail.length_km} km
          </span>
          <span className="trail-hero__chip">
            <Mountains size={16} /> + {trail.elevation_gain} m
          </span>
        </div>
      </div>
    </Link>
  );
}