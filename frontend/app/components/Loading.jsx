import { Footprints } from "@phosphor-icons/react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="footsteps">
        <Footprints className="footstep step-1" weight="fill" />
        <Footprints className="footstep step-2" weight="fill" />
        <Footprints className="footstep step-3" weight="fill" />
      </div>

      <h3>Finding your next adventure...</h3>
    </div>
  );
}