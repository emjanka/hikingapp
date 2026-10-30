import { useCallback, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  UserIcon,
  FootprintsIcon,
  PaperPlaneTiltIcon,
  ChatCircleIcon,
} from "@phosphor-icons/react";
import Toast from "../components/Toast";
import { withDetails } from "../lib/buddyDetails";
import "./profile.css"; // same look as your own profile
import "./buddy.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Runs in the browser before the page shows: loads one buddy by the id in the address
export async function clientLoader({ params }) {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/hikingbuddies?id=eq.${params.id}&select=*`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
  );
  if (!response.ok) throw new Error("Could not load this buddy");

  const rows = await response.json();
  // No buddy with this id → show the 404 page
  if (rows.length === 0) throw new Response("Not found", { status: 404 });

  return { buddy: withDetails(rows[0]) };
}

// A hiking buddy's profile (opened by tapping a buddy on Explore or /buddies)
export default function Buddy() {
  const { buddy } = useLoaderData();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");
  const [invited, setInvited] = useState(false);
  const closeToast = useCallback(() => setToast(""), []);

  function handleInvite() {
    setInvited(true);
    setToast(`Hike invite sent to ${buddy.name}! 🥾`);
  }

  return (
    <main className="profile">
      <div className="buddy-page__header">
        <button type="button" className="buddy-page__back" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeftIcon size={24} />
        </button>
        <h1 className="profile__title">Hiking buddy</h1>
      </div>

      {/* Photo + name + facts (same layout as your own profile) */}
      <section className="profile__intro">
        <div className="profile__photo">
          {buddy.photo ? <img src={buddy.photo} alt={buddy.name} /> : <UserIcon size={56} />}
        </div>
        <div>
          <h2 className="profile__name">{buddy.name}</h2>
          <dl className="profile__facts">
            <Fact label="Age" value={buddy.age} />
            <Fact label="Location" value={buddy.location} />
            <Fact label="Hiking level" value={buddy.level} />
          </dl>
        </div>
      </section>

      <div className="buddy-page__actions">
        <button
          type="button"
          className="buddy-page__invite"
          onClick={handleInvite}
          disabled={invited}
        >
          <PaperPlaneTiltIcon size={18} />
          {invited ? "Invite sent" : "Invite to hike"}
        </button>
        <button
          type="button"
          className="buddy-page__message"
          onClick={() => setToast("Messages are coming soon 💬")}
        >
          <ChatCircleIcon size={18} />
          Message
        </button>
      </div>

      <hr className="profile__divider" />

      <section className="profile__section">
        <h2 className="profile__heading">About {buddy.name}</h2>
        <p className="profile__about">{buddy.about || "Nothing here yet."}</p>

        <div className="buddy-page__stat">
          <FootprintsIcon size={20} className="profile__stat-icon" />
          <span className="profile__stat-number">{buddy.trailsCompleted}</span>
          <span className="profile__stat-label">Trails completed</span>
        </div>
      </section>

      {toast && <Toast message={toast} onClose={closeToast} />}
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
