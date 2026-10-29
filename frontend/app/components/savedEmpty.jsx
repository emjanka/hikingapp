import { Link } from "react-router";
import { MountainsIcon } from "@phosphor-icons/react/dist/csr/Mountains";
import "./savedEmpty.css";

// The "Uh oh!" message shown when nothing is saved
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