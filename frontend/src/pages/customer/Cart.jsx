import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

const Cart = () => {

    const {

        cart,

        increaseQuantity,

        decreaseQuantity,

        totalItems,

        totalPrice

    } = useCart();

    const navigate = useNavigate();

    return (

        <div className="cart-page">

            <h1>Your Cart</h1>

            {

                cart.length===0 ?

                (

                    <div className="empty-cart">

                        <h2>Your cart is empty.</h2>

                        <button onClick={()=>navigate(-1)}>

                            Back to Menu

                        </button>

                    </div>

                )

                :

                (

                    <>

                        <div className="cart-items">

                            {

                                cart.map(item=>(

                                    <div
                                        key={item.id}
                                        className="cart-item"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                        <div className="cart-info">

                                            <h3>{item.name}</h3>

                                            <p>₹{item.price}</p>

                                        </div>

                                        <div className="cart-quantity">

                                            <button

                                                onClick={()=>decreaseQuantity(item.id)}

                                            >

                                                -

                                            </button>

                                            <span>

                                                {item.quantity}

                                            </span>

                                            <button

                                                onClick={()=>increaseQuantity(item.id)}

                                            >

                                                +

                                            </button>

                                        </div>

                                        <h3>

                                            ₹{item.price*item.quantity}

                                        </h3>

                                    </div>

                                ))

                            }

                        </div>

                        <div className="cart-summary">

                            <h2>Order Summary</h2>

                            <div>

                                <span>Items</span>

                                <span>{totalItems}</span>

                            </div>

                            <div>

                                <span>Total</span>

                                <span>₹{totalPrice}</span>

                            </div>

                            <button>

                                Proceed to Checkout

                            </button>

                        </div>

                    </>

                )

            }

        </div>

    );

};

export default Cart;