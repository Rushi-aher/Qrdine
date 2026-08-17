import "./FloatingCart.css";

import { FaShoppingCart } from "react-icons/fa";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import { useCart } from "../../context/CartContext";


const FloatingCart = () => {

    const {

        totalItems,

        totalPrice

    } = useCart();


    const navigate = useNavigate();

    const [searchParams] = useSearchParams();


    const tableId = searchParams.get("table");


    if (totalItems === 0)

        return null;


    return (

        <div className="floating-cart">

            <div>

                <strong>

                    {totalItems} Item
                    {totalItems > 1 ? "s" : ""}

                </strong>

                <p>

                    ₹{totalPrice}

                </p>

            </div>


            <button

                onClick={() =>
                    navigate(`/cart?table=${tableId}`)
                }

            >

                <FaShoppingCart />

                View Cart

            </button>

        </div>

    );

};


export default FloatingCart;