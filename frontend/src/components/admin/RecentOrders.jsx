import "./RecentOrders.css";

const orders = [

    {
        id: "#1025",
        table: "Table 4",
        customer: "Rahul",
        amount: "₹640",
        status: "Preparing"
    },

    {
        id: "#1024",
        table: "Table 2",
        customer: "Priya",
        amount: "₹420",
        status: "Ready"
    },

    {
        id: "#1023",
        table: "Table 7",
        customer: "Amit",
        amount: "₹980",
        status: "Completed"
    },

    {
        id: "#1022",
        table: "Table 1",
        customer: "Rohan",
        amount: "₹350",
        status: "Pending"
    }

];

const RecentOrders = () => {

    return (

        <div className="recent-orders">

            <div className="recent-header">

                <h2>

                    Recent Orders

                </h2>

                <button>

                    View All

                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Order</th>

                        <th>Customer</th>

                        <th>Table</th>

                        <th>Amount</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map(order => (

                            <tr key={order.id}>

                                <td>{order.id}</td>

                                <td>{order.customer}</td>

                                <td>{order.table}</td>

                                <td>{order.amount}</td>

                                <td>

                                    <span className={order.status.toLowerCase()}>

                                        {order.status}

                                    </span>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default RecentOrders;