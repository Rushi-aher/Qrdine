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
import { loginUser } from "../../services/authService";

import "../../assets/styles/auth.css";

const Login = () => {
  const [role, setRole] = useState("customer");
  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState("rushikesh@example.com");
  const [password, setPassword] = useState("Password@123");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);

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
        navigate("/restaurant-search");
      }
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error.response?.data?.detail ||
          "Login failed"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <h1>QRdine</h1>

        <h2>Scan. Order. Dine.</h2>

        <p>
          Experience a smarter way to dine.
          Scan the QR code, browse the menu,
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
                value: "admin",
              },
            ]}
          />

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