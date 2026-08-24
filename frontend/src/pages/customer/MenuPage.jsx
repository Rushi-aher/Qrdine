import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FoodCard from "../../components/customer/FoodCard";
import FloatingCart from "../../components/customer/FloatingCart";
import OrderStatusTracker from "../../components/customer/OrderStatusTracker";
import CustomerNavbar from "../../components/customer/CustomerNavbar";

import api from "../../services/api";

import "./MenuPage.css";

const MenuPage = () => {

    const [searchParams] = useSearchParams();

    const tableId = searchParams.get("table");

    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    // Search
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {

        if (!tableId) {

            setError("Table information is missing.");
            setLoading(false);

            return;

        }

        loadMenu();

    }, [tableId]);


    // Always start menu from the top
    useEffect(() => {

        window.scrollTo(0, 0);

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

        return `${import.meta.env.VITE_API_URL}/${imagePath}`;

    };


    // Search food items
    const searchedCategories = filteredCategories
        .map((category) => {

            const items = category.items.filter((food) => {

                if (!searchText.trim()) {
                    return true;
                }

                return food.name
                    .toLowerCase()
                    .includes(
                        searchText.toLowerCase()
                    );

            });

            return {
                ...category,
                items
            };

        })
        .filter(
            (category) =>
                category.items.length > 0
        );


    const handleSearchToggle = () => {

        setSearchOpen(
            previous => !previous
        );

        if (searchOpen) {
            setSearchText("");
        }

    };


    return (

        <div className="menu-page">

            <CustomerNavbar />


            {/* Restaurant Banner */}

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


            {/* Category Bar + Search */}

            <div className="category-bar">

                <div className="category-list">

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
                                setSelectedCategory(
                                    category.id
                                )
                            }
                        >
                            {category.name}
                        </button>

                    ))}

                </div>


                {/* Search */}

                <div
                    className={`menu-search ${
                        searchOpen
                            ? "open"
                            : ""
                    }`}
                >

                    {searchOpen && (

                        <input
                            type="text"
                            placeholder="Search food..."
                            value={searchText}
                            onChange={(e) =>
                                setSearchText(
                                    e.target.value
                                )
                            }
                        />

                    )}


                    <button
                        className="search-toggle"
                        onClick={
                            handleSearchToggle
                        }
                        aria-label="Search"
                    >
                        {searchOpen
                            ? "✕"
                            : "⌕"
                        }
                    </button>

                </div>

            </div>


            {/* Food Grid */}

            <div className="food-grid">

                {searchedCategories.length > 0 ? (

                    searchedCategories.map(
                        (category) =>

                            category.items.map(
                                (food) => (

                                    <FoodCard
                                        key={food.id}
                                        food={{
                                            ...food,
                                            image:
                                                getImageUrl(
                                                    food.image
                                                ),
                                        }}
                                    />

                                )
                            )

                    )

                ) : (

                    <div className="no-food-results">

                        <h3>
                            No food found
                        </h3>

                        <p>
                            Try searching for
                            something else.
                        </p>

                    </div>

                )}

            </div>


            {/* Current Order Status */}

            <OrderStatusTracker />


            {/* Floating Cart */}

            <FloatingCart />

        </div>

    );

};


export default MenuPage;