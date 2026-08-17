import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import RestaurantSearch from "../pages/customer/RestaurantSearch";
import MenuPage from "../pages/customer/MenuPage";
import Cart from "../pages/customer/Cart";

import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import AddProducts from "../pages/admin/Addproducts";
import Categories from "../pages/admin/Categories";
import Orders from "../pages/admin/Orders";
import Tables from "../pages/admin/Tables";
import RestaurantProfile from "../pages/admin/RestaurantProfile";
import Analytics from "../pages/admin/Analytics";

import CustomerRoute from "./CustomerRoute";
import AdminRoute from "./AdminRoute";
import TableSelection from "../pages/customer/TableSelection";
import AdminLayout from "../layouts/AdminLayout";

const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/restaurant-search"
                    element={
                        <CustomerRoute>
                            <RestaurantSearch />
                        </CustomerRoute>
                    }
                />


                <Route
                    path="/table-selection"
                    element={
                        <CustomerRoute>
                            <TableSelection />
                        </CustomerRoute>
                    }
                />

                
                <Route
                    path="/menu"
                    element={
                        <CustomerRoute>
                            <MenuPage />
                        </CustomerRoute>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <CustomerRoute>
                            <Cart />
                        </CustomerRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >

                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="products"
                        element={<Products />}
                    />

                    <Route
                        path="add-product"
                        element={<AddProducts />}
                    />

                    <Route
                        path="categories"
                        element={<Categories />}
                    />

                    <Route
                        path="orders"
                        element={<Orders />}
                    />

                    <Route
                        path="tables"
                        element={<Tables />}
                    />

                    <Route
                        path="restaurant"
                        element={<RestaurantProfile />}
                    />

                    <Route
                        path="analytics"
                        element={<Analytics />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

};

export default AppRoutes;