import { MapPin, Path, Mountains } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./TrailCard.css";

/**
 * TrailCard
 * The medium-size trail card with distance and elevation chips.
 * Used in "Trails for groups", "Solo Trails" and "All Trails".
 *
 * Props:
 *  - trail: one row from the Supabase "trails" table
 *           (uses name, location, level, image_url,
 *            length_km, elevation_gain)
 */
export default function TrailCard({ trail }) {
  return (
    <article className="trail-card">
      <img
        className="trail-card__img"
        src={trail.image_url}
        alt={trail.name}
      />

      <div className="trail-card__save">
         <SaveButton type="trail" id={trail.id} />
      </div>

      <div className="trail-card__info">
        <div className="trail-card__title-row">
          <h3 className="trail-card__name">{trail.name}</h3>
          <DifficultyBadge level={trail.level} />
        </div>

        <p className="trail-card__location">
          <MapPin size={14} /> {trail.location}
        </p>

        {/* Two white chips: distance and elevation gain */}
        <div className="trail-hero__chips">
  <span className="trail-hero__chip">
    <Path size={16} /> {trail.length_km} km
  </span>
  <span className="trail-hero__chip">
    <Mountains size={16} /> + {trail.elevation_gain} m
  </span>
</div>
      </div>
    </article>
  );
}