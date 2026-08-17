import { FaBars, FaUserCircle } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {

    const { user } = useAuth();

    return (

        <header className="admin-navbar">

            <div className="navbar-left">

                <button
                    className="menu-btn"
                    onClick={toggleSidebar}
                >

                    <FaBars />

                </button>

                <h2>

                    QRdine

                </h2>

            </div>

            <div className="navbar-right">

                <FaUserCircle />

                <span>

                    {user?.email}

                </span>

            </div>

        </header>

    );

};

export default Navbar;