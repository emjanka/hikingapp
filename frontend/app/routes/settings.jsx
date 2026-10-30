import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Toast from "../components/Toast";
import NotFound from "./notFound";
import { loadProfile, saveProfile } from "../lib/profileStorage";
import "./onboarding.css"; // same fields + button styles as onboarding
import "./settings.css";

// The settings pages you open from the Settings card on Profile:
// /settings/privacy, /settings/notifications, /settings/preferences,
// /settings/emergency and /settings/help.
// Everything is saved in the same place as the profile (lib/profileStorage.js).

const titles = {
  privacy: "Privacy & safety",
  notifications: "Notifications",
  preferences: "Hiking preferences",
  emergency: "Emergency information",
  help: "Help & about",
};

export default function Settings() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => loadProfile() ?? {});
  const [toast, setToast] = useState("");
  const closeToast = useCallback(() => setToast(""), []);

  // Unknown section, e.g. /settings/banana → 404
  if (!titles[section]) return <NotFound />;

  // Change one setting and save it straight away
  function update(field, value) {
    const next = { ...profile, [field]: value };
    setProfile(next);
    saveProfile(next);
  }

  function handleSave(event) {
    event.preventDefault();
    saveProfile(profile);
    setToast("Emergency contact saved");
  }

  return (
    <main className="settings">
      <header className="settings__header">
        <button type="button" className="settings__back" onClick={() => navigate("/profile")} aria-label="Back to profile">
          <ArrowLeftIcon size={24} />
        </button>
        <h1 className="settings__title">{titles[section]}</h1>
      </header>

      {section === "privacy" && (
        <div className="settings__list">
          <Toggle
            label="Show my profile to other hikers"
            hint="When off, only buddies you've hiked with can see you."
            checked={profile.showProfile ?? true}
            onChange={(v) => update("showProfile", v)}
          />
          <Toggle
            label="Share my location during hikes"
            hint="Only with the people in your hiking group."
            checked={profile.shareLocation ?? false}
            onChange={(v) => update("shareLocation", v)}
          />
          <Toggle
            label="Show my age on my profile"
            checked={profile.showAge ?? true}
            onChange={(v) => update("showAge", v)}
          />
        </div>
      )}

      {section === "notifications" && (
        <div className="settings__list">
          <Toggle
            label="Hiking invitations"
            hint="When a buddy invites you to a hike."
            checked={profile.notifyInvites ?? true}
            onChange={(v) => update("notifyInvites", v)}
          />
          <Toggle
            label="Messages"
            checked={profile.notifyMessages ?? true}
            onChange={(v) => update("notifyMessages", v)}
          />
          <Toggle
            label="Trail updates"
            hint="New trails near you and changes to saved trails."
            checked={profile.notifyTrails ?? false}
            onChange={(v) => update("notifyTrails", v)}
          />
        </div>
      )}

      {section === "preferences" && (
        <div className="settings__list">
          <ChoiceGroup
            label="Preferred difficulty"
            options={["Easy", "Moderate", "Hard"]}
            value={profile.prefDifficulty}
            onChange={(v) => update("prefDifficulty", v)}
          />
          <ChoiceGroup
            label="Distance"
            options={["Under 5 km", "5–10 km", "10 km +"]}
            value={profile.prefDistance}
            onChange={(v) => update("prefDistance", v)}
          />
          <ChoiceGroup
            label="Group size"
            options={["Solo", "2–4 people", "5 +"]}
            value={profile.prefGroup}
            onChange={(v) => update("prefGroup", v)}
          />
          <p className="settings__note">Your choices are saved automatically.</p>
        </div>
      )}

      {/* Same fields as the last onboarding step */}
      {section === "emergency" && (
        <form className="settings__list" onSubmit={handleSave}>
          <p className="settings__intro">
            We'll reach this person when you press SOS while hiking.
          </p>
          <label className="field">
            <span className="field__label">Contact's name</span>
            <input
              className="field__input"
              placeholder="Contact’s name"
              value={profile.contactName ?? ""}
              onChange={(e) => setProfile({ ...profile, contactName: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="field__label">Phone number</span>
            <input
              className="field__input"
              type="tel"
              placeholder="+45"
              value={profile.contactPhone ?? ""}
              onChange={(e) => setProfile({ ...profile, contactPhone: e.target.value })}
            />
            <span className="field__hint">
              Only used in an emergency. We do not message them otherwise.
            </span>
          </label>
          <button type="submit" className="onboarding__button">
            Save
          </button>
        </form>
      )}

      {section === "help" && (
        <div className="settings__list">
          <h2 className="settings__subheading">FAQs</h2>
          <Faq question="How do I earn stamps?">
            Complete trails to collect stamps. Every 5 stamps unlock a discount from one of our partners.
          </Faq>
          <Faq question="How do I find a hiking buddy?">
            Go to Explore, tap a hiking buddy to see her profile and press “Invite to hike”.
          </Faq>
          <Faq question="Who can see my location?">
            Only the people in your hiking group, and only if you turn it on in Privacy & safety.
          </Faq>
          <Faq question="What happens when I press SOS?">
            We contact the emergency contact you added in Emergency information.
          </Faq>

          <h2 className="settings__subheading">Contact</h2>
          <p className="settings__text">
            Questions or feedback? A contact form is coming soon. Until then, ask us
            in the community or leave feedback after your hike.
          </p>

          <h2 className="settings__subheading">Community guidelines</h2>
          <p className="settings__text">
            Be kind, respect nature, leave no trace and look out for each other on the trail. 💚
          </p>

          <p className="settings__version">Forester · version 1.0</p>
        </div>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </main>
  );
}

/* Small helpers, only used on this page */

// On/off switch
function Toggle({ label, hint, checked, onChange }) {
  return (
    <label className="settings-toggle">
      <span>
        <span className="settings-toggle__label">{label}</span>
        {hint && <span className="settings-toggle__hint">{hint}</span>}
      </span>
      <input
        type="checkbox"
        role="switch"
        className="settings-toggle__switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

// Row of chips where you pick one
function ChoiceGroup({ label, options, value, onChange }) {
  return (
    <fieldset className="settings-choice">
      <legend className="field__label">{label}</legend>
      <div className="settings-choice__chips">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={value === option ? "chip chip--selected" : "chip"}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// Question that opens to show the answer
function Faq({ question, children }) {
  return (
    <details className="settings-faq">
      <summary>{question}</summary>
      <p>{children}</p>
    </details>
  );
}
