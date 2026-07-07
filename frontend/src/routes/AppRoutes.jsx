import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import RestaurantSearch from "../pages/customer/RestaurantSearch";
import Dashboard from "../pages/admin/Dashboard";

import CustomerRoute from "./CustomerRoute";
import AdminRoute from "./AdminRoute";
import MenuPage from "../pages/customer/MenuPage";
import Cart from "../pages/customer/Cart";

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route

                    path="/restaurant-search"

                    element={

                        <CustomerRoute>

                            <RestaurantSearch />

                        </CustomerRoute>

                    }

                />

                <Route

                    path="/admin/dashboard"

                    element={

                        <AdminRoute>

                            <Dashboard />

                        </AdminRoute>

                    }

                />
                
                <Route path="/cart"

                    element={ <CustomerRoute> <Cart/> </CustomerRoute>}
                />

            </Routes>

        </BrowserRouter>

    );

};

export default AppRoutes;