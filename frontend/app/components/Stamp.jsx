import { LockKeyIcon } from "@phosphor-icons/react";
import "./Stamp.css";

/**
 * A postage-stamp badge.
 *
 * Props:
 *  - label:  text under the picture, e.g. "First steps"
 *  - Icon:   a Phosphor icon component
 *  - locked: true = not earned yet (faded, with a lock instead of the icon)
 *  - size:   "small" (profile row) or "large" (stamp collection page)
 */
export default function Stamp({ label, Icon, locked = false, size = "small" }) {
  const classes = ["stamp", `stamp--${size}`, locked && "stamp--locked"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="stamp__inner">
        <div className="stamp__picture">
          {locked ? <LockKeyIcon className="stamp__icon" /> : Icon && <Icon className="stamp__icon" />}
        </div>
        <span className="stamp__label">{label}</span>
      </div>
    </div>
  );
}
