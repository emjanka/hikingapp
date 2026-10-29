import { ClockIcon } from "@phosphor-icons/react/dist/csr/Clock";
import "./articleMeta.css";

// Shows reading time, date and author under the blog title
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