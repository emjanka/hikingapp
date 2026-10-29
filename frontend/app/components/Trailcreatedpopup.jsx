import { Mountains, X } from "@phosphor-icons/react";
import "./trailCreatedPopup.css";

/**
 * TrailCreatedPopup
 * Burgundy pop-up shown after a trail was saved.
 * Props: onClose - called when the user taps the X.
 */
export default function TrailCreatedPopup({ onClose }) {
  return (
    <div className="popup-backdrop" role="dialog" aria-modal="true">
      <div className="popup">
        <button
          type="button"
          className="popup__close"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={26} />
        </button>

        <Mountains className="popup__icon" size={88} />
        <h2 className="popup__title">Trail created successfully!</h2>
        <p className="popup__text">You can find your trails in Profile</p>
      </div>
    </div>
  );
}