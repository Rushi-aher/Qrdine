import { useState } from "react";
import "./Topbar.css";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import logo from "../../assets/images/logo.png";
import ChangePasswordPopup from "../common/ChangePasswordPopup";

const themes = [
    {
        id: "green",
        name: "Green",
        color: "#16A34A",
    },
    {
        id: "ocean",
        name: "Ocean",
        color: "#0284C7",
    },
    {
        id: "purple",
        name: "Purple",
        color: "#7C3AED",
    },
    {
        id: "sunset",
        name: "Sunset",
        color: "#EA580C",
    },
    {
        id: "ruby",
        name: "Ruby",
        color: "#E11D48",
    },
    {
        id: "dark",
        name: "Dark",
        color: "#22C55E",
    },
];

const Topbar = () => {

    const { user } = useAuth();

    const {
        adminTheme,
        setAdminTheme,
        setCustomerTheme,
    } = useTheme();

    const [showPasswordPopup, setShowPasswordPopup] =
        useState(false);

    const [showThemes, setShowThemes] =
        useState(false);


    const handleThemeChange = (theme) => {

        setAdminTheme(theme);
        setCustomerTheme(theme);


        setShowThemes(false);
    };


    return (
        <header className="topbar">

            <div className="topbar-left">

                <img
                    src={logo}
                    alt="QRdine"
                    className="topbar-logo"
                />

            </div>


            <div className="topbar-right">


                {/* Theme Button */}

                <div className="theme-selector">

                    <button
                        className="theme-button"
                        onClick={() =>
                            setShowThemes(!showThemes)
                        }
                    >
                        <span className="theme-button-icon">
                            🎨
                        </span>

                        <span>
                            Theme
                        </span>
                    </button>


                    {showThemes && (

                        <div className="theme-dropdown">

                            <div className="theme-dropdown-title">
                                Choose Theme
                            </div>


                            <div className="theme-options">

                                {themes.map((theme) => (

                                    <button
                                        key={theme.id}
                                        className={`theme-option ${
                                            adminTheme === theme.id
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleThemeChange(
                                                theme.id
                                            )
                                        }
                                    >

                                        <span
                                            className="theme-color"
                                            style={{
                                                backgroundColor:
                                                    theme.color,
                                            }}
                                        ></span>


                                        <span className="theme-name">
                                            {theme.name}
                                        </span>


                                        {adminTheme === theme.id && (
                                            <span className="theme-check">
                                                ✓
                                            </span>
                                        )}

                                    </button>

                                ))}

                            </div>

                        </div>

                    )}

                </div>


                {/* Profile */}

                <button
                    className="profile"
                    onClick={() =>
                        setShowPasswordPopup(true)
                    }
                >

                    <div className="avatar">

                        {user?.email
                            ?.charAt(0)
                            .toUpperCase()}

                    </div>


                    <div>

                        <h4>
                            {user?.email}
                        </h4>

                        <p>
                            Restaurant Owner.
                        </p>

                    </div>

                </button>

            </div>


            {showPasswordPopup && (

                <ChangePasswordPopup
                    onClose={() =>
                        setShowPasswordPopup(false)
                    }
                />

            )}

        </header>
    );
};


export default Topbar;