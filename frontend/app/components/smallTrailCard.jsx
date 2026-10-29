import { MapPin, Path, Mountains } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./smallTrailCard.css";

/**
 * SmallTrailCard
 * The compact trail card used in the two-column "See all" lists.
 * Same content as TrailCard, just smaller.
 *
 * Props:
 *  - trail: one row from the Supabase "trails" table
 *           (uses id, name, location, level, image_url,
 *            length_km, elevation_gain)
 */
export default function SmallTrailCard({ trail }) {
  return (
    <article className="small-card">
      <img
        className="small-card__img"
        src={trail.image_url}
        alt={trail.name}
      />

      {/* Save heart in the top-right corner */}
      <div className="small-card__save">
        <SaveButton type="trail" id={trail.id} />
      </div>

      {/* Text sits on a dark gradient so it stays readable */}
      <div className="small-card__info">
        <div className="small-card__badge">
          <DifficultyBadge level={trail.level} />
        </div>

        <h3 className="small-card__name">{trail.name}</h3>

        <p className="small-card__location">
          <MapPin size={12} />
          <span>{trail.location}</span>
        </p>

        {/* Distance and elevation gain, icon + number */}
        <div className="small-card__stats">
          <span className="small-card__stat">
            <Path size={14} /> {trail.length_km} km
          </span>
          <span className="small-card__stat">
            <Mountains size={14} /> + {trail.elevation_gain} m
          </span>
        </div>
      </div>
    </article>
  );
}