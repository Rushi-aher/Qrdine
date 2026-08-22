// import { Link } from "react-router-dom";
// import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

// import { useCart } from "../../context/CartContext";

// import "./Navbar.css";

// const Navbar = () => {

//     const { totalItems } = useCart();

//     return (

//         <nav className="navbar">

//             <div className="navbar-logo">

//                 <Link to="/restaurant-search">

//                     QRdine

//                 </Link>

//             </div>

//             <div className="navbar-links">

//                 <Link to="/restaurant-search">

//                     Restaurants

//                 </Link>

//                 <Link to="/cart" className="cart-link">

//                     <FaShoppingCart />

//                     {

//                         totalItems > 0 &&

//                         <span className="cart-badge">

//                             {totalItems}

//                         </span>

//                     }

//                 </Link>

//                 <FaUserCircle className="profile-icon"/>

//             </div>

//         </nav>

//     );

// };

// export default Navbar;