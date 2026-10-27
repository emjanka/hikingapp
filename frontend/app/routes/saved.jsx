import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon, MountainsIcon } from "@phosphor-icons/react";
import "./saved.css";

export default function Saved() {
  const navigate = useNavigate();

  return (
    <main className="saved-page">
      <div className="saved-page__header">
        <button
          type="button"
          className="saved-page__back"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <h1>Saved Trails</h1>
      </div>
      <div className="saved-page__empty">
        <p className="saved-page__title">Uh oh!</p>
        <div className="saved-page__image">
          <MountainsIcon size={56} />
        </div>
        <Link to="/">You have no saved trails, go and like some!</Link>
      </div>
    </main>
  );
}