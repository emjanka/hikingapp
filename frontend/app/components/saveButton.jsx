import { useEffect, useState } from "react";
import { HeartStraightIcon } from "@phosphor-icons/react";
import { isSaved, toggleSaved } from "../lib/savedItems";
import "./saveButton.css";

export default function SaveButton({ type, id }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isSaved(type, id));
  }, [type, id]);

  function handleClick(event) {
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
      <HeartStraightIcon size={20} weight={saved ? "fill" : "regular"} />
    </button>
  );
}