import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaChair,
    FaCheck,
    FaUtensils,
} from "react-icons/fa";

import api from "../../services/api";

import "./TableSelection.css";

const TableSelection = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const restaurantId = searchParams.get("restaurant");

    const [restaurant, setRestaurant] = useState(null);

    const [tables, setTables] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedTable, setSelectedTable] = useState(null);


    useEffect(() => {

        if (!restaurantId) {

            setError(
                "Restaurant information is missing."
            );

            setLoading(false);

            return;

        }

        loadRestaurantAndTables();

    }, [restaurantId]);


    const loadRestaurantAndTables = async () => {

        try {

            const restaurantResponse = await api.get(
                "/restaurants/public"
            );

            const tablesResponse = await api.get(
                `/tables/public/${restaurantId}`
            );

            const selectedRestaurant =
                restaurantResponse.data.find(
                    (restaurant) =>
                        restaurant.id === Number(restaurantId)
                );

            setRestaurant(selectedRestaurant);

            setTables(tablesResponse.data);

        }

        catch (error) {

            console.error(
                "Table Selection Error:",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Unable to load tables."
            );

        }

        finally {

            setLoading(false);

        }

    };


    const handleTableSelect = (table) => {

        setSelectedTable(table.id);

        navigate(
            `/menu?table=${table.id}`
        );

    };


    if (loading) {

        return (

            <div className="table-selection-page">

                <div className="table-loading">

                    <div className="table-spinner"></div>

                    <h2>
                        Preparing your table selection...
                    </h2>

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="table-selection-page">

                <div className="table-error">

                    <div className="table-state-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to continue
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/restaurant-search")
                        }
                    >
                        Back to Restaurants
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="table-selection-page">

            <header className="table-selection-header">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/restaurant-search")
                    }
                >
                    <FaArrowLeft />
                    Restaurants
                </button>


                <div className="table-header-icon">
                    <FaUtensils />
                </div>


                <h1>
                    {restaurant?.name}
                </h1>

                <p>
                    Where would you like to sit?
                </p>

            </header>


            <main className="table-selection-content">

                <div className="table-instruction">

                    <h2>
                        Select your table
                    </h2>

                    <span>
                        Choose a table to view the menu
                    </span>

                </div>


                {tables.length === 0 ? (

                    <div className="table-error">

                        <div className="table-state-icon">
                            🍽️
                        </div>

                        <h2>
                            No tables available
                        </h2>

                        <p>
                            There are currently no tables
                            available for this restaurant.
                        </p>

                    </div>

                ) : (

                    <div className="table-grid">

                        {tables.map((table) => (

                            <button
                                key={table.id}
                                className={
                                    `table-card ${
                                        selectedTable === table.id
                                            ? "selected"
                                            : ""
                                    }`
                                }
                                onClick={() =>
                                    handleTableSelect(table)
                                }
                            >

                                <div className="table-card-icon">

                                    {selectedTable === table.id ? (
                                        <FaCheck />
                                    ) : (
                                        <FaChair />
                                    )}

                                </div>


                                <span>
                                    TABLE
                                </span>


                                <strong>
                                    {table.table_number}
                                </strong>


                                <small>
                                    Tap to continue
                                </small>

                            </button>

                        ))}

                    </div>

                )}


                <div className="table-footer">

                    <span>
                        <FaCheck />
                    </span>

                    <p>
                        Select your table to continue
                        to the restaurant menu.
                    </p>

                </div>

            </main>

        </div>

    );

};

export default TableSelection;