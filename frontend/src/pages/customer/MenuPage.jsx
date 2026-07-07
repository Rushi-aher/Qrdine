import FoodCard from "../../components/customer/FoodCard";
import FloatingCart from "../../components/customer/FloatingCart";

import menu from "../../data/menu";

import "./MenuPage.css";

const MenuPage = () => {

    return (

        <div className="menu-page">

            <div className="restaurant-banner">

                <h1>Spice Garden</h1>

                <p>Table No. 07</p>

            </div>

            <div className="category-bar">

                <button>All</button>
                <button>Pizza</button>
                <button>Beverages</button>
                <button>Desserts</button>

            </div>

            <div className="food-grid">

                {

                    menu.map((food) => (

                        <FoodCard
                            key={food.id}
                            food={food}
                        />

                    ))

                }

            </div>

            {/* Floating Cart */}
            <FloatingCart />

        </div>

    );

};

export default MenuPage;