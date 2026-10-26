import { useLoaderData } from "react-router";
import BlogRow from "../components/blogRow";
import "./blog.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function clientLoader() {
  const response = await fetch(`${supabaseUrl}/rest/v1/blogs?select=*`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load blogs");
  }

  const blogs = await response.json();
  return { blogs };
}

export default function Blog() {
  const { blogs } = useLoaderData();
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