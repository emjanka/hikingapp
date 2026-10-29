import "./StampProgress.css";

/**
 * Plum progress bar on a grey track.
 * Props: value (e.g. 3), max (e.g. 5)
 */
export default function StampProgress({ value, max }) {
  const percent = Math.min(value / max, 1) * 100;

  return (
    <div
      className="stamp-progress"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className="stamp-progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
