import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BlogRow from "../components/blogRow";
import "./blog.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) {
        console.error(error);
      } else {
        setBlogs(data);
      }
    }
    getBlogs();
  }, []);

  const categories = [...new Set(blogs.map((blog) => blog.category))];

  return (
    <main className="blog-page">
      <h1>Blog</h1>
      {categories.map((category) => (
        <BlogRow
          key={category}
          title={category}
          blogs={blogs.filter((blog) => blog.category === category)}
        />
      ))}
    </main>
  );
}