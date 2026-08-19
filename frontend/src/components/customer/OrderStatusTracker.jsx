import { useEffect, useState } from "react";

import api from "../../services/api";

import "./OrderStatusTracker.css";

const OrderStatusTracker = () => {

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedOrderId =
            localStorage.getItem("currentOrderId");

        if (!savedOrderId) {
            setLoading(false);
            return;
        }

        loadOrder(savedOrderId);

        const interval = setInterval(() => {
            loadOrder(savedOrderId);
        }, 5000);

        return () => clearInterval(interval);

    }, []);


    const loadOrder = async (orderId) => {

        try {

            const response = await api.get(
                `/orders/${orderId}`
            );

            setOrder(response.data);

        }

        catch (error) {

            console.error(
                "Order Status Error:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    if (loading || !order) {
        return null;
    }


    const statuses = [
        "PENDING",
        "PREPARING",
        "READY",
        "COMPLETED"
    ];


    const currentIndex =
        statuses.indexOf(order.status);


    return (

        <div className="order-status-tracker">

            <div className="order-status-header">

                <div>

                    <h3>
                        Your Order #{order.id}
                    </h3>

                    <p>
                        Table {order.table_id}
                    </p>

                </div>

                <span className="current-status">
                    {order.status}
                </span>

            </div>


            <div className="status-progress">

                {statuses.map((status, index) => {

                    const completed =
                        index <= currentIndex;

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
                                    : index + 1}

                            </div>

                            <span>
                                {status}
                            </span>

                        </div>

                    );

                })}

            </div>


            <div className="order-status-message">

                {order.status === "PENDING" && (
                    <p>
                        🕐 Your order has been received.
                    </p>
                )}

                {order.status === "PREPARING" && (
                    <p>
                        👨‍🍳 Your food is being prepared.
                    </p>
                )}

                {order.status === "READY" && (
                    <p>
                        🔔 Your order is ready!
                    </p>
                )}

                {order.status === "COMPLETED" && (
                    <p>
                        🎉 Your order has been completed.
                    </p>
                )}

                {order.status === "CANCELLED" && (
                    <p>
                        ❌ Your order has been cancelled.
                    </p>
                )}

            </div>

        </div>

    );

};


export default OrderStatusTracker;