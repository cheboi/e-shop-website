import { Outlet, Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <>
      <header>
        <nav className="nav">
          <ul className="nav-ul">
            <li className="nav-list">
              <Link to="/">Home</Link>
            </li>
            {/* <li className="nav-list">
              <Link to="/products">Products</Link>
            </li> */}
            <li className="nav-list">
              <Link to="/addproduct">Add Product</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </header>
    </>
  );
};

export default Header;
