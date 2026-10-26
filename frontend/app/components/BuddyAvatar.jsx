import "./BuddyAvatar.css";

/**
 * BuddyAvatar
 * A round profile photo with the buddy's name underneath.
 *
 * Props:
 *  - name:     the buddy's name, e.g. "Rose"
 *  - imageUrl: path stored in Supabase, e.g. "images/buddies/rose.jpg".
 *              The photo lives in frontend/public/, so we add a "/" in front.
 */
export default function BuddyAvatar({ name, imageUrl }) {
  return (
    <div className="buddy">
      <img className="buddy__img" src={`/${imageUrl}`} alt={name} />
      <span className="buddy__name">{name}</span>
    </div>
  );
}