import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

import OrderTable from "../../components/admin/OrderTable";

import {
    getOrders,
    updateOrderStatus,
    deleteOrder,
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

            console.error(
                "Unable to load orders:",
                error
            );

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

            await loadOrders();

        }

        catch (error) {

            console.error(
                "Unable to update order:",
                error
            );

            alert(
                "Unable to update order."
            );

        }

    };


    const handleDeleteOrder = async (
        orderId
    ) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete Order #${orderId}?`
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteOrder(orderId);

            await loadOrders();

        }

        catch (error) {

            console.error(
                "Unable to delete order:",
                error
            );

            alert(
                error.response?.data?.detail ||
                "Unable to delete order."
            );

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
                onDeleteOrder={
                    handleDeleteOrder
                }
            />

        </div>

    );

};


export default Orders;