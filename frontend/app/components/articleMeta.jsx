import { ClockIcon } from "@phosphor-icons/react";
import "./articleMeta.css";

export default function ArticleMeta({ readTime, date, author }) {
  return (
    <p className="article-meta">
      <ClockIcon size={16} />
      <span>{readTime}</span>
      <span className="article-meta__dot"></span>
      <span>{date}</span>
      <span className="article-meta__dot"></span>
      <span>{author}</span>
    </p>
  );
}