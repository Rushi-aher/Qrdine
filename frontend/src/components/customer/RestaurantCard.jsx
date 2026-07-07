import "./RestaurantCard.css";
import { FaStar, FaArrowRight } from "react-icons/fa";

const RestaurantCard = ({ restaurant, onEnter }) => {
  return (
    <div className="restaurant-card">

      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="restaurant-image"
      />

      <div className="restaurant-content">

        <div className="restaurant-title">

          <h3>{restaurant.name}</h3>

          <span>

            <FaStar />

            {restaurant.rating}

          </span>

        </div>

        <p>{restaurant.cuisine}</p>

        <button
          onClick={() => onEnter(restaurant)}
        >
          Enter Restaurant

          <FaArrowRight />

        </button>

      </div>

    </div>
  );
};

export default RestaurantCard;