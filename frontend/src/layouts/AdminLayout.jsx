import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import "./AdminLayout.css";

const AdminLayout = () => {

    return (

        <div className="admin-layout">

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