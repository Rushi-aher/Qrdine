import { useState } from "react";
import api from "../../services/api";
import "./ChangePasswordPopup.css";

const ChangePasswordPopup = ({ onClose }) => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        try {
            await api.put("/auth/change-password", {
                current_password: currentPassword,
                new_password: newPassword
            });

            setMessage("Password changed successfully.");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            setError(
                error.response?.data?.detail ||
                "Failed to change password."
            );
        }
    };

    return (
        <div className="password-popup-overlay">

            <div className="password-popup">

                <button
                    className="password-popup-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2>Change Password</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                    />

                    {error && (
                        <p className="password-error">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="password-success">
                            {message}
                        </p>
                    )}

                    <button type="submit">
                        Change Password
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ChangePasswordPopup;