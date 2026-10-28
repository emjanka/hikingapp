import { MapPin } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./trailHero.css";

/**
 * TrailHero
 * The big featured trail card ("Trails for you", "Recommended Trails").
 *
 * Props:
 *  - trail: one row from the Supabase "trails" table
 *           (uses name, location, level, image_url)
 */
export default function TrailHero({ trail }) {
  return (
    <article className="trail-hero">
      {/* image_url already starts with "/", so no extra slash here */}
      <img
        className="trail-hero__img"
        src={trail.image_url}
        alt={trail.name}
      />

      {/* Save heart in the top-right corner */}
      <div className="trail-hero__save">
        <SaveButton trail={trail} />
      </div>

      {/* Text sits on a dark gradient so it stays readable */}
      <div className="trail-hero__info">
        <div className="trail-hero__title-row">
          <h3 className="trail-hero__name">{trail.name}</h3>
          <DifficultyBadge level={trail.level} />
        </div>
        <p className="trail-hero__location">
          <MapPin size={16} /> {trail.location}
        </p>
      </div>
    </article>
  );
}