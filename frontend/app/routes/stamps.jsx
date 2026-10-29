import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ArrowLeftIcon, CheckCircleIcon } from "@phosphor-icons/react";
import Stamp from "../components/Stamp";
import StampProgress from "../components/StampProgress";
import DiscountPopup from "../components/DiscountPopup";
import { allStamps, getEarnedIds, discount, STAMPS_FOR_DISCOUNT } from "../lib/stamps";
import "./stamps.css";

// Runs in the browser before the page shows (same pattern as the other pages)
export async function clientLoader() {
  return { earnedIds: getEarnedIds() };
}

export default function Stamps() {
  const navigate = useNavigate();
  const { earnedIds } = useLoaderData();
  const [showPopup, setShowPopup] = useState(false);

  const earned = allStamps.filter((stamp) => earnedIds.includes(stamp.id));
  const stillToEarn = allStamps.filter((stamp) => !earnedIds.includes(stamp.id));
  const count = Math.min(earned.length, STAMPS_FOR_DISCOUNT);
  const isComplete = count >= STAMPS_FOR_DISCOUNT;
  const left = STAMPS_FOR_DISCOUNT - count;

  const partnerLink = (
    <a href={discount.url} target="_blank" rel="noreferrer">
      {discount.partner}
    </a>
  );

  return (
    <main className="stamps-page">
      <div className="stamps-page__header">
        <button type="button" className="stamps-page__back" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeftIcon size={24} />
        </button>
        <h1 className="stamps-page__title">Stamp collection</h1>
      </div>

      {/* Progress card */}
      <section className="stamps-page__progress">
        <div className="stamps-page__progress-top">
          <h2 className="stamps-page__heading">
            {count} of {STAMPS_FOR_DISCOUNT} stamps
          </h2>
          {isComplete ? (
            <CheckCircleIcon size={24} className="stamps-page__check" />
          ) : (
            <span className="stamps-page__next">Next discount</span>
          )}
        </div>

        <StampProgress value={count} max={STAMPS_FOR_DISCOUNT} />

        <p className="stamps-page__hint">
          {isComplete ? (
            <>You earned {discount.percent}% off on {partnerLink}!</>
          ) : (
            <>
              Complete {left} more {left === 1 ? "trail" : "trails"} to get {discount.percent}% off on{" "}
              {partnerLink}
            </>
          )}
        </p>

        {isComplete && (
          <button type="button" className="stamps-page__claim" onClick={() => setShowPopup(true)}>
            Claim discount
          </button>
        )}
      </section>

      <section className="stamps-page__section">
        <h2 className="stamps-page__heading">Earned stamps</h2>
        <div className="stamps-page__grid">
          {earned.map((stamp) => (
            <Stamp key={stamp.id} label={stamp.label} Icon={stamp.Icon} size="large" />
          ))}
        </div>
      </section>

      <section className="stamps-page__section">
        <h2 className="stamps-page__heading">Still to earn</h2>
        <div className="stamps-page__grid">
          {stillToEarn.map((stamp) => (
            <Stamp key={stamp.id} label={stamp.label} locked size="large" />
          ))}
        </div>
      </section>

      {showPopup && (
        <DiscountPopup
          percent={discount.percent}
          code={discount.code}
          onClose={() => setShowPopup(false)}
        />
      )}
    </main>
  );
}
