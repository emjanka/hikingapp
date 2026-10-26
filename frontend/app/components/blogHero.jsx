import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import SaveButton from "./saveButton";
import "./blogHero.css";

export default function BlogHero({ imageUrl }) {
  const navigate = useNavigate();
  const imageStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <div className="blog-hero" style={imageStyle}>
      <button
        type="button"
        className="blog-hero__back"
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        <ArrowLeftIcon size={20} />
      </button>
      <SaveButton />
    </div>
  );
}