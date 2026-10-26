import { Link } from "react-router";
import { CaretRightIcon } from "@phosphor-icons/react";
import "./SettingsRow.css";

/**
 * One row in the Settings card: icon, title, small description and an arrow.
 *
 * Props:
 *  - Icon:  a Phosphor icon component
 *  - title: e.g. "Edit profile"
 *  - text:  e.g. "Update your photo, bio, age, and hiking level"
 *  - to:    where the row links to
 */
export default function SettingsRow({ Icon, title, text, to = "#" }) {
  return (
    <Link to={to} className="settings-row">
      <Icon className="settings-row__icon" size={24} />
      <span className="settings-row__text">
        <span className="settings-row__title">{title}</span>
        <span className="settings-row__desc">{text}</span>
      </span>
      <CaretRightIcon className="settings-row__arrow" size={18} />
    </Link>
  );
}
