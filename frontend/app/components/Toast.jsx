import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircleIcon } from "@phosphor-icons/react";
import "./Toast.css";

/**
 * A small notification that pops up above the bottom nav
 * and disappears by itself after a few seconds.
 *
 * Props:
 *  - message: the text to show
 *  - onClose: called when it should disappear
 */
export default function Toast({ message, onClose }) {
  // Hide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className="toast" role="status">
      <CheckCircleIcon size={22} weight="fill" />
      <span>{message}</span>
    </div>,
    document.body
  );
}
