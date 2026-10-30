import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ArrowLeft, CameraPlus, Path } from "@phosphor-icons/react";
import TrailCreatedPopup from "../components/Trailcreatedpopup";
import "./CreateTrail.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// The three levels a user can choose (same text as the "level" column)
const LEVELS = ["Easy", "Moderate", "Hard"];

// Loads the existing trails for the "Pick a trail to fill in details" menu
export async function clientLoader() {
  const response = await fetch(`${supabaseUrl}/rest/v1/trails?select=*`, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
  });

  if (!response.ok) {
    throw new Error("Could not load trails");
  }

  return { trails: await response.json() };
}

// Uploads a photo to the Supabase Storage bucket "trail-photos"
// and returns its public address.
async function uploadPhoto(file) {
  const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
  const fileName = `${Date.now()}-${safeName}`;

  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/trail-photos/${fileName}`,
    {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": file.type,
      },
      body: file,
    }
  );

  if (!response.ok) {
    throw new Error("Could not upload the photo");
  }

  return `${supabaseUrl}/storage/v1/object/public/trail-photos/${fileName}`;
}

export default function CreateTrail() {
  const { trails } = useLoaderData();
  const navigate = useNavigate();

  // Text fields
  const [form, setForm] = useState({
    name: "",
    scheduledAt: "",
    meetingPoint: "",
    length: "",
    elevation: "",
  });
  const [levels, setLevels] = useState([]); // e.g. ["Easy", "Moderate"]
  const [photoFile, setPhotoFile] = useState(null); // file chosen by the user
  const [photoPreview, setPhotoPreview] = useState(null); // what the box shows
  const [baseTrailId, setBaseTrailId] = useState(""); // trail used to pre-fill
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false); // shows the pop-up

  // Updates one text field
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // Adds or removes a level ("Choose one or more")
  function toggleLevel(level) {
    setLevels(
      levels.includes(level)
        ? levels.filter((item) => item !== level)
        : [...levels, level]
    );
  }

  // The user picked a photo from their device
  function handlePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  // Fills the form from an existing trail
  function handlePickTrail(event) {
    const trail = trails.find((item) => String(item.id) === event.target.value);
    setBaseTrailId(event.target.value);
    if (!trail) return;

    setForm({
      ...form,
      name: trail.name,
      length: trail.length_km,
      elevation: trail.elevation_gain,
    });
    setLevels(trail.level ? [trail.level] : []);
    setPhotoFile(null);
    setPhotoPreview(trail.image_url);
  }

  // Saves the trail in the "group_trails" table
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please give your trail a name.");
      return;
    }
    if (levels.length === 0) {
      setError("Please choose at least one level.");
      return;
    }

    setSubmitting(true);
    try {
      // Upload the photo first (if any), otherwise reuse the picked trail's photo
      const imageUrl = photoFile ? await uploadPhoto(photoFile) : photoPreview;

      const response = await fetch(`${supabaseUrl}/rest/v1/group_trails`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          scheduled_at: form.scheduledAt
            ? new Date(form.scheduledAt).toISOString()
            : null,
          meeting_point: form.meetingPoint || null,
          length_km: form.length ? Number(form.length) : null,
          elevation_gain: form.elevation ? Number(form.elevation) : null,
          levels,
          image_url: imageUrl,
          base_trail_id: baseTrailId ? Number(baseTrailId) : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not save the trail");
      }

      setCreated(true); // show the success pop-up
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="create-trail">
      <header className="create-trail__header">
        <button
          type="button"
          className="create-trail__back"
          aria-label="Back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="create-trail__title">Create a Trail</h1>
      </header>

      <form onSubmit={handleSubmit}>
        {/* Photo box: tapping it opens the file picker */}
        <label className="create-trail__photo">
          {photoPreview ? (
            <img src={photoPreview} alt="Chosen trail" />
          ) : (
            <>
              <CameraPlus size={56} />
              <span>Add photo (optional)</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={handlePhoto} hidden />
        </label>

        {/* Pre-fill the form from an existing trail */}
        <div className="create-trail__pick">
          <Path size={20} />
          <select value={baseTrailId} onChange={handlePickTrail}>
            <option value="">Pick a trail to fill in details</option>
            {trails.map((trail) => (
              <option key={trail.id} value={trail.id}>
                {trail.name}
              </option>
            ))}
          </select>
        </div>

        <label className="create-trail__label" htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="create-trail__input"
          placeholder="Mols Mountains Trail"
          value={form.name}
          onChange={handleChange}
        />

        <label className="create-trail__label" htmlFor="scheduledAt">
          Date and Time
        </label>
        <input
          id="scheduledAt"
          name="scheduledAt"
          type="datetime-local"
          className="create-trail__input"
          value={form.scheduledAt}
          onChange={handleChange}
        />

        <label className="create-trail__label" htmlFor="meetingPoint">
          Location
        </label>
        <input
          id="meetingPoint"
          name="meetingPoint"
          className="create-trail__input"
          placeholder="Meeting Point"
          value={form.meetingPoint}
          onChange={handleChange}
        />

        {/* Length and elevation side by side */}
        <div className="create-trail__row">
          <div>
            <label className="create-trail__label" htmlFor="length">
              Length (km)
            </label>
            <input
              id="length"
              name="length"
              type="number"
              step="0.1"
              min="0"
              className="create-trail__input"
              placeholder="5.6"
              value={form.length}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="create-trail__label" htmlFor="elevation">
              Elevation (m)
            </label>
            <input
              id="elevation"
              name="elevation"
              type="number"
              step="0.1"
              min="0"
              className="create-trail__input"
              placeholder="26.2"
              value={form.elevation}
              onChange={handleChange}
            />
          </div>
        </div>

        <p className="create-trail__label">Level</p>
        <p className="create-trail__hint">Choose one or more</p>
        <div className="create-trail__levels">
          {LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              className={`level-pill level-pill--${level.toLowerCase()}${
                levels.includes(level) ? " level-pill--active" : ""
              }`}
              onClick={() => toggleLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>

        {error && <p className="create-trail__error">{error}</p>}

        <button
          type="submit"
          className="create-trail__submit"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Trail"}
        </button>
      </form>

      {/* Success pop-up; closing it goes back to the Trails page */}
      {created && <TrailCreatedPopup onClose={() => navigate("/trails")} />}
    </main>
  );
}