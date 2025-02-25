import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../services/UseFetch";
import Spinner from "../Spinner";
import PageNotFound from "./NotFound";

export default function Detail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const [selectedSize, setSelectedSize] = useState("");

  if (loading) return <Spinner />;
  if (!product || Object.keys(product).length === 0 || !product.name) {
    return <PageNotFound />;
  }
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">{`${product.price}$`}</p>
      <label htmlFor="size">Choose a Size:</label>
      <select
        id="size"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option value="">Select size</option>
        {product.skus?.map((sku) => (
          <option key={sku.size} value={sku.size}>
            {sku.size}
          </option>
        ))}
      </select>
      {selectedSize === "" && <p style={{ color: "red" }}>Please select a size.</p>}
      <p>
        <button
          className="btn btn-primary"
          disabled={selectedSize === ""}
          onClick={() => {navigate("/cart") 
          props.addToCart(product.id,selectedSize)}}>
          Add to cart
        </button>
      </p>

      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
