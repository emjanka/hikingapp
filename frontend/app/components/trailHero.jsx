import { MapPin } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import Difficultybadge from "./Difficultybadge";
import "./TrailHero.css";

/**
 * TrailHero
 * The big featured trail card used in "Trails for you".
 *
 * Props:
 *  - trail: one row from the Supabase "trails" table
 *           (uses name, location, difficulty, image_url)
 */
export default function TrailHero({ trail }) {
  return (
    <article className="trail-hero">
      {/* The photo lives in frontend/public, so we add a "/" in front */}
      <img
        className="trail-hero__img"
       src={trail.image_url}
        alt={trail.name}
      />

      <SaveButton />

      {/* Text sits on top of a dark gradient so it stays readable */}
      <div className="trail-hero__info">
        <div className="trail-hero__badge">
          <DifficultyBadge level={trail.difficulty} />
        </div>
        <h3 className="trail-hero__name">{trail.name}</h3>
        <p className="trail-hero__location">
          <MapPin size={18} /> {trail.location}
        </p>
      </div>
    </article>
  );
}