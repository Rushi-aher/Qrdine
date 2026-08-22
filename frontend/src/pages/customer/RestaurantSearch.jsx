import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaArrowRight,
    FaMapMarkerAlt,
    FaUtensils,
} from "react-icons/fa";

import { getRestaurants } from "../../services/restaurantService";
import CustomerNavbar from "../../components/customer/CustomerNavbar";

import "./RestaurantSearch.css";

const RestaurantSearch = () => {

    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadRestaurants();

    }, []);


    const loadRestaurants = async () => {

        try {

            const data = await getRestaurants();

            setRestaurants(data);

        }

        catch (error) {

            console.error(
                "Restaurant Error:",
                error
            );

            setError(
                "Unable to load restaurants."
            );

        }

        finally {

            setLoading(false);

        }

    };


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


    const handleRestaurantSelect = (restaurantId) => {

        navigate(
            `/table-selection?restaurant=${restaurantId}`
        );

    };


    if (loading) {

        return (

            <div className="restaurant-search-page">

                <div className="restaurant-loading">

                    <div className="loading-spinner"></div>

                    <h2>
                        Finding restaurants...
                    </h2>

                    <p>
                        Please wait a moment.
                    </p>

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="restaurant-search-page">

                <CustomerNavbar />

                <div className="restaurant-state">

                    <div className="state-icon">
                        ⚠️
                    </div>

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="restaurant-search-page">

            <CustomerNavbar />

            <section className="restaurant-hero">

                <div className="restaurant-hero-content">

                    <span className="restaurant-eyebrow">
                        <FaUtensils />
                        QRdine
                    </span>

                    <h1>
                        Where would you
                        <span> like to dine?</span>
                    </h1>

                    <p>
                        Choose a restaurant and select your
                        table to explore the menu.
                    </p>

                </div>

            </section>


            <section className="restaurant-list-section">

                <div className="restaurant-section-header">

                    <div>

                        <h2>
                            Restaurants
                        </h2>

                        <p>
                            {restaurants.length}{" "}
                            {restaurants.length === 1
                                ? "restaurant"
                                : "restaurants"}{" "}
                            available
                        </p>

                    </div>

                </div>


                {restaurants.length === 0 ? (

                    <div className="restaurant-state">

                        <div className="state-icon">
                            🍽️
                        </div>

                        <h2>
                            No restaurants available
                        </h2>

                        <p>
                            Restaurants will appear here once
                            they are registered.
                        </p>

                    </div>

                ) : (

                    <div className="restaurant-grid">

                        {restaurants.map((restaurant) => (

                            <article
                                className="restaurant-card"
                                key={restaurant.id}
                                onClick={() =>
                                    handleRestaurantSelect(
                                        restaurant.id
                                    )
                                }
                            >

                                <div className="restaurant-image">

                                    {restaurant.banner ? (

                                        <img
                                            src={getImageUrl(
                                                restaurant.banner
                                            )}
                                            alt={restaurant.name}
                                        />

                                    ) : (

                                        <div className="restaurant-placeholder">

                                            <FaUtensils />

                                        </div>

                                    )}

                                    <div className="restaurant-image-overlay">
                                        View Restaurant
                                    </div>

                                </div>


                                <div className="restaurant-card-content">

                                    <div className="restaurant-card-title">

                                        <h3>
                                            {restaurant.name}
                                        </h3>

                                        <span className="restaurant-arrow">
                                            <FaArrowRight />
                                        </span>

                                    </div>


                                    {restaurant.description && (

                                        <p className="restaurant-description">
                                            {restaurant.description}
                                        </p>

                                    )}


                                    {restaurant.address && (

                                        <div className="restaurant-location">

                                            <FaMapMarkerAlt />

                                            <span>
                                                {restaurant.address}
                                            </span>

                                        </div>

                                    )}

                                    <button
                                        className="restaurant-select-button"
                                        onClick={(event) => {

                                            event.stopPropagation();

                                            handleRestaurantSelect(
                                                restaurant.id
                                            );

                                        }}
                                    >
                                        Select Restaurant

                                        <FaArrowRight />

                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </div>

    );

};

export default RestaurantSearch;