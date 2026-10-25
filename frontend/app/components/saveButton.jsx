import { useState } from "react";
import { HeartStraightIcon, BookmarkSimpleIcon } from "@phosphor-icons/react";
import "./saveButton.css";

export default function SaveButton({ icon = "heart" }) {
  const [saved, setSaved] = useState(false);
  const Icon = icon === "bookmark" ? BookmarkSimpleIcon : HeartStraightIcon;

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
      <Icon size={20} weight={saved ? "fill" : "regular"} />
    </button>
  );
}