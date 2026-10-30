// Example profile details for the hiking buddies.
// The Supabase "hikingbuddies" table only has a name and a photo so far,
// so these fill in the rest of the profile. If you add columns with the
// same names (age, location, level, about, trails_completed) to the table,
// the real values are used instead.

const examples = {
  anne: { age: 27, location: "Copenhagen", level: "Intermediate", trails: 14, about: "Weekend hiker and coffee lover ☕️ Always looking for someone to explore new trails with, rain or shine." },
  erica: { age: 24, location: "Aarhus", level: "Beginner", trails: 3, about: "New to hiking and a bit nervous about going alone. Looking for kind people to start easy walks with 🌿" },
  yvette: { age: 31, location: "Odense", level: "Experienced", trails: 42, about: "I've hiked in Norway and the Alps, now exploring Denmark's coast. Happy to share tips with beginners!" },
  rose: { age: 26, location: "Copenhagen", level: "Intermediate", trails: 11, about: "Sunset hikes, good snacks and long talks. Let's find a quiet forest trail together 🌅" },
  frida: { age: 22, location: "Roskilde", level: "Beginner", trails: 5, about: "Student who needs more fresh air in her life! Up for short day hikes and picnic stops." },
  frederica: { age: 29, location: "Aalborg", level: "Experienced", trails: 30, about: "Love early mornings and steep hills ⛰️ I usually hike on Sundays, join me!" },
  josie: { age: 25, location: "Silkeborg", level: "Intermediate", trails: 17, about: "Lakes, forests and a good playlist. I'm always happy to meet new hiking buddies 💕" },
};

// Picks the example that matches the buddy's name (e.g. "Rose" → rose)
export function withDetails(buddy) {
  const example = examples[buddy.buddies_name?.toLowerCase()] ?? {};
  return {
    id: buddy.id,
    name: buddy.buddies_name,
    photo: buddy.avatar_url ? `/${buddy.avatar_url}` : "",
    age: buddy.age ?? example.age,
    location: buddy.location ?? example.location,
    level: buddy.level ?? example.level,
    about: buddy.about ?? example.about,
    trailsCompleted: buddy.trails_completed ?? example.trails ?? 0,
  };
}
