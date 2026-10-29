import "./trailStat.css";

/**
 * TrailStat
 * One fact in the details grid: a burgundy icon with a bold value
 * and a small grey label underneath, e.g. "5.6 km" / "Trail length".
 *
 * Props:
 *  - icon:  a Phosphor icon element, e.g. <Path size={24} />
 *  - value: the text to show in bold
 *  - label: the grey caption under the value
 */
export default function TrailStat({ icon, value, label }) {
  return (
    <div className="trail-stat">
      <p className="trail-stat__value">
        <span className="trail-stat__icon">{icon}</span>
        {value}
      </p>
      <p className="trail-stat__label">{label}</p>
    </div>
  );
}