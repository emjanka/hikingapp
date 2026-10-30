import { Link, useLoaderData } from "react-router";
import {
  UserIcon,
  PencilSimpleIcon,
  FootprintsIcon,
  UsersThreeIcon,
  MedalIcon,
  ShieldCheckIcon,
  BellRingingIcon,
  SirenIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
import Stamp from "../components/Stamp";
import StampProgress from "../components/StampProgress";
import SettingsRow from "../components/SettingsRow";
import TrailCard from "../components/TrailCard";
import { loadProfile } from "../lib/profileStorage";
import { allStamps, getEarnedIds, STAMPS_FOR_DISCOUNT } from "../lib/stamps";
import "./profile.css";

// Example data from Figma, shown until the user has done the onboarding
const exampleProfile = {
  photo: "",
  name: "Sofia Andersen",
  age: "23",
  location: "Aarhus",
  level: "Beginner",
  about:
    "A nature-loving girl who believes the best adventures are the ones we share. 🌿 I'm here to discover beautiful trails, meet like-minded girls, and feel more confident exploring the outdoors. Always up for a sunset hike, a good playlist, and a little adventure! 😊💕",
};

// TODO: replace with real data from Supabase when there's a table for it
const stats = { trails: 10, buddies: 4, badges: 5 };


// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Runs in the browser before the page shows (same pattern as the other pages)
export async function clientLoader() {
  const saved = loadProfile();

  // Hike history: the first 4 trails for now.
  // TODO: only show trails the user has actually hiked.
  // If loading fails, the rest of the profile still shows.
  let hikeHistory = [];
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/trails?select=*&limit=4`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    if (response.ok) hikeHistory = await response.json();
  } catch {
    // no internet / Supabase down → empty hike history
  }

  return { profile: saved || exampleProfile, isExample: !saved, hikeHistory };
}

export default function Profile() {
  const { profile, isExample, hikeHistory } = useLoaderData();

  return (
    <main className="profile">
      {/* The edit button is in the TopNav (top right) */}
      <h1 className="profile__title">Profile</h1>

      {isExample && (
        <Link to="/onboarding" className="profile__setup">
          This is an example profile — tap here to set up yours
        </Link>
      )}

      {/* Photo + name + facts */}
      <section className="profile__intro">
        <div className="profile__photo">
          {profile.photo ? <img src={profile.photo} alt={profile.name} /> : <UserIcon size={56} />}
        </div>
        <div>
          <h2 className="profile__name">{profile.name}</h2>
          <dl className="profile__facts">
            <Fact label="Age" value={profile.age} />
            <Fact label="Location" value={profile.location} />
            <Fact label="Hiking level" value={profile.level} />
          </dl>
        </div>
      </section>

      <hr className="profile__divider" />

      {/* About me + stats */}
      <section className="profile__section">
        <h2 className="profile__heading">About me</h2>
        <p className="profile__about">{profile.about || "Nothing here yet."}</p>

        <div className="profile__stats">
          <Stat Icon={FootprintsIcon} number={stats.trails} label="Trails completed" />
          <Stat Icon={UsersThreeIcon} number={stats.buddies} label="Hiking buddies" />
          <Stat Icon={MedalIcon} number={stats.badges} label="Badges earned" />
        </div>
      </section>

      {/* Your stamps (full page: /stamps) */}
      <YourStamps />

      {/* Hike history */}
      <section className="profile__section">
        <h2 className="profile__heading">My hike history</h2>
        <div className="profile__scroll-row">
          {hikeHistory.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      </section>

      {/* Settings */}
      <section className="profile__section">
        <h2 className="profile__heading">Settings</h2>
        <div className="profile__settings">
          <SettingsRow Icon={PencilSimpleIcon} title="Edit profile" text="Update your photo, bio, age, and hiking level" to="/onboarding" />
          <SettingsRow Icon={ShieldCheckIcon} title="Privacy & safety" text="Manage profile visibility, location sharing" to="/settings/privacy" />
          <SettingsRow Icon={BellRingingIcon} title="Notifications" text="Hiking invitations, messages, and trail updates" to="/settings/notifications" />
          <SettingsRow Icon={UsersThreeIcon} title="Hiking preferences" text="Preferred difficulty, distance, and group size" to="/settings/preferences" />
          <SettingsRow Icon={SirenIcon} title="Emergency information" text="Emergency contact and essential safety details" to="/settings/emergency" />
          <SettingsRow Icon={QuestionIcon} title="Help & about" text="FAQs, contact, community guidelines, and app version" to="/settings/help" />
        </div>
      </section>
    </main>
  );
}

function Fact({ label, value }) {
  return (
    <div className="profile__fact">
      <dt>{label}</dt>
      <dd>{value || "–"}</dd>
    </div>
  );
}

function Stat({ Icon, number, label }) {
  return (
    <div className="profile__stat">
      <Icon size={20} className="profile__stat-icon" />
      <span className="profile__stat-number">{number}</span>
      <span className="profile__stat-label">{label}</span>
    </div>
  );
}

// Earned stamps first, then 2 locked "Next stamp" ones (like Figma)
function YourStamps() {
  const earnedIds = getEarnedIds();
  const earned = allStamps.filter((stamp) => earnedIds.includes(stamp.id));
  const count = Math.min(earned.length, STAMPS_FOR_DISCOUNT);

  return (
    <section className="profile__section">
      <div className="profile__heading-row">
        <h2 className="profile__heading">Your stamps</h2>
        <Link to="/stamps" className="profile__small-link">See all &gt;</Link>
      </div>
      <p className="profile__subtext">Complete trails to earn stamps and get discounts</p>

      <Link to="/stamps" className="profile__scroll-row profile__stamps">
        {earned.map((stamp) => (
          <Stamp key={stamp.id} label={stamp.label} Icon={stamp.Icon} />
        ))}
        <Stamp label="Next stamp" locked />
        <Stamp label="Next stamp" locked />
      </Link>

      <StampProgress value={count} max={STAMPS_FOR_DISCOUNT} />
      <p className="profile__subtext profile__subtext--small">
        {count} of {STAMPS_FOR_DISCOUNT} stamps to unlock your next discount
      </p>
    </section>
  );
}
