import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { supabase } from "../lib/supabaseClient";
import BlogCard from "../components/blogCard";
import "./blogCategory.css";

export default function BlogCategory() {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("category", category);
      if (error) {
        console.error(error);
      } else {
        setBlogs(data);
      }
    }
    getBlogs();
  }, [category]);

  return (
    <main className="blog-category">
      <div className="blog-category__header">
        <Link to="/blog" className="blog-category__back" aria-label="Back">
          <ArrowLeftIcon size={20} />
        </Link>
        <h1>{category}</h1>
      </div>
      <div className="blog-category__grid">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </main>
  );
}