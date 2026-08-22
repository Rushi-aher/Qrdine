import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

import {
    Button,
    Card,
    Checkbox,
    Input,
} from "../../components/ui";

import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

import "../../assets/styles/auth.css";


const DEMO_CREDENTIALS = [
    {
        label: "Customer Demo",
        email: "customer@example.com",
        password: "Password@123",
    },
    {
        label: "Restaurant Admin Demo",
        email: "owner@example.com",
        password: "Password@123",
    },
];


const Login = () => {

    const [remember, setRemember] = useState(false);

    const [email, setEmail] = useState("rushikesh@example.com");
    const [password, setPassword] = useState("Password@123");

    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();


    const handleLogin = async () => {

        try {

            const response = await loginUser(
                email,
                password
            );

            const token = response.access_token;

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            console.log("JWT Payload:", payload);
            console.log("Role:", payload.role);


            const userData = {
                email: payload.sub,
                role: payload.role,
            };


            login(userData, token);


            if (payload.role === "OWNER") {

                navigate("/admin/dashboard");

            } else {

                const redirectTo = location.state?.from;

                navigate(
                    redirectTo || "/restaurant-search"
                );

            }

        } catch (error) {

            console.error("Login Error:", error);

            alert(
                error.response?.data?.detail ||
                "Login failed"
            );

        }

    };


    const fillDemoCredentials = (demo) => {

        setEmail(demo.email);
        setPassword(demo.password);

    };


    return (

        <div className="auth-page">

            <div className="auth-left">

                <h1>QRdine</h1>

                <h2>Scan. Order. Dine.</h2>

                <p>
                    Experience a smarter way to dine.
                    Scan the QR code, browse the menu,
                    and place your order instantly.
                </p>


                <div className="demo-credentials">

                    <p className="demo-credentials-title">
                        Demo Credentials (click to autofill)
                    </p>


                    {DEMO_CREDENTIALS.map((demo) => (

                        <button
                            key={demo.label}
                            type="button"
                            className="demo-credential-card"
                            onClick={() =>
                                fillDemoCredentials(demo)
                            }
                        >

                            <span className="demo-credential-label">
                                {demo.label}
                            </span>

                            <span className="demo-credential-detail">
                                {demo.email}
                            </span>

                            <span className="demo-credential-detail">
                                {demo.password}
                            </span>

                        </button>

                    ))}

                </div>

            </div>


            <div className="auth-right">

                <Card>

                    <h2>Welcome Back 👋</h2>

                    <p>Login to continue.</p>


                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter your email"
                        icon={<FaEnvelope />}
                    />


                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter your password"
                        icon={<FaLock />}
                    />


                    <Checkbox
                        checked={remember}
                        onChange={() =>
                            setRemember(!remember)
                        }
                        label="Remember Me"
                    />


                    <Button onClick={handleLogin}>
                        Login
                    </Button>


                    <div className="auth-bottom">

                        <Link to="#">
                            Forgot Password?
                        </Link>

                        <Link to="/signup">
                            Create Account
                        </Link>

                    </div>

                </Card>

            </div>

        </div>

    );

};


export default Login;