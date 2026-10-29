import { Link, useNavigate } from "react-router";
import { CompassIcon } from "@phosphor-icons/react";
import Stamp from "../components/Stamp";
import "./notFound.css";

// Shown for any address that doesn't exist (the "*" route in routes.ts)
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <div className="not-found__stamp">
        <Stamp label="Lost hiker" Icon={CompassIcon} size="large" />
      </div>

      <p className="not-found__code">404</p>
      <h1 className="not-found__title">You wandered off the trail</h1>
      <p className="not-found__text">
        We couldn’t find this page. It might have moved, or the link has a typo.
        At least you found a secret stamp!
      </p>

      <div className="not-found__actions">
        <Link to="/" className="not-found__button">
          Back to Explore
        </Link>
        <button type="button" className="not-found__link" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </main>
  );
}
