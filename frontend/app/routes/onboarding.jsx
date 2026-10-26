import { useState } from "react";
import { useNavigate } from "react-router";
import { CameraPlusIcon, MapPinIcon } from "@phosphor-icons/react";
import OnboardingHeader from "../components/OnboardingHeader";
import { loadProfile, saveProfile } from "../lib/profileStorage";
import "./onboarding.css";

// Options for step 2 and 3 (same text as in Figma)
const trailTypes = [
  "Mountains",
  "Forest",
  "Coastal",
  "Waterfalls",
  "Sunrise",
  "Sunset",
  "Day hikes",
  "Overnight",
  "Easy walks",
];

const levels = [
  { value: "Beginner", text: "New to hiking or just getting started." },
  { value: "Intermediate", text: "You hike now and then and know the basics." },
  { value: "Experienced", text: "You hike often and love a challenge." },
];

const TOTAL_STEPS = 4;

const emptyProfile = {
  photo: "",
  name: "",
  age: "",
  about: "",
  location: "",
  trailTypes: [],
  level: "",
  contactName: "",
  contactPhone: "",
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  // Start with what was saved before (so "Edit profile" opens pre-filled)
  const [profile, setProfile] = useState(() => ({ ...emptyProfile, ...loadProfile() }));

  // Update one field, e.g. updateField("name", "Sofia")
  function updateField(field, value) {
    setProfile((old) => ({ ...old, [field]: value }));
  }

  // Step 2: click a chip to select it, click again to unselect
  function toggleTrailType(type) {
    const list = profile.trailTypes;
    updateField(
      "trailTypes",
      list.includes(type) ? list.filter((t) => t !== type) : [...list, type]
    );
  }

  // Step 1: turn the chosen photo into a small image we can save
  function handlePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const size = 240;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      // Crop the middle square of the photo
      const side = Math.min(img.width, img.height);
      canvas
        .getContext("2d")
        .drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      updateField("photo", canvas.toDataURL("image/jpeg", 0.8));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  }

  function handleBack() {
    if (step === 1) navigate(-1);
    else setStep(step - 1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      saveProfile(profile);
      navigate("/profile");
    }
  }

  return (
    <main className="onboarding">
      <OnboardingHeader step={step} total={TOTAL_STEPS} onBack={handleBack} />

      <form className="onboarding__form" onSubmit={handleSubmit}>
        {/* ---------- Step 1: about you ---------- */}
        {step === 1 && (
          <div className="onboarding__content">
            <label className="photo-picker">
              <span className="photo-picker__circle">
                {profile.photo ? (
                  <img src={profile.photo} alt="Your photo" />
                ) : (
                  <CameraPlusIcon size={50} />
                )}
              </span>
              <span className="photo-picker__text">Add photo (optional)</span>
              <input type="file" accept="image/*" onChange={handlePhoto} hidden />
            </label>

            <Field label="Name">
              <input
                className="field__input"
                placeholder="First name"
                value={profile.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </Field>

            <Field label="Age">
              <input
                className="field__input"
                type="number"
                min="13"
                max="120"
                placeholder="Your age"
                value={profile.age}
                onChange={(e) => updateField("age", e.target.value)}
              />
            </Field>

            <Field label="About you">
              <textarea
                className="field__input field__input--textarea"
                placeholder="Who are you?"
                rows={1}
                value={profile.about}
                onChange={(e) => updateField("about", e.target.value)}
              />
            </Field>

            <Field label="Location">
              <div className="field__input-wrap">
                <input
                  className="field__input"
                  placeholder="Where do you hike?"
                  value={profile.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
                <MapPinIcon className="field__icon" size={28} />
              </div>
            </Field>
          </div>
        )}

        {/* ---------- Step 2: trail types ---------- */}
        {step === 2 && (
          <div className="onboarding__content">
            <StepTitle title="What trails do you like?" subtitle="Pick as many as you like!" />
            <div className="chips">
              {trailTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={profile.trailTypes.includes(type) ? "chip chip--selected" : "chip"}
                  aria-pressed={profile.trailTypes.includes(type)}
                  onClick={() => toggleTrailType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Step 3: experience level ---------- */}
        {step === 3 && (
          <div className="onboarding__content">
            <StepTitle
              title="How experienced are you?"
              subtitle="This helps us match you with the right trails and groups."
            />
            <div className="level-list">
              {levels.map((level) => (
                <label
                  key={level.value}
                  className={profile.level === level.value ? "level level--selected" : "level"}
                >
                  <span>
                    <span className="level__title">{level.value}</span>
                    <span className="level__text">{level.text}</span>
                  </span>
                  <input
                    type="radio"
                    name="level"
                    className="level__radio"
                    value={level.value}
                    checked={profile.level === level.value}
                    onChange={() => updateField("level", level.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Step 4: emergency contact ---------- */}
        {step === 4 && (
          <div className="onboarding__content">
            <StepTitle
              title="Add an emergency contact"
              subtitle="So we can reach someone when you press SOS while hiking."
            />
            <Field label="Name">
              <input
                className="field__input"
                placeholder="Contact’s name"
                value={profile.contactName}
                onChange={(e) => updateField("contactName", e.target.value)}
              />
            </Field>
            <Field
              label="Phone number"
              hint="Only used in an emergency. We do not message them otherwise."
            >
              <input
                className="field__input"
                type="tel"
                placeholder="+45"
                value={profile.contactPhone}
                onChange={(e) => updateField("contactPhone", e.target.value)}
              />
            </Field>
          </div>
        )}

        <button type="submit" className="onboarding__button">
          {step === TOTAL_STEPS ? "Finish" : "Continue"}
        </button>
      </form>
    </main>
  );
}

/* Small helpers, only used on this page */

function StepTitle({ title, subtitle }) {
  return (
    <div className="step-title">
      <h1 className="step-title__heading">{title}</h1>
      <p className="step-title__sub">{subtitle}</p>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}
