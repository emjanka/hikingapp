import { Link } from "react-router";
import "./BuddyAvatar.css";

/**
 * BuddyAvatar
 * A round profile photo with the buddy's name underneath.
 *
 * Props:
 *  - name:     the buddy's name, e.g. "Rose"
 *  - imageUrl: path stored in Supabase, e.g. "images/buddies/rose.jpg".
 *              The photo lives in frontend/public/, so we add a "/" in front.
 *  - id:       the buddy's id; tapping the avatar opens /buddy/:id
 */
export default function BuddyAvatar({ id, name, imageUrl }) {
  return (
    <Link to={`/buddy/${id}`} className="buddy">
      <img className="buddy__img" src={`/${imageUrl}`} alt={name} />
      <span className="buddy__name">{name}</span>
    </Link>
  );
}