import { MapPin, Path, Mountains } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./GroupTrailCards.css";

/**
 * GroupTrailCard
 * Smaller trail card with distance and elevation chips
 * ("Trails for groups", "Solo Trails", "All Trails").
 *
 * Props:
 *  - trail: one row from the Supabase "trails" table
 *           (uses name, location, level, image_url,
 *            length_km, elevation_gain)
 */
export default function GroupTrailCard({ trail }) {
  return (
    <article className="group-card">
      <img
        className="group-card__img"
        src={trail.image_url}
        alt={trail.name}
      />

      <div className="group-card__save">
        <SaveButton trail={trail} />
      </div>

      <div className="group-card__info">
        <div className="group-card__title-row">
          <h3 className="group-card__name">{trail.name}</h3>
          <DifficultyBadge level={trail.level} />
        </div>

        <p className="group-card__location">
          <MapPin size={14} /> {trail.location}
        </p>

        {/* Two white chips: distance and elevation gain */}
        <div className="group-card__chips">
          <span className="group-card__chip">
            <Path size={16} /> {trail.length_km} km
          </span>
          <span className="group-card__chip">
            <Mountains size={16} /> + {trail.elevation_gain} m
          </span>
        </div>
      </div>
    </article>
  );
}