import {
    FaTrash,
} from "react-icons/fa";

import "./OrderTable.css";


const statusColors = {

    PENDING: "#f59e0b",

    PREPARING: "#3b82f6",

    READY: "#10b981",

    COMPLETED: "#16a34a",

    CANCELLED: "#ef4444",

};


const OrderTable = ({
    orders,
    onStatusChange,
    onDeleteOrder,
}) => {

    return (

        <div className="order-table-container">

            <table className="order-table">

                <thead>

                    <tr>

                        <th>
                            Order
                        </th>

                        <th>
                            Table
                        </th>

                        <th>
                            Customer
                        </th>

                        <th>
                            Items
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Created
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {orders.length === 0 ? (

                        <tr>

                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center",
                                    padding: "30px",
                                }}
                            >
                                No Orders Found
                            </td>

                        </tr>

                    ) : (

                        orders.map((order) => (

                            <tr key={order.id}>

                                <td>
                                    #{order.id}
                                </td>


                                <td>
                                    {order.table_number}
                                </td>


                                <td>
                                    {order.customer_name}
                                </td>


                                <td>

                                    {order.items.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                            >

                                                {item.food_item_name}

                                                {" × "}

                                                {item.quantity}

                                            </div>

                                        )
                                    )}

                                </td>


                                <td>

                                    <span
                                        className="status-badge"
                                        style={{
                                            background:
                                                statusColors[
                                                    order.status
                                                ],
                                        }}
                                    >

                                        {order.status}

                                    </span>

                                </td>


                                <td>

                                    {new Date(
                                        order.created_at
                                    ).toLocaleString()}

                                </td>


                                <td>

                                    <div className="order-actions">

                                        <select
                                            value={
                                                order.status
                                            }
                                            onChange={(e) =>
                                                onStatusChange(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="PENDING">
                                                Pending
                                            </option>

                                            <option value="PREPARING">
                                                Preparing
                                            </option>

                                            <option value="READY">
                                                Ready
                                            </option>

                                            <option value="COMPLETED">
                                                Completed
                                            </option>

                                            <option value="CANCELLED">
                                                Cancelled
                                            </option>

                                        </select>


                                        <button className="delete-order-btn"
                                            className="delete-order-btn"
                                            onClick={() =>
                                                onDeleteOrder(
                                                    order.id
                                                )
                                            }
                                            title="Delete Order"
                                        >

                                            <FaTrash />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

};


export default OrderTable;