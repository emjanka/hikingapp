import { Link } from "react-router";
import "./Section.css";

/**
 * A titled section with a "See all" link and a
 * horizontally scrollable row of children.
 */
export default function Section({ title, seeAllTo, children }) {
  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__title">{title}</h2>
        <Link to={seeAllTo} className="section__link">
          See all &gt;
        </Link>
      </div>
      <div className="section__row">{children}</div>
    </section>
  );
}