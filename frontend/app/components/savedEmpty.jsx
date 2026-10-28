import { Link } from "react-router";
import { MountainsIcon } from "@phosphor-icons/react";
import "./savedEmpty.css";

export default function SavedEmpty({ message, to }) {
  return (
    <div className="saved-empty">
      <p className="saved-empty__title">Uh oh!</p>
      <div className="saved-empty__image">
        <MountainsIcon size={56} />
      </div>
      <Link to={to}>{message}</Link>
    </div>
  );
}