import "./FloatingCart.css";

import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";

const FloatingCart = () => {

    const {

        totalItems,

        totalPrice

    } = useCart();

    const navigate = useNavigate();

    if (totalItems === 0)

        return null;

    return (

        <div className="floating-cart">

            <div>

                <strong>

                    {totalItems} Item{totalItems > 1 ? "s" : ""}

                </strong>

                <p>

                    ₹{totalPrice}

                </p>

            </div>

            <button onClick={() => navigate("/cart")}>

                <FaShoppingCart />

                View Cart

            </button>

        </div>

    );

};

export default FloatingCart;