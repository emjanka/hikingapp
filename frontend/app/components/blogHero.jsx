import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import SaveButton from "./saveButton";
import "./blogHero.css";

// The big photo at the top of a blog, with a back button and a heart
export default function BlogHero({ imageUrl, blogId }) {
  const navigate = useNavigate();
  const imageStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <div className="blog-hero" style={imageStyle}>
      {/* Goes back to the previous page */}
      <button
        type="button"
        className="blog-hero__back"
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        <ArrowLeftIcon size={20} />
      </button>
      <SaveButton type="blog" id={blogId} />
    </div>
  );
}