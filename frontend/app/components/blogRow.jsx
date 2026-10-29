import { Link } from "react-router";
import BlogCard from "./blogCard";
import "./blogRow.css";

// One section on the blog page with a heading and a row of cards
export default function BlogRow({ title, blogs, seeAllTo }) {
  // "See all" goes to the category page unless another link is given
  const link = seeAllTo ?? `/blog/category/${encodeURIComponent(title)}`;

  // Only show the first 4 cards, the rest are on the "See all" page
  const visibleBlogs = blogs.slice(0, 4);

  return (
    <section className="blog-row-section">
      <div className="blog-row-section__header">
        <h2>{title}</h2>
        <Link to={link}>See all &gt;</Link>
      </div>
      <div className="blog-row-section__cards">
        {visibleBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}