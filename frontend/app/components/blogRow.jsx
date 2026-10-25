import { Link } from "react-router";
import BlogCard from "./blogCard";
import "./blogRow.css";

export default function BlogRow({ title, blogs }) {
  return (
    <section className="blog-row-section">
      <div className="blog-row-section__header">
        <h2>{title}</h2>
        <Link to={`/blog/category/${encodeURIComponent(title)}`}>See all &gt;</Link>
      </div>
      <div className="blog-row-section__cards">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}