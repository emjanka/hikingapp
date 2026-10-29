import { Link, useLoaderData } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import BlogCard from "../components/blogCard";
import "./blogCategory.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
};

export async function clientLoader({ params }) {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/blogs?select=*&category=eq.${encodeURIComponent(params.category)}`,
    { headers },
  );

  if (!response.ok) {
    throw new Error("Could not load blogs");
  }

  const blogs = await response.json();
  return { category: params.category, blogs };
}

export default function BlogCategory() {
  const { category, blogs } = useLoaderData();

  return (
    <main className="blog-category">
      <div className="blog-category__header">
        <Link to="/blog" className="blog-category__back" aria-label="Back">
          <ArrowLeftIcon size={20} />
        </Link>
        <h2>{category}</h2>
      </div>
      <div className="blog-category__grid">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </main>
  );
}