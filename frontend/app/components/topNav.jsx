import { useState } from "react";
import { Link, useLocation } from "react-router";
import { HeartStraightIcon } from "@phosphor-icons/react/dist/csr/HeartStraight";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { SlidersHorizontalIcon } from "@phosphor-icons/react/dist/csr/SlidersHorizontal";
import FilterSheet from "./FilterSheet";
import "./topNav.css";

// Pages where the top nav should not show
const hiddenOn = [
  /^\/blog\/\d+$/,
  /^\/trails\/\d+$/,
  /^\/login/,
  /^\/signup/,
  /^\/onboarding/,
];

// The header at the top of the app, it changes depending on the page
export default function TopNav() {
  const { pathname } = useLocation();
  const [showFilters, setShowFilters] = useState(false);

  if (hiddenOn.some((pattern) => pattern.test(pathname))) {
    return null;
  }

  // Profile has no search bar, and the saved page has a green heart
  const isProfile = pathname === "/profile";
  const isSaved = pathname === "/saved";

  return (
    <header className="top-nav">
      <div className="top-nav__row">
        <Link to="/" className="top-nav__logo" aria-label="Forester home">
          <img
            src="/images/foresterpurple.svg"
            alt="Forester"
            className="top-nav__logo-image"
          />
        </Link>
        {isProfile ? (
          <button
            type="button"
            className="top-nav__icon-button"
            aria-label="Edit profile"
          >
            <img src="/images/profileEdit.svg" alt="" width="28" height="28" />
          </button>
        ) : (
          <Link
            to="/saved"
            className={
              isSaved
                ? "top-nav__icon-button top-nav__icon-button--saved"
                : "top-nav__icon-button"
            }
            aria-label="Saved trails and blogs"
          >
            <HeartStraightIcon size={28} weight={isSaved ? "fill" : "regular"} />
          </Link>
        )}
      </div>
      {!isProfile && (
        <div className="top-nav__search">
          <MagnifyingGlassIcon size={18} />
          <input type="search" placeholder="Search trails or articles..." />
          {/* Opens the Filters sheet (components/FilterSheet.jsx) */}
          <button type="button" aria-label="Filters" onClick={() => setShowFilters(true)}>
            <SlidersHorizontalIcon size={18} />
          </button>
        </div>
      )}
      {showFilters && <FilterSheet onClose={() => setShowFilters(false)} />}
    </header>
  );
}