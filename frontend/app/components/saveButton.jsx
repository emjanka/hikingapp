import { useState } from "react";
import { HeartStraightIcon } from "@phosphor-icons/react";
import "./saveButton.css";

export default function SaveButton() {
  const [saved, setSaved] = useState(false);

  function handleClick(event) {
    event.preventDefault();
    setSaved(!saved);
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