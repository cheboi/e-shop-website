import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const Products = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  console.log(id);

  useEffect(() => {
    const getProductDetail = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setDetail(data);
    };
    getProductDetail();
  }, [id]);

  return (
    <div>
      <div>
        <img alt="detail" src={detail.image} width="250" />
        <span> in {detail.category}</span>
        <h5>{detail.title}</h5>
        Rating {detail.rating && detail.rating.rate}
        <div>${detail.price}</div>
      </div>
      <p>{detail.description}</p>
    </div>
  );
};

export default Products;
