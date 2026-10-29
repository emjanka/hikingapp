import { Link } from "react-router";
import BlogCard from "./blogCard";
import "./blogRow.css";

export default function BlogRow({ title, blogs, seeAllTo }) {
  const link = seeAllTo ?? `/blog/category/${encodeURIComponent(title)}`;
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