import { useLoaderData, useNavigate } from "react-router";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import BlogCard from "../components/blogCard";
import TrailCard from "../components/TrailCard";
import SavedEmpty from "../components/savedEmpty";
import { getSavedIds } from "../lib/savedItems";
import "./saved.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
};

async function fetchSaved(table, ids) {
  if (ids.length === 0) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${table}?select=*&id=in.(${ids.join(",")})`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(`Could not load saved ${table}`);
  }

  return response.json();
}

export async function clientLoader() {
  const [trails, blogs] = await Promise.all([
    fetchSaved("trails", getSavedIds("trail")),
    fetchSaved("blogs", getSavedIds("blog")),
  ]);

  return { trails, blogs };
}

export default function Saved() {
  const { trails, blogs } = useLoaderData();
  const navigate = useNavigate();

  const hasTrails = trails.length > 0;
  const hasBlogs = blogs.length > 0;
  const nothingSaved = !hasTrails && !hasBlogs;

  return (
    <main className="saved-page">
      <div className="saved-page__header">
        <button
          type="button"
          className="saved-page__back"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <h1>{nothingSaved ? "Saved trails and blogs" : "Saved Trails"}</h1>
      </div>

      {nothingSaved ? (
        <SavedEmpty message="You have nothing saved, go and like some!" to="/" />
      ) : (
        <>
          {hasTrails ? (
            <div className="saved-page__grid">
              {trails.map((trail) => (
                <TrailCard key={trail.id} trail={trail} />
              ))}
            </div>
          ) : (
            <SavedEmpty
              message="You have no saved trails, go and like some!"
              to="/"
            />
          )}

          <section className="saved-page__section">
            <h2>Saved Blogs</h2>
            {hasBlogs ? (
              <div className="saved-page__grid">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <SavedEmpty
                message="You have no saved blogs, go and like some!"
                to="/blog"
              />
            )}
          </section>
        </>
      )}
    </main>
  );
}