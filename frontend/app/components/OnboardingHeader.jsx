import { ArrowLeftIcon } from "@phosphor-icons/react";
import "./OnboardingHeader.css";

/**
 * Back arrow + progress bar at the top of every onboarding step.
 *
 * Props:
 *  - step:   current step (1-4)
 *  - total:  how many steps there are
 *  - onBack: what happens when the arrow is clicked
 */
export default function OnboardingHeader({ step, total, onBack }) {
  // In Figma the bar is 1/5 full on step 1 and 4/5 full on the last step,
  // so it only fills up completely once you press "Finish".
  const percent = (step / (total + 1)) * 100;

  return (
    <div className="onboarding-header">
      <button type="button" className="onboarding-header__back" onClick={onBack} aria-label="Back">
        <ArrowLeftIcon size={24} />
      </button>
      <div className="onboarding-header__bar">
        <div className="onboarding-header__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
