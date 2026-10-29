import { Link, useLocation } from "react-router";
import {
  HeartStraightIcon,
  MagnifyingGlassIcon,
  SlidersHorizontalIcon,
  PencilLineIcon,
} from "@phosphor-icons/react";
import "./topNav.css";

const hiddenOn = [
  /^\/blog\/\d+$/,
  /^\/trails\/\d+$/,
  /^\/login/,
  /^\/signup/,
  /^\/onboarding/,
];

export default function TopNav() {
  const { pathname } = useLocation();

  if (hiddenOn.some((pattern) => pattern.test(pathname))) {
    return null;
  }

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
          <Link
            to="/onboarding"
            className="top-nav__icon-button"
            aria-label="Edit profile"
          >
            <PencilLineIcon size={28} />
          </Link>
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
          <button type="button" aria-label="Filters">
            <SlidersHorizontalIcon size={18} />
          </button>
        </div>
      )}
    </header>
  );
}