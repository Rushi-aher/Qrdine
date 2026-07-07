import { useState } from "react";
import { Link } from "react-router-dom";

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
  FaPhone,
} from "react-icons/fa";

import "../../assets/styles/auth.css";

const Signup = () => {

  const [role, setRole] = useState("customer");

  return (
    <div className="login-page">

      <div className="login-left">

        <h1>QRdine</h1>

        <h2>Create your account</h2>

        <p>
          Join QRdine and experience seamless digital dining.
        </p>

      </div>

      <div className="login-right">

        <Card>

          <h2>Create Account</h2>

          <p>Fill in the details below.</p>

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            icon={<FaUser />}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<FaEnvelope />}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            icon={<FaPhone />}
          />

          <Select
            label="Register As"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { label: "Customer", value: "customer" },
              { label: "Restaurant Admin", value: "admin" },
            ]}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            icon={<FaLock />}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            icon={<FaLock />}
          />

          <Button>
            Create Account
          </Button>

          <div className="auth-bottom">
            <span>Already have an account?</span>

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