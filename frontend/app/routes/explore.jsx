import { useLoaderData } from "react-router";
import Section from "../components/Section";
import "./explore.css";

export default function Explore() {
  return (
    <main className="explore">
      <Section title="Hiking buddies" seeAllTo="/buddies">
        {/* BuddyAvatar components go here */}
      </Section>

      <Section title="Trails for you" seeAllTo="/trails">
        {/* FeaturedTrailCard */}
      </Section>

      <Section title="Period problems?" seeAllTo="/blog">
        {/* blogCard */}
      </Section>

      <Section title="Trails for groups" seeAllTo="/trails">
        {/* GroupTrailCard */}
      </Section>
    </main>
  );
}