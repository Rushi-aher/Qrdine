import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    getOrders,
} from "../../services/orderService";

import "./RecentOrders.css";


const RecentOrders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        loadRecentOrders();

    }, []);


    const loadRecentOrders = async () => {

        try {

            const data = await getOrders();

            setOrders(
                data.slice(0, 5)
            );

        }

        catch (error) {

            console.error(
                "Unable to load recent orders:",
                error
            );

        }

    };


    return (

        <div className="recent-orders">


            <div className="recent-header">

                <h2>
                    Recent Orders
                </h2>


                <button
                    onClick={() =>
                        navigate(
                            "/admin/orders"
                        )
                    }
                >
                    View All
                </button>

            </div>


            <table>

                <thead>

                    <tr>

                        <th>
                            Order
                        </th>

                        <th>
                            Customer
                        </th>

                        <th>
                            Table
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {orders.length === 0 ? (

                        <tr>

                            <td
                                colSpan="4"
                                style={{
                                    textAlign:
                                        "center",
                                    padding:
                                        "20px",
                                }}
                            >

                                No recent orders.

                            </td>

                        </tr>

                    ) : (

                        orders.map(
                            (order) => (

                                <tr
                                    key={
                                        order.id
                                    }
                                >

                                    <td>
                                        #{order.id}
                                    </td>


                                    <td>
                                        {
                                            order.customer_name
                                        }
                                    </td>


                                    <td>
                                        Table{" "}
                                        {
                                            order.table_number
                                        }
                                    </td>


                                    <td>

                                        <span
                                            className={
                                                `recent-status ${order.status.toLowerCase()}`
                                            }
                                        >

                                            {
                                                order.status
                                            }

                                        </span>

                                    </td>

                                </tr>

                            )
                        )

                    )}

                </tbody>

            </table>


        </div>

    );

};


export default RecentOrders;