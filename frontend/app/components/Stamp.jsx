import "./Stamp.css";

/**
 * A postage-stamp badge for the "Stamp collection" on the profile.
 *
 * Props:
 *  - label:  text under the icon, e.g. "First steps"
 *  - Icon:   a Phosphor icon component (leave empty for a locked stamp)
 */
export default function Stamp({ label, Icon }) {
  return (
    <div className={Icon ? "stamp" : "stamp stamp--locked"}>
      <div className="stamp__inner">
        <div className="stamp__picture">{Icon && <Icon size={30} />}</div>
        <span className="stamp__label">{label}</span>
      </div>
    </div>
  );
}
