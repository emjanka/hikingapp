import "./Difficultybadge.css";

/**
 * DifficultyBadge
 * Small pill showing the trail level ("Easy", "Moderate", ...).
 * The colour depends on the level (see Difficultybadge.css).
 *
 * Props:
 *  - level: the "level" column from the trails table
 */
export default function DifficultyBadge({ level }) {
  if (!level) return null;

  // "Moderate" -> "difficulty--moderate"
  const modifier = `difficulty--${level.toLowerCase().replace(" ", "-")}`;

  return <span className={`difficulty ${modifier}`}>{level}</span>;
}