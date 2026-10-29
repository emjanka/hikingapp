import { useEffect, useState } from "react";
import { HeartStraightIcon } from "@phosphor-icons/react/dist/csr/HeartStraight";
import { isSaved, toggleSaved } from "../lib/savedItems";
import "./saveButton.css";

// The heart button for saving a blog or trail
export default function SaveButton({ type, id }) {
  const [saved, setSaved] = useState(false);

  // Check if this item was already saved before
  useEffect(() => {
    setSaved(isSaved(type, id));
  }, [type, id]);

  function handleClick(event) {
    // Stops the click from opening the card's link
    event.preventDefault();
    setSaved(toggleSaved(type, id));
  }

  return (
    <button
      type="button"
      className={saved ? "save-button save-button--saved" : "save-button"}
      onClick={handleClick}
      aria-label="Save"
    >
      {/* Filled heart when saved, outline when not */}
      <HeartStraightIcon size={20} weight={saved ? "fill" : "regular"} />
    </button>
  );
}