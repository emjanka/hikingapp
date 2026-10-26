import { useLoaderData } from "react-router";
import BlogHero from "../components/blogHero";
import ArticleMeta from "../components/articleMeta";
import ProductCard from "../components/productCard";
import BlogRow from "../components/blogRow";
import "./blogDetail.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
};

export async function clientLoader({ params }) {
  const [blogResponse, productsResponse, relatedResponse] = await Promise.all([
    fetch(`${supabaseUrl}/rest/v1/blogs?select=*&id=eq.${params.id}`, { headers }),
    fetch(`${supabaseUrl}/rest/v1/blog_products?select=*&blog_id=eq.${params.id}`, { headers }),
    fetch(`${supabaseUrl}/rest/v1/blogs?select=*&id=neq.${params.id}&limit=6`, { headers }),
  ]);

  if (!blogResponse.ok || !productsResponse.ok || !relatedResponse.ok) {
    throw new Error("Could not load the blog");
  }

  const blogs = await blogResponse.json();
  const blog = blogs[0];

  if (!blog) {
    throw new Response("Blog not found", { status: 404 });
  }

  const products = await productsResponse.json();
  const related = await relatedResponse.json();

  return { blog, products, related };
}

export default function BlogDetail() {
  const { blog, products, related } = useLoaderData();

  const date = new Date(blog.published_at).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  const paragraphs = blog.body.split("\n").filter((line) => line.trim() !== "");

  function productsAfter(index) {
    return products.filter(
      (product, productIndex) =>
        Math.min(productIndex * 2 + 1, paragraphs.length - 1) === index
    );
  }

  return (
    <main className="blog-detail">
      <BlogHero imageUrl={blog.image_url} />
      <article className="blog-detail__sheet">
        <h1>{blog.title}</h1>
        <ArticleMeta readTime={blog.read_time} date={date} author={blog.author} />
        <div className="blog-detail__body">
          {paragraphs.map((paragraph, index) => (
            <div key={index}>
              {paragraph.startsWith("## ") ? (
                <h2>{paragraph.slice(3)}</h2>
              ) : (
                <p>{paragraph}</p>
              )}
              {productsAfter(index).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ))}
        </div>
        {products.length > 0 && (
          <p className="blog-detail__disclosure">
            Some links are sponsored or affiliate links. We may earn a small
            commission at no cost to you.
          </p>
        )}
        <BlogRow title="Read More" blogs={related} seeAllTo="/blog" />
      </article>
    </main>
  );
}