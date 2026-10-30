import { Link } from "react-router";
import { MapPin, Path, Mountains } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./glass.css";
import "./smallTrailCard.css";

/**
 * SmallTrailCard
 * Compact card for the two-column "See all" lists.
 * The whole card links to the detail page.
 * Props: trail - one row of the Supabase "trails" table.
 */
export default function SmallTrailCard({ trail }) {
  return (
    <Link to={`/trail/${trail.id}`} className="small-card">
      <img className="small-card__img" src={trail.image_url} alt={trail.name} />

      <div className="small-card__save">
        <SaveButton type="trail" id={trail.id} />
      </div>

      {/* Frosted-glass panel with the trail info */}
      <div className="small-card__info glass">
        <div className="small-card__badge">
          <DifficultyBadge level={trail.level} />
        </div>

        <h3 className="small-card__name">{trail.name}</h3>
        <p className="small-card__location">
          <MapPin size={12} />
          <span>{trail.location}</span>
        </p>

        {/* Icon + number, no box (as in the Figma) */}
        <div className="small-card__stats">
          <span className="small-card__stat">
            <Path size={14} /> {trail.length_km} km
          </span>
          <span className="small-card__stat">
            <Mountains size={14} /> + {trail.elevation_gain} m
          </span>
        </div>
      </div>
    </Link>
  );
}