import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordPopup from "../common/ChangePasswordPopup";

import "./CustomerNavbar.css";

const CustomerNavbar = () => {

    const { user, logout } = useAuth();

    const [visible, setVisible] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);


    useEffect(() => {

        let lastScrollY = window.scrollY;

        const handleScroll = () => {

            const currentScrollY = window.scrollY;

            // At top → always show
            if (currentScrollY <= 10) {
                setVisible(true);
            }

            // Scroll DOWN → hide
            else if (currentScrollY > lastScrollY) {
                setVisible(false);
                setShowProfile(false);
            }

            // Scroll UP → show
            else if (currentScrollY < lastScrollY) {
                setVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);


    const handleLogout = () => {
        logout();
    };


    const handleChangePassword = () => {
        setShowProfile(false);
        setShowPasswordPopup(true);
    };


    return (
        <>
            <nav
                className={`customer-navbar ${
                    visible ? "show" : "hide"
                }`}
            >

                <div className="customer-navbar-logo">
                    QRdine
                </div>


                <div className="customer-profile-container">

                    <button
                        className="customer-profile"
                        onClick={() =>
                            setShowProfile(!showProfile)
                        }
                    >

                        <div className="customer-avatar">
                            {user?.email
                                ?.charAt(0)
                                .toUpperCase()}
                        </div>

                        <span>
                            {user?.email || "Customer"}
                        </span>

                    </button>


                    {showProfile && (

                        <div className="customer-dropdown">

                            <div className="customer-email">
                                {user?.email}
                            </div>


                            <button
                                onClick={handleChangePassword}
                            >
                                Change Password
                            </button>


                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>

                    )}

                </div>

            </nav>


            {/* Prevent navbar from covering page content */}
            <div className="customer-navbar-spacer"></div>


            {showPasswordPopup && (

                <ChangePasswordPopup
                    onClose={() =>
                        setShowPasswordPopup(false)
                    }
                />

            )}

        </>
    );
};


export default CustomerNavbar;