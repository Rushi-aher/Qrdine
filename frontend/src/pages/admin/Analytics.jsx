import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

import {
    FaShoppingBag,
    FaRupeeSign,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";

import api from "../../services/api";

import "./Analytics.css";


const COLORS = [
    "#6366f1",
    "#f59e0b",
    "#22c55e",
    "#10b981",
    "#ef4444",
];


const Analytics = () => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadAnalytics();

    }, []);


    const loadAnalytics = async () => {

        try {

            const response = await api.get("/analytics");

            setData(response.data);

        }

        catch (error) {

            console.error(
                "Analytics Error:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (
            <div className="analytics-page">
                <div className="analytics-loading">
                    Loading analytics...
                </div>
            </div>
        );

    }


    if (!data) {

        return (
            <div className="analytics-page">
                <div className="analytics-error">
                    Unable to load analytics.
                </div>
            </div>
        );

    }


    return (

        <div className="analytics-page">

            {/* Header */}

            <div className="analytics-header">

                <div>

                    <h1>Analytics</h1>

                    <p>
                        Track your restaurant performance and
                        order activity.
                    </p>

                </div>

            </div>


            {/* Summary Cards */}

            <div className="analytics-cards">

                <div className="analytics-card">

                    <div className="card-icon blue">
                        <FaShoppingBag />
                    </div>

                    <div>

                        <span>Total Orders</span>

                        <strong>
                            {data.total_orders}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="card-icon green">
                        <FaRupeeSign />
                    </div>

                    <div>

                        <span>Total Revenue</span>

                        <strong>
                            ₹{data.total_revenue}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="card-icon purple">
                        <FaCheckCircle />
                    </div>

                    <div>

                        <span>Completed Orders</span>

                        <strong>
                            {data.completed_orders}
                        </strong>

                    </div>

                </div>


                <div className="analytics-card">

                    <div className="card-icon orange">
                        <FaClock />
                    </div>

                    <div>

                        <span>Pending Orders</span>

                        <strong>
                            {data.pending_orders}
                        </strong>

                    </div>

                </div>

            </div>


            {/* Daily Orders */}

            <div className="analytics-panel daily-orders-panel">

                <div className="panel-header">

                    <div>

                        <h2>Daily Orders</h2>

                        <p>
                            Number of orders received each day
                        </p>

                    </div>

                </div>


                <div className="line-chart">

                    <ResponsiveContainer
                        width="100%"
                        height={330}
                    >

                        <LineChart
                            data={data.daily_orders}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 10,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 12 }}
                            />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                }}
                                activeDot={{
                                    r: 7,
                                }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* Charts */}

            <div className="analytics-grid">


                {/* Order Status */}

                <div className="analytics-panel">

                    <div className="panel-header">

                        <div>

                            <h2>Order Status</h2>

                            <p>
                                Current order distribution
                            </p>

                        </div>

                    </div>


                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={data.status_data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={58}
                                    paddingAngle={4}
                                >

                                    {data.status_data.map(
                                        (entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[index %
                                                    COLORS.length]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                {/* Top Products */}

                <div className="analytics-panel">

                    <div className="panel-header">

                        <div>

                            <h2>Top Selling Items</h2>

                            <p>
                                Most ordered menu items
                            </p>

                        </div>

                    </div>


                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={data.top_products}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 10,
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 11 }}
                                />

                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fontSize: 12 }}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="quantity"
                                    fill="#6366f1"
                                    radius={[
                                        5,
                                        5,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>


            {/* Status Overview */}

            <div className="analytics-panel status-overview">

                <div className="panel-header">

                    <div>

                        <h2>Order Overview</h2>

                        <p>
                            Orders grouped by current status
                        </p>

                    </div>

                </div>


                <div className="status-list">

                    <div>

                        <span>Pending</span>

                        <strong>
                            {data.pending_orders}
                        </strong>

                    </div>

                    <div>

                        <span>Preparing</span>

                        <strong>
                            {data.preparing_orders}
                        </strong>

                    </div>

                    <div>

                        <span>Ready</span>

                        <strong>
                            {data.ready_orders}
                        </strong>

                    </div>

                    <div>

                        <span>Completed</span>

                        <strong>
                            {data.completed_orders}
                        </strong>

                    </div>

                    <div>

                        <span>Cancelled</span>

                        <strong>
                            {data.cancelled_orders}
                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Analytics;