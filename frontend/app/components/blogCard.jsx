import { Link } from "react-router";
import { ClockIcon } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import "./blogCard.css";

export default function BlogCard({ blog }) {
  const imageStyle = blog.image_url
    ? { backgroundImage: `url(${blog.image_url})` }
    : {};

  return (
    <Link to={`/blog/${blog.id}`} className="blog-card" style={imageStyle}>
      <SaveButton />
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