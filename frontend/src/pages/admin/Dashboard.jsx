import { useEffect, useState } from "react";

import DashboardCard from "../../components/admin/DashboardCard";

import { getDashboardStats } from "../../services/dashboardService";

import RecentOrders from "../../components/admin/RecentOrders";

import {

    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaHamburger,
    FaTags,
    FaQrcode,
    FaFire,
    FaUtensils,
    FaPlus,


} from "react-icons/fa";

import "./Dashboard.css";

const Dashboard = () => {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!stats) {

        return (

            <div className="dashboard-loading">

                Loading...

            </div>

        );

    }

    return (

        <div className="dashboard">

            <div className="dashboard-top">

                <div>

                    <h1>

                        Welcome Back 👋

                    </h1>

                    <p>

                        Manage everything from one place.

                    </p>

                </div>

                


            </div>

            <div className="dashboard-grid">

                <DashboardCard title="Today's Orders" value={stats.today_orders} icon={<FaFire />} />

                <DashboardCard title="Pending" value={stats.pending_orders} icon={<FaClock />} />

                <DashboardCard title="Preparing" value={stats.preparing_orders} icon={<FaUtensils />} />

                <DashboardCard title="Completed" value={stats.completed_orders} icon={<FaCheckCircle />} />

                <DashboardCard title="Food Items" value={stats.total_food_items} icon={<FaHamburger />} />

                <DashboardCard title="Categories" value={stats.total_categories} icon={<FaTags />} />

                <DashboardCard title="Tables" value={stats.total_tables} icon={<FaQrcode />} />

                <DashboardCard
                    title="Total Orders"
                    value={
                        stats.pending_orders +
                        stats.preparing_orders +
                        stats.ready_orders +
                        stats.completed_orders
                    }
                    icon={<FaClipboardList />}
                />

            </div>

            <div className="dashboard-bottom">

                <div className="recent-orders">

                    <div className="section-title">

                        Recent Orders

                    </div>

                    <RecentOrders />

                </div>
                <div className="quick-actions">

                    <div className="section-title">

                        Quick Actions

                    </div>

                    <button>

                        <FaPlus />

                        Add Product

                    </button>

                    <button>

                        <FaTags />

                        Add Category

                    </button>

                    <button>

                        <FaQrcode />

                        Add Table

                    </button>

                    

                </div>

            </div>

        </div>

    );

};

export default Dashboard;