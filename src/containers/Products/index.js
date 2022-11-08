import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./index.css";

const Products = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  useEffect(() => {
    const getProductDetails = async () => {
      const data = await axios.get(`https://fakestoreapi.com/products/${id}`);
      // console.log(data);
      setProduct(data.data);
    };
    getProductDetails();
  }, []);

  console.log(product);

  return (
    <div className="detail-container">
      <h2>Products Details</h2>
      <div className="product-detail">
        <div className="product-image">
          <img alt="product" src={product.image} width="400px" height={350} />
        </div>
        <div className="detail-description">
          <h3>{product.category}</h3>
          <h5>{product.title}</h5>
          <p className="rating">
            {" "}
            Rating{product.rating && product.rating.rate}
          </p>
          <div className="price">${product.price}</div>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
