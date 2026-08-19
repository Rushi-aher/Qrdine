import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FoodCard from "../../components/customer/FoodCard";
import FloatingCart from "../../components/customer/FloatingCart";
import OrderStatusTracker from "../../components/customer/OrderStatusTracker";

import api from "../../services/api";

import "./MenuPage.css";

const MenuPage = () => {

    const [searchParams] = useSearchParams();

    const tableId = searchParams.get("table");

    const [menuData, setMenuData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");


    useEffect(() => {

        if (!tableId) {

            setError("Table information is missing.");

            setLoading(false);

            return;

        }

        loadMenu();

    }, [tableId]);


    const loadMenu = async () => {

        try {

            const response = await api.get(
                `/menu/${tableId}`
            );

            setMenuData(response.data);

        }

        catch (error) {

            console.error(
                "Menu Error:",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Unable to load menu."
            );

        }

        finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="menu-page">

                <h2>
                    Loading menu...
                </h2>

            </div>

        );

    }


    if (error) {

        return (

            <div className="menu-page">

                <h2>
                    {error}
                </h2>

            </div>

        );

    }


    const categories = menuData?.categories || [];


    const filteredCategories =

        selectedCategory === "All"

            ? categories

            : categories.filter(
                (category) =>
                    category.id === selectedCategory
            );


    const getImageUrl = (imagePath) => {

        if (!imagePath) {

            return "";

        }

        if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
        ) {

            return imagePath;

        }

        return `http://127.0.0.1:8000/${imagePath}`;

    };


    return (

        <div className="menu-page">

            <div className="restaurant-banner">

                {menuData.restaurant.banner && (

                    <img
                        src={getImageUrl(
                            menuData.restaurant.banner
                        )}
                        alt={menuData.restaurant.name}
                    />

                )}

                <h1>
                    {menuData.restaurant.name}
                </h1>

                <p>
                    Table No. {menuData.table.table_number}
                </p>

            </div>


            <div className="category-bar">

                <button
                    className={
                        selectedCategory === "All"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedCategory("All")
                    }
                >
                    All
                </button>


                {categories.map((category) => (

                    <button
                        key={category.id}
                        className={
                            selectedCategory === category.id
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSelectedCategory(category.id)
                        }
                    >
                        {category.name}
                    </button>

                ))}

            </div>


            <div className="food-grid">

                {filteredCategories.map((category) =>

                    category.items.map((food) => (

                        <FoodCard
                            key={food.id}
                            food={{
                                ...food,
                                image: getImageUrl(
                                    food.image
                                ),
                            }}
                        />

                    ))

                )}

            </div>


            {/* Current order status */}

            <OrderStatusTracker />


            {/* Floating cart */}

            <FloatingCart />

        </div>

    );

};


export default MenuPage;