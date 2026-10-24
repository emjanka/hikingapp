import { NavLink } from "react-router";
import {
  CompassIcon,
  MountainsIcon,
  BookBookmarkIcon,
  UserIcon,
} from "@phosphor-icons/react";
import "./bottomNav.css";

const tabs = [
  { to: "/", label: "Explore", Icon: CompassIcon },
  { to: "/trails", label: "Trails", Icon: MountainsIcon },
  { to: "/blog", label: "Blog", Icon: BookBookmarkIcon },
  { to: "/profile", label: "Profile", Icon: UserIcon },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {tabs.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end={to === "/"} className="bottom-nav__tab">
          <span className="bottom-nav__icon">
            <Icon size={24} />
          </span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}