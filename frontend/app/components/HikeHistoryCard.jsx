import { MapPinIcon, PathIcon, MountainsIcon } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import "./HikeHistoryCard.css";

/**
 * A trail you've hiked, shown in "My hike history" on the profile.
 * Looks like the trail card from Figma.
 *
 * Props: name, region, distance, elevation, difficulty, image
 */
export default function HikeHistoryCard({ name, region, distance, elevation, difficulty, image }) {
  return (
    <article className="hike-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="hike-card__top">
        <SaveButton />
      </div>

      <div className="hike-card__title-row">
        <h3 className="hike-card__name">{name}</h3>
        <span className={`hike-card__level hike-card__level--${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      </div>

      <div className="hike-card__info">
        <span className="hike-card__region">
          <MapPinIcon size={14} /> {region}
        </span>
        <div className="hike-card__pills">
          <span className="hike-card__pill">
            <PathIcon size={16} /> {distance}
          </span>
          <span className="hike-card__pill">
            <MountainsIcon size={16} /> {elevation}
          </span>
        </div>
      </div>
    </article>
  );
}
