import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

import OrderTable from "../../components/admin/OrderTable";

import {
    getOrders,
    updateOrderStatus,
} from "../../services/orderService";

import "./Orders.css";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const loadOrders = async () => {

        try {

            const data = await getOrders();

            setOrders(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

    loadOrders();

    const interval = setInterval(() => {

        loadOrders();

    }, 5000);

    return () => clearInterval(interval);

    }, []);

    const handleStatusChange = async (

        orderId,

        status

    ) => {

        try {

            await updateOrderStatus(

                orderId,

                status

            );

            loadOrders();

        }

        catch (error) {

            console.error(error);

            alert("Unable to update order.");

        }

    };

    const filteredOrders = orders.filter(

        (order) =>

            order.customer_name

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

    );

    return (

        <div className="orders-page">

            <div className="orders-header">

                <div>

                    <h1>

                        Orders

                    </h1>

                    <p>

                        Manage customer orders.

                    </p>

                </div>

            </div>

            <div className="orders-toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search Customer..."

                        value={search}

                        onChange={(e) =>

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>

            <OrderTable

                orders={filteredOrders}

                onStatusChange={

                    handleStatusChange

                }

            />

        </div>

    );

};

export default Orders;