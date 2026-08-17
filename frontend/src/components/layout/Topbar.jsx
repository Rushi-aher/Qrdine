import "./Topbar.css";

import {
    FaBell,
    FaSearch
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/images/logo.png";

const Topbar = () => {

    const { user } = useAuth();

    return (

        <header className="topbar">

            <div className="topbar-left">

                <img
                    src={logo}
                    alt="QRdine"
                    className="topbar-logo"
                />

            </div>

            <div className="topbar-center">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search..."
                />

            </div>

            <div className="topbar-right">

                <button className="notification-btn">

                    <FaBell />

                    <span>3</span>

                </button>

                <div className="profile">

                    <div className="avatar">

                        {user?.email?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <h4>

                            {user?.email}

                        </h4>

                        <p>

                            Restaurant Owner

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

};

export default Topbar;