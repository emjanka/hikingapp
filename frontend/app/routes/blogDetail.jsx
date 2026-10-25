import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../lib/supabaseClient";
import BlogHero from "../components/blogHero";
import ArticleMeta from "../components/articleMeta";
import "./blogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function getBlog() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setBlog(data);
      }
    }
    getBlog();
  }, [id]);

  if (!blog) {
    return <p className="blog-detail__loading">Loading...</p>;
  }

  const date = new Date(blog.published_at).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <main className="blog-detail">
      <BlogHero imageUrl={blog.image_url} />
      <article className="blog-detail__sheet">
        <h1>{blog.title}</h1>
        <ArticleMeta readTime={blog.read_time} date={date} author={blog.author} />
        <div className="blog-detail__body">
          {blog.body.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}