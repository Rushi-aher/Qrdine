import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    FaBars,
    FaTimes,
    FaChartPie,
    FaBoxOpen,
    FaTags,
    FaClipboardList,
    FaQrcode,
    FaStore,
    FaChartLine,
    FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/images/logo.png";

import "./Sidebar.css";

const Sidebar = () => {

    const [open, setOpen] = useState(true);

    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <aside className={`sidebar ${open ? "open" : "closed"}`}>

            <div>

                <div className="sidebar-top">

                    <div className="sidebar-logo">


                        {
                            open &&
                            <h2>
                                Menu
                            </h2>
                        }

                    </div>

                    <button
                        className="sidebar-toggle"
                        onClick={() => setOpen(!open)}
                    >
                        {
                            open
                                ? <FaTimes />
                                : <FaBars />
                        }
                    </button>

                </div>

                <nav className="sidebar-nav">

                    <NavLink to="/admin/dashboard">
                        <FaChartPie />
                        {open && <span>Dashboard</span>}
                    </NavLink>

                    <NavLink to="/admin/products">
                        <FaBoxOpen />
                        {open && <span>Products</span>}
                    </NavLink>

                    <NavLink to="/admin/categories">
                        <FaTags />
                        {open && <span>Categories</span>}
                    </NavLink>

                    <NavLink to="/admin/orders">
                        <FaClipboardList />
                        {open && <span>Orders</span>}
                    </NavLink>

                    <NavLink to="/admin/tables">
                        <FaQrcode />
                        {open && <span>Tables</span>}
                    </NavLink>

                    <NavLink to="/admin/restaurant">
                        <FaStore />
                        {open && <span>Restaurant</span>}
                    </NavLink>

                    <NavLink to="/admin/analytics">
                        <FaChartLine />
                        {open && <span>Analytics</span>}
                    </NavLink>

                </nav>

            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >

                <FaSignOutAlt />

                {
                    open &&
                    <span>
                        Logout
                    </span>
                }

            </button>

        </aside>

    );

};

export default Sidebar;