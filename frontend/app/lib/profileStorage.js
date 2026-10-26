// Saves and reads the user's profile in the browser (localStorage).
// Onboarding writes it, the Profile page reads it.
// Later this can be swapped for a Supabase "profiles" table.

const KEY = "hikingProfile";

export function loadProfile() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    // Storage can be full or blocked — the app still works, it just won't remember.
  }
}
