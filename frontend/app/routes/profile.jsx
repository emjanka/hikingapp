import { Link, useLoaderData } from "react-router";
import {
  UserIcon,
  PencilSimpleIcon,
  FootprintsIcon,
  UsersThreeIcon,
  MedalIcon,
  MountainsIcon,
  SunHorizonIcon,
  ShieldCheckIcon,
  BellRingingIcon,
  SirenIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
import Stamp from "../components/Stamp";
import SettingsRow from "../components/SettingsRow";
import HikeHistoryCard from "../components/HikeHistoryCard";
import { loadProfile } from "../lib/profileStorage";
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

const stamps = [
  { label: "First steps", Icon: FootprintsIcon },
  { label: "Hill seeker", Icon: MountainsIcon },
  { label: "Golden hour", Icon: SunHorizonIcon },
  { label: "Stamp" },
  { label: "Stamp" },
];

const hikeHistory = [
  { name: "Hærvejen Countryside", region: "Jutland", distance: "8 km", elevation: "+ 60 m", difficulty: "Easy", image: "/images/hikebackpack.jpg" },
  { name: "Stevns Klint", region: "South Zealand", distance: "6 km", elevation: "+ 50 m", difficulty: "Easy", image: "/images/packinghiking.jpg" },
  { name: "Møns Klint", region: "Møn, Zealand", distance: "5 km", elevation: "+ 150 m", difficulty: "Moderate", image: "/images/hikebackpack.jpg" },
  { name: "Thy Dune", region: "North Zealand", distance: "6 km", elevation: "+ 40 m", difficulty: "Easy", image: "/images/packinghiking.jpg" },
];

// Runs in the browser before the page shows (same pattern as the other pages)
export async function clientLoader() {
  const saved = loadProfile();
  return { profile: saved || exampleProfile, isExample: !saved };
}

export default function Profile() {
  const { profile, isExample } = useLoaderData();

  return (
    <main className="profile">
      <div className="profile__header">
        <h1 className="profile__title">Profile</h1>
        <Link to="/onboarding" className="profile__edit" aria-label="Edit profile">
          <PencilSimpleIcon size={24} />
        </Link>
      </div>

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

      {/* Stamp collection */}
      <section className="profile__section">
        <div className="profile__heading-row">
          <h2 className="profile__heading">Stamp collection</h2>
          <Link to="#" className="profile__small-link">Redeem code &gt;</Link>
        </div>
        <div className="profile__scroll-row">
          {stamps.map((stamp, i) => (
            <Stamp key={i} label={stamp.label} Icon={stamp.Icon} />
          ))}
        </div>
      </section>

      {/* Hike history */}
      <section className="profile__section">
        <h2 className="profile__heading">My hike history</h2>
        <div className="profile__scroll-row">
          {hikeHistory.map((hike) => (
            <HikeHistoryCard key={hike.name} {...hike} />
          ))}
        </div>
      </section>

      {/* Settings */}
      <section className="profile__section">
        <h2 className="profile__heading">Settings</h2>
        <div className="profile__settings">
          <SettingsRow Icon={PencilSimpleIcon} title="Edit profile" text="Update your photo, bio, age, and hiking level" to="/onboarding" />
          <SettingsRow Icon={ShieldCheckIcon} title="Privacy & safety" text="Manage profile visibility, location sharing" />
          <SettingsRow Icon={BellRingingIcon} title="Notifications" text="Hiking invitations, messages, and trail updates" />
          <SettingsRow Icon={UsersThreeIcon} title="Hiking preferences" text="Preferred difficulty, distance, and group size" />
          <SettingsRow Icon={SirenIcon} title="Emergency information" text="Emergency contact and essential safety details" />
          <SettingsRow Icon={QuestionIcon} title="Help & about" text="FAQs, contact, community guidelines, and app version" />
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
