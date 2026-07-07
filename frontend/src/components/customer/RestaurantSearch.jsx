import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaQrcode } from "react-icons/fa";

import RestaurantCard from "../../components/customer/RestaurantCard";

import restaurants from "../../data/restaurants";

import "./RestaurantSearch.css";

const RestaurantSearch = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
    );

    const enterRestaurant = (restaurant) => {

        console.log(restaurant);

        navigate("/menu");

    };

    return (

        <div className="restaurant-page">

            <div className="restaurant-header">

                <h1>Discover Restaurants</h1>

                <p>

                    Search your restaurant or scan the QR code on your table.

                </p>

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search Restaurant..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <button className="scan-button">

                    <FaQrcode />

                    Scan Table QR

                </button>

            </div>

            <div className="restaurant-grid">

                {

                    filteredRestaurants.map((restaurant) => (

                        <RestaurantCard

                            key={restaurant.id}

                            restaurant={restaurant}

                            onEnter={enterRestaurant}

                        />

                    ))

                }

            </div>

        </div>

    );

};

export default RestaurantSearch;