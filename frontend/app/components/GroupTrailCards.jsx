import { MapPin, Path, Mountains } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./GroupTrailCards.css";

/**
 * GroupTrailCard
 * Smaller trail card used in "Trails for groups", with
 * distance and elevation chips at the bottom.
 *
 * Props:
 *  - trail: one row from the Supabase "trails" table
 *           (uses name, location, difficulty, image_url,
 *            distance_km, elevation_m)
 */
export default function GroupTrailCard({ trail }) {
  return (
    <article className="group-card">
      <img
        className="group-card__img"
        src={trail.image_url}
        alt={trail.name}
      />

      <SaveButton />

      <div className="group-card__info">
        <div className="group-card__title-row">
          <h3 className="group-card__name">{trail.name}</h3>
          <DifficultyBadge level={trail.difficulty} />
        </div>

        <p className="group-card__location">
          <MapPin size={16} /> {trail.location}
        </p>

        {/* Two white chips: distance and elevation gain */}
        <div className="group-card__chips">
          <span className="group-card__chip">
            <Path size={18} /> {trail.distance_km} km
          </span>
          <span className="group-card__chip">
            <Mountains size={18} /> + {trail.elevation_m} m
          </span>
        </div>
      </div>
    </article>
  );
}