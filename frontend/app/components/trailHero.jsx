import { MapPin, Path, Mountains } from "@phosphor-icons/react";
import { Link } from "react-router";
import SaveButton from "./saveButton";
import DifficultyBadge from "./Difficultybadge";
import "./trailHero.css";

/**
 * TrailHero
 * The big featured trail card ("Trails for you", "Recommended Trails").
 *
 * Props:
 *  - trail: one row from the Supabase "trails" table
 *           (uses name, location, level, image_url,
 *            length_km, elevation_gain)
 */
export default function TrailHero({ trail }) {
  return (
    <Link to={`/trail/${trail.id}`} className="trail-hero">
      {/* image_url already starts with "/", so no extra slash here */}
      <img
        className="trail-hero__img"
        src={trail.image_url}
        alt={trail.name}
      />

      {/* Save heart, used the same way as in blogCard.jsx */}
      <div className="trail-hero__save">
        <SaveButton type="trail" id={trail.id} />
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
    </Link>
  );
}