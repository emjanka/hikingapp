import { useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router";
import { ArrowLeftIcon, SlidersHorizontalIcon } from "@phosphor-icons/react";
import SmallTrailCard from "../components/smallTrailCard";
import BlogCard from "../components/blogCard";
import FilterSheet from "../components/FilterSheet";
import { trailFilters, blogFilters } from "../lib/filters";
import "./results.css";

// Supabase connection details come from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function fetchTable(path) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
  });
  if (!response.ok) throw new Error("Could not load results");
  return response.json();
}

// Runs in the browser before the page shows: loads all trails and blogs
export async function clientLoader() {
  const [trails, blogs] = await Promise.all([
    fetchTable("trails?select=*"),
    fetchTable("blogs?select=id,title,category,image_url,read_time"),
  ]);
  return { trails, blogs };
}

// The page you land on after "Show results" in the Filters sheet.
// The ticked filters are in the address, e.g. /results?trail=Beginner+friendly
export default function Results() {
  const { trails, blogs } = useLoaderData();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const pickedTrails = searchParams.getAll("trail");
  const pickedBlogs = searchParams.getAll("blog");

  // Only show the trails section if trail filters were picked (or nothing at all), same for blogs
  const nothingPicked = pickedTrails.length === 0 && pickedBlogs.length === 0;
  const showTrails = nothingPicked || pickedTrails.length > 0;
  const showBlogs = nothingPicked || pickedBlogs.length > 0;

  // A trail must match ALL ticked trail filters
  const trailResults = trails.filter((trail) =>
    trailFilters
      .filter((f) => pickedTrails.includes(f.label))
      .every((f) => f.matches(trail))
  );

  // A blog can match ANY ticked blog category
  const blogResults = pickedBlogs.length
    ? blogs.filter((blog) =>
        blogFilters.filter((f) => pickedBlogs.includes(f.label)).some((f) => f.matches(blog))
      )
    : blogs;

  const total = (showTrails ? trailResults.length : 0) + (showBlogs ? blogResults.length : 0);

  return (
    <main className="results">
      <header className="results__header">
        <Link to="/" className="results__back" aria-label="Back to Explore">
          <ArrowLeftIcon size={24} />
        </Link>
        <h1 className="results__title">Results</h1>
        <button type="button" className="results__edit" onClick={() => setShowFilters(true)}>
          <SlidersHorizontalIcon size={18} /> Filters
        </button>
      </header>

      {/* The filters that are on right now */}
      {!nothingPicked && (
        <div className="results__chips">
          {[...pickedTrails, ...pickedBlogs].map((label) => (
            <span key={label} className="results__chip">{label}</span>
          ))}
        </div>
      )}

      {total === 0 && (
        <div className="results__empty">
          <p>No trails or blogs match these filters yet.</p>
          <button type="button" className="results__empty-button" onClick={() => setShowFilters(true)}>
            Change filters
          </button>
        </div>
      )}

      {showTrails && trailResults.length > 0 && (
        <section className="results__section">
          <h2 className="results__heading">Trails ({trailResults.length})</h2>
          <div className="results__grid">
            {trailResults.map((trail) => (
              <SmallTrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        </section>
      )}

      {showBlogs && blogResults.length > 0 && (
        <section className="results__section">
          <h2 className="results__heading">Blogs ({blogResults.length})</h2>
          <div className="results__grid">
            {blogResults.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      {showFilters && (
        <FilterSheet
          onClose={() => setShowFilters(false)}
          initialTrails={pickedTrails}
          initialBlogs={pickedBlogs}
        />
      )}
    </main>
  );
}
