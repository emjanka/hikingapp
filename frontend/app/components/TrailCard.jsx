import { Link } from "react-router";
import { MapPin, Path, Mountains } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./glass.css";
import "./TrailCard.css";

/**
 * TrailCard
 * The medium trail card with distance and elevation chips.
 * The whole card links to the detail page.
 * Props: trail - one row of the Supabase "trails" table.
 */
export default function TrailCard({ trail }) {
  return (
    <Link to={`/trail/${trail.id}`} className="trail-card">
      <img className="trail-card__img" src={trail.image_url} alt={trail.name} />

      <div className="trail-card__save">
        <SaveButton type="trail" id={trail.id} />
      </div>

      {/* Frosted-glass panel with the trail info */}
      <div className="trail-card__info glass">
        <div className="trail-card__badge">
          <DifficultyBadge level={trail.level} />
        </div>

        <h3 className="trail-card__name">{trail.name}</h3>
        <p className="trail-card__location">
          <MapPin size={14} /> {trail.location}
        </p>

        <div className="trail-card__chips">
          <span className="trail-card__chip">
            <Path size={16} /> {trail.length_km} km
          </span>
          <span className="trail-card__chip">
            <Mountains size={16} /> + {trail.elevation_gain} m
          </span>
        </div>
      </div>
    </Link>
  );
}