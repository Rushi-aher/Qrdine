import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import "./assets/styles/global.css";
import "./assets/styles/variables.css";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./assets/styles/themes.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <AuthProvider>

            <CartProvider>

                <ThemeProvider>

                    <App />

                </ThemeProvider>

            </CartProvider>

        </AuthProvider>

    </React.StrictMode>

);