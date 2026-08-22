import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Button,
    Card,
    Input,
    Select,
} from "../../components/ui";

import {
    FaUser,
    FaEnvelope,
    FaLock,
} from "react-icons/fa";

import { signupUser } from "../../services/authService";

import "../../assets/styles/auth.css";


const Signup = () => {

    const navigate = useNavigate();

    const [role, setRole] = useState("customer");

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSignup = async (e) => {

        e.preventDefault();

        setError("");


        if (
            !formData.full_name ||
            !formData.email ||
            !formData.password ||
            !formData.confirm_password
        ) {

            setError("Please fill in all fields.");

            return;
        }


        if (
            formData.password !==
            formData.confirm_password
        ) {

            setError("Passwords do not match.");

            return;
        }


        try {

            setLoading(true);


            await signupUser({

                full_name: formData.full_name,

                email: formData.email,

                password: formData.password,

                role: role,

            });


            navigate("/login");


        } catch (error) {

            console.error("Signup Error:", error);


            const detail =
                error.response?.data?.detail;


            if (Array.isArray(detail)) {

                setError(
                    detail
                        .map((item) => item.msg)
                        .join(", ")
                );

            } else if (typeof detail === "string") {

                setError(detail);

            } else {

                setError(
                    "Account creation failed."
                );

            }


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-page">


            <div className="auth-left">

                <h1>QRdine</h1>

                <h2>Create your account</h2>

                <p>
                    Join QRdine and experience
                    seamless digital dining.
                </p>

            </div>


            <div className="auth-right">

                <Card>

                    <h2>Create Account</h2>

                    <p>
                        Fill in the details below.
                    </p>


                    <form onSubmit={handleSignup}>


                        <Input
                            label="Full Name"
                            name="full_name"
                            placeholder="Enter your full name"
                            icon={<FaUser />}
                            value={formData.full_name}
                            onChange={handleChange}
                        />


                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            icon={<FaEnvelope />}
                            value={formData.email}
                            onChange={handleChange}
                        />


                        <Select
                            label="Register As"
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            options={[
                                {
                                    label: "Customer",
                                    value: "customer",
                                },
                                {
                                    label: "Restaurant Admin",
                                    value: "owner",
                                },
                            ]}
                        />


                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            icon={<FaLock />}
                            value={formData.password}
                            onChange={handleChange}
                        />


                        <Input
                            label="Confirm Password"
                            name="confirm_password"
                            type="password"
                            placeholder="Confirm password"
                            icon={<FaLock />}
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />


                        {error && (

                            <p
                                style={{
                                    color: "#dc3545",
                                    marginTop: "10px",
                                }}
                            >
                                {error}
                            </p>

                        )}


                        <Button
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account"
                            }

                        </Button>


                    </form>


                    <div className="auth-bottom">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/login">
                            Login
                        </Link>

                    </div>


                </Card>

            </div>

        </div>

    );

};


export default Signup;