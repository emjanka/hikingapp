import "./productCard.css";

// A sponsored or affiliate product that shows inside an article
export default function ProductCard({ product }) {
  const imageStyle = product.image_url
    ? { backgroundImage: `url(${product.image_url})` }
    : {};

  return (
    <div className="product-card">
      <div className="product-card__image" style={imageStyle}></div>
      <div className="product-card__info">
        {/* The label says if it is sponsored or an affiliate link */}
        <p className="product-card__label">
          {product.brand} · {product.kind}
        </p>
        <h3>{product.name}</h3>
        <div className="product-card__bottom">
          <span>{product.price}</span>
          {/* Opens the shop in a new tab */}
          <a
            href={product.link_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="product-card__buy"
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  );
}