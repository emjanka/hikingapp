import "./Difficultybadge.css";

/**
 * DifficultyBadge
 * Dark pink pill with the trail difficulty, e.g. "Moderate".
 *
 * Props:
 *  - level: the difficulty text from the trails table
 */
export default function DifficultyBadge({ level }) {
  if (!level) return null;
  return <span className="difficulty">{level}</span>;
}