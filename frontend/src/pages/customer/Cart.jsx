import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import api from "../../services/api";

import "./Cart.css";

const Cart = () => {

    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice
    } = useCart();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const tableId = searchParams.get("table");

    const [customerName, setCustomerName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleCheckout = async () => {

        if (!tableId) {
            setError("Table information is missing.");
            return;
        }

        if (!customerName.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const orderData = {
                table_id: Number(tableId),

                customer_name: customerName.trim(),

                items: cart.map((item) => ({
                    food_item_id: item.id,
                    quantity: item.quantity
                }))
            };

            const response = await api.post(
                "/orders",
                orderData
            );

            // Save current order for status tracker
            localStorage.setItem(
                "currentOrderId",
                response.data.id
            );

            // Clear cart immediately
            clearCart();

            // Show success screen immediately
            setSuccess(true);

            // Go back to menu after success message
            setTimeout(() => {

                navigate(`/menu?table=${tableId}`);

            }, 2200);

        }

        catch (error) {

            console.error(
                "Order Error:",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Unable to place order."
            );

        }

        finally {

            setLoading(false);

        }

    };


    /*
     * SUCCESS SCREEN
     *
     * This is returned BEFORE the normal cart UI,
     * so the empty cart page is never displayed.
     */

    if (success) {

        return (

            <div className="order-success-page">

                <div className="order-success-card">

                    <div className="success-circle">

                        ✓

                    </div>

                    <h1>
                        Order Placed!
                    </h1>

                    <p>
                        Your order has been successfully sent
                        to the restaurant.
                    </p>

                    <div className="success-order-info">

                        <span>
                            Table {tableId}
                        </span>

                        <span>
                            Order #{localStorage.getItem(
                                "currentOrderId"
                            )}
                        </span>

                    </div>

                    <div className="success-loader">

                        <div className="success-loader-bar"></div>

                    </div>

                    <small>
                        Taking you back to the menu...
                    </small>

                </div>

            </div>

        );

    }


    return (

        <div className="cart-page">

            <div className="cart-header">

                <h1>
                    Your Cart
                </h1>

                <p>
                    Review your items before placing your order.
                </p>

            </div>


            {!tableId && (

                <div className="empty-cart">

                    <h2>
                        Table information is missing.
                    </h2>

                    <p>
                        Please return to the menu and select a table.
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                    >
                        Back to Menu
                    </button>

                </div>

            )}


            {tableId && cart.length === 0 ? (

                <div className="empty-cart">

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add some delicious food from the menu.
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                    >
                        Browse Menu
                    </button>

                </div>

            ) : tableId ? (

                <div className="cart-layout">

                    <div className="cart-items">

                        {cart.map((item) => (

                            <div
                                key={item.id}
                                className="cart-item"
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div className="cart-info">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        ₹{item.price} each
                                    </p>

                                </div>

                                <div className="cart-quantity">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item.id)
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(item.id)
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <div className="cart-item-total">

                                    ₹
                                    {item.price * item.quantity}

                                </div>

                            </div>

                        ))}

                    </div>


                    <div className="cart-summary">

                        <h2>
                            Order Summary
                        </h2>

                        <div className="summary-row">

                            <span>
                                Items
                            </span>

                            <span>
                                {totalItems}
                            </span>

                        </div>

                        <div className="summary-row total">

                            <span>
                                Total
                            </span>

                            <span>
                                ₹{totalPrice}
                            </span>

                        </div>

                        <div className="customer-name">

                            <label>
                                Your Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                            />

                        </div>

                        {error && (

                            <p className="cart-error">
                                {error}
                            </p>

                        )}

                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={loading}
                        >

                            {loading
                                ? "Placing Order..."
                                : "Place Order"
                            }

                        </button>

                    </div>

                </div>

            ) : null}

        </div>

    );

};

export default Cart;