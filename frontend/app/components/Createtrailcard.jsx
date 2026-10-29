import { Link } from "react-router";
import { PlusCircle } from "@phosphor-icons/react";
import "./createTrailCard.css";

/**
 * CreateTrailCard
 * Light-green tile with a big plus. Sits in the "Trails for groups" row
 * and opens the Create a Trail page.
 */
export default function CreateTrailCard() {
  return (
    <Link to="/create-trail" className="create-card">
      <PlusCircle size={72} weight="regular" />
      <span>Create group trail</span>
    </Link>
  );
}