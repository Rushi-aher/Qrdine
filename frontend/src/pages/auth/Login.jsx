import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

import {
  Button,
  Card,
  Checkbox,
  Input,
  Select,
} from "../../components/ui";

import { useAuth } from "../../context/AuthContext";

import "../../assets/styles/auth.css";

const Login = () => {
  const [role, setRole] = useState("customer");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    const userData = {
      name: "Demo User",
      role,
    };

    login(userData);

    if (role === "customer") {
      navigate("/restaurant-search");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>QRdine</h1>

        <h2>Scan. Order. Dine.</h2>

        <p>
          Experience a smarter way to dine. Scan the QR code, browse the menu,
          and place your order instantly.
        </p>
      </div>

      <div className="login-right">
        <Card>
          <h2>Welcome Back 👋</h2>

          <p>Login to continue.</p>

          <Select
            label="Login As"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              {
                label: "Customer",
                value: "customer",
              },
              {
                label: "Restaurant Admin",
                value: "admin",
              },
            ]}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<FaEnvelope />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<FaLock />}
          />

          <Checkbox
            checked={remember}
            onChange={() => setRemember(!remember)}
            label="Remember Me"
          />

          <Button onClick={handleLogin}>
            Login
          </Button>

          <div className="auth-bottom">
            <Link to="#">Forgot Password?</Link>

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