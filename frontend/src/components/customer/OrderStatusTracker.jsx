import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../../services/api";

import "./OrderStatusTracker.css";


const OrderStatusTracker = () => {

    const [searchParams] = useSearchParams();

    const tableId = searchParams.get("table");


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [expanded, setExpanded] = useState(false);


    useEffect(() => {

        if (!tableId) {

            setLoading(false);

            return;

        }


        loadOrders();


        const interval = setInterval(() => {

            loadOrders();

        }, 5000);


        return () => {

            clearInterval(interval);

        };

    }, [tableId]);


    const loadOrders = async () => {

        try {

            const response = await api.get(
                `/orders/table/${tableId}/today`
            );


            const today = new Date();


            /*
             * Extra frontend protection:
             * Only keep today's orders.
             */

            const todaysOrders =
                response.data.filter((order) => {

                    const orderDate =
                        new Date(
                            order.created_at
                        );


                    return (
                        orderDate.getDate() ===
                            today.getDate() &&

                        orderDate.getMonth() ===
                            today.getMonth() &&

                        orderDate.getFullYear() ===
                            today.getFullYear()
                    );

                });


            setOrders(todaysOrders);

        }

        catch (error) {

            console.error(
                "Order Tracker Error:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    /*
     * Don't show tracker while loading
     * or when there are no orders.
     */

    if (loading || orders.length === 0) {

        return null;

    }


    const statuses = [
        "PENDING",
        "PREPARING",
        "READY",
        "COMPLETED"
    ];


    const getStatusText = (status) => {

        switch (status) {

            case "PENDING":
                return "Order received";

            case "PREPARING":
                return "Preparing";

            case "READY":
                return "Ready";

            case "COMPLETED":
                return "Completed";

            case "CANCELLED":
                return "Cancelled";

            default:
                return status;

        }

    };


    const getStatusMessage = (status) => {

        switch (status) {

            case "PENDING":
                return "Your order has been received.";

            case "PREPARING":
                return "Your food is being prepared.";

            case "READY":
                return "Your order is ready!";

            case "COMPLETED":
                return "Your order has been completed.";

            case "CANCELLED":
                return "Your order has been cancelled.";

            default:
                return "Your order is being processed.";

        }

    };


    const formatTime = (dateString) => {

        const date =
            new Date(dateString);


        return date.toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

    };


    const getCurrentIndex = (status) => {

        return statuses.indexOf(status);

    };


    /*
     * Small floating button
     */

    if (!expanded) {

        const activeOrders =
            orders.filter(
                order =>
                    order.status !==
                        "COMPLETED" &&
                    order.status !==
                        "CANCELLED"
            );


        const latestOrder =
            activeOrders.length > 0
                ? activeOrders[0]
                : orders[0];


        return (

            <button
                className="order-status-mini"
                onClick={() =>
                    setExpanded(true)
                }
                aria-label="View orders"
            >

                <div className="status-spinner"></div>


                <div className="status-spinner-inner">

                    <span>
                        {activeOrders.length > 0
                            ? getStatusText(
                                latestOrder.status
                            )
                            : `${orders.length} Orders`
                        }
                    </span>

                </div>

            </button>

        );

    }


    /*
     * Expanded tracker
     */

    return (

        <div className="order-status-tracker">

            <div className="tracker-top">

                <div>

                    <h3>
                        Your Orders
                    </h3>

                    <p>
                        {orders.length} order
                        {orders.length !== 1
                            ? "s"
                            : ""
                        } today
                    </p>

                </div>


                <button
                    className="tracker-close"
                    onClick={() =>
                        setExpanded(false)
                    }
                    aria-label="Close"
                >
                    ✕
                </button>

            </div>


            <div className="orders-list">

                {orders.map((order) => {

                    const currentIndex =
                        getCurrentIndex(
                            order.status
                        );


                    return (

                        <div
                            className="order-card"
                            key={order.id}
                        >

                            {/* Order Header */}

                            <div className="order-header">

                                <div>

                                    <h4>
                                        Order #{order.id}
                                    </h4>

                                    <span>
                                        {formatTime(
                                            order.created_at
                                        )}
                                    </span>

                                </div>


                                <span
                                    className={`order-status-badge status-${order.status.toLowerCase()}`}
                                >
                                    {getStatusText(
                                        order.status
                                    )}
                                </span>

                            </div>


                            {/* Items */}

                            <div className="order-items">

                                {order.items.map(
                                    (item, index) => (

                                        <div
                                            className="order-item"
                                            key={index}
                                        >

                                            <span>
                                                {item.food_item_name}
                                            </span>

                                            <span>
                                                × {item.quantity}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* Progress */}

                            {order.status !==
                                "CANCELLED" && (

                                <div className="status-progress">

                                    {statuses.map(
                                        (
                                            status,
                                            index
                                        ) => {

                                            const completed =
                                                index <=
                                                currentIndex;


                                            return (

                                                <div
                                                    key={status}
                                                    className={`status-step ${
                                                        completed
                                                            ? "completed"
                                                            : ""
                                                    }`}
                                                >

                                                    <div className="status-circle">

                                                        {completed
                                                            ? "✓"
                                                            : index + 1
                                                        }

                                                    </div>

                                                    <span>
                                                        {status}
                                                    </span>

                                                </div>

                                            );

                                        }
                                    )}

                                </div>

                            )}


                            {/* Message */}

                            <div className="order-status-message">

                                {order.status ===
                                    "CANCELLED" ? (

                                    <p>
                                        ❌ This order
                                        was cancelled.
                                    </p>

                                ) : (

                                    <p>
                                        {getStatusMessage(
                                            order.status
                                        )}
                                    </p>

                                )}

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

};


export default OrderStatusTracker;