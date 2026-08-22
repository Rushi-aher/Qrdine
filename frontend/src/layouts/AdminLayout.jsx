import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import { useTheme } from "../context/ThemeContext";

import "./AdminLayout.css";

const AdminLayout = () => {

    const { adminTheme } = useTheme();

    return (

        <div
            className="admin-layout"
            data-theme={adminTheme}
        >

            <Sidebar />

            <div className="admin-content">

                <Topbar />

                <main className="admin-page">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default AdminLayout;
