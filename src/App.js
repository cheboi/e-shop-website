import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Home from "./containers/HomePage/index.js";
import Products from "./containers/Products/index";
import Categories from "./containers/productCategory/index";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="products/:id" element={<Products />} />
          <Route path="addproduct" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
