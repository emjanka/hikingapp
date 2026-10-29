import {
  FootprintsIcon,
  MountainsIcon,
  SunHorizonIcon,
  WavesIcon,
  TreeEvergreenIcon,
  SunIcon,
  UsersThreeIcon,
  PersonSimpleHikeIcon,
  MoonStarsIcon,
  CloudRainIcon,
  AnchorIcon,
} from "@phosphor-icons/react";

// All stamps a user can collect (same order as in Figma)
export const allStamps = [
  { id: "first-steps", label: "First steps", Icon: FootprintsIcon },
  { id: "hill-seeker", label: "Hill seeker", Icon: MountainsIcon },
  { id: "golden-hour", label: "Golden hour", Icon: SunHorizonIcon },
  { id: "lake-lover", label: "Lake lover", Icon: WavesIcon },
  { id: "forest-walker", label: "Forest walker", Icon: TreeEvergreenIcon },
  { id: "summit", label: "Summit", Icon: MountainsIcon },
  { id: "sunrise", label: "Sunrise", Icon: SunIcon },
  { id: "group-hike", label: "Group hike", Icon: UsersThreeIcon },
  { id: "solo-hike", label: "Solo hike", Icon: PersonSimpleHikeIcon },
  { id: "night-sky", label: "Night sky", Icon: MoonStarsIcon },
  { id: "rain-or-shine", label: "Rain or shine", Icon: CloudRainIcon },
  { id: "shoreline", label: "Shoreline", Icon: AnchorIcon },
];

// How many stamps you need for a discount
export const STAMPS_FOR_DISCOUNT = 5;

// The discount you get (sponsor from the blog)
export const discount = {
  partner: "Saalt",
  url: "https://saalt.com",
  percent: 10,
  code: "SAALT10",
};

// TODO: replace with real data (e.g. a Supabase table of completed trails).
// For now: the first 3 stamps are earned.
// Tip for demos: open /stamps?demo=done to see the "5 of 5" + discount version.
export function getEarnedIds() {
  const demoDone =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("demo") === "done";
  const earnedCount = demoDone ? 5 : 3;
  return allStamps.slice(0, earnedCount).map((stamp) => stamp.id);
}
