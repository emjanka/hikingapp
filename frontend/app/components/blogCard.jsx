import { Link } from "react-router";
import { ClockIcon } from "@phosphor-icons/react/dist/csr/Clock";
import SaveButton from "./saveButton";
import "./blogCard.css";

// A card for one blog with a photo, title and reading time
export default function BlogCard({ blog }) {
  // Use the blog's photo as the card background if it has one
  const imageStyle = blog.image_url
    ? { backgroundImage: `url(${blog.image_url})` }
    : {};

  return (
    // Clicking the card opens the blog
    <Link to={`/blog/${blog.id}`} className="blog-card" style={imageStyle}>
      <SaveButton type="blog" id={blog.id} />
      <div className="blog-card__text">
        <h3>{blog.title}</h3>
        <p>
          <ClockIcon size={14} />
          {blog.read_time}
        </p>
      </div>
    </Link>
  );
}