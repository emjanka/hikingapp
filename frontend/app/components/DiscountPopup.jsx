import { useState } from "react";
import { TicketIcon } from "@phosphor-icons/react";
import "./DiscountPopup.css";

/**
 * "10% off unlocked!" pop-up with a code you can copy.
 * Props: percent, code, onClose
 */
export default function DiscountPopup({ percent, code, onClose }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Copying can be blocked by the browser — the code is still visible
    }
  }

  return (
    // Dark background; clicking it closes the pop-up
    <div className="discount-popup__backdrop" onClick={onClose}>
      <div
        className="discount-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="discount-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="discount-popup__icon">
          <TicketIcon size={28} />
        </div>

        <div>
          <h2 id="discount-title" className="discount-popup__title">
            {percent}% off unlocked!
          </h2>
          <p className="discount-popup__text">Use this code at checkout to get your discount</p>
        </div>

        <div className="discount-popup__code">
          <span>{code}</span>
          <button type="button" className="discount-popup__copy" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button type="button" className="discount-popup__done" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
