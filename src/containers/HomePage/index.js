import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import Pagination from "../../components/Pagination/pagination.js";
import "./index.css";

let PageSize = 5;

function Home() {
  const [product, setProduct] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const [query, setQuery] = useState();
  const [currentPage, setcurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();

  const getProducts = () => {
    const uri = `https://fakestoreapi.com/products?limit=${query}`;

    axios.get(uri).then((response) => {
      const products = response.data;
      setProduct(products);
      setPageCount(response.nbPages);
      setisLoaded(true);
    });
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  function getFilteredList() {
    if (!selectedCategory) {
      return product;
    }
    return product.filter((item) => item.category === selectedCategory);
  }

  var filteredList = useMemo(getFilteredList, [selectedCategory, product]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  useMemo(() => {
    getProducts();
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return product.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`https://fakestoreapi.com/products/${id}`);
      console.log("product successfully deleted.");
      setProduct(
        product.filter((p) => {
          return p.id !== id;
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    getProducts();
  };

  return (
    <>
      <div>
        <div className="filter-container">
          <div>Filter by Category:</div>
          <div>
            <select
              name="category-list"
              id="category-list"
              onChange={handleCategoryChange}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
            </select>
          </div>
          <div>
            <select
              name="category-limit"
              id="category-limit"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            >
              <option value={20}>All</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>
        <div className="product-container">
          {isLoaded ? (
            filteredList.map((data) => {
              return (
                <div key={data.id} className="card">
                  <img src={data.image} style={{ width: "100%" }} />
                  <h3>{data.title}</h3>
                  <br />
                  <div className="price">$ {data.price}</div>
                  <br />
                  <span>{data.description}</span>
                  <NavLink to={`/Products/${data.id}`}>
                    <button> Details</button>
                  </NavLink>
                  <button onClick={() => deleteProduct(data.id)}>delete</button>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
          {isLoaded ? (
            <ReactPaginate
              pageCount={pageCount}
              pageRange={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={"container"}
              previousLinkClassName={"page"}
              breakClassName={"page"}
              nextLinkClassName={"page"}
              pageClassName={"page"}
              disabledClassNae={"disabled"}
              activeClassName={"active"}
            />
          ) : (
            <div>Nothing to display </div>
          )}
        </div>
        {/* <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={product.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        /> */}
      </div>
    </>
  );
}

export default Home;