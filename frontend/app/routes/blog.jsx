import { useLoaderData } from "react-router";
import BlogRow from "../components/blogRow";
import "./blog.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Loads all blogs from Supabase before the page shows
export async function clientLoader() {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/blogs?select=id,title,category,image_url,read_time`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Could not load blogs");
  }

  const blogs = await response.json();
  return { blogs };
}

// The blog page with one row for each category
export default function Blog() {
  const { blogs } = useLoaderData();

  // Get each category once
  const categories = [...new Set(blogs.map((blog) => blog.category))];

  return (
    <main className="blog-page">
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