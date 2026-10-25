import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../lib/supabaseClient";
import BlogHero from "../components/blogHero";
import ArticleMeta from "../components/articleMeta";
import ProductCard from "../components/productCard";
import BlogRow from "../components/blogRow";
import "./blogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [products, setProducts] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    async function getData() {
      const blogResult = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();
      const productResult = await supabase
        .from("blog_products")
        .select("*")
        .eq("blog_id", id);
      const relatedResult = await supabase
        .from("blogs")
        .select("*")
        .neq("id", id)
        .limit(6);

      if (blogResult.error) {
        console.error(blogResult.error);
      } else {
        setBlog(blogResult.data);
      }
      setProducts(productResult.data ?? []);
      setRelated(relatedResult.data ?? []);
    }
    getData();
  }, [id]);

  if (!blog) {
    return <p className="blog-detail__loading">Loading...</p>;
  }

  const date = new Date(blog.published_at).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  const paragraphs = blog.body.split("\n\n");

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
              <p>{paragraph}</p>
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