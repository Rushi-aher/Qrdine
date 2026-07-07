import "./FoodCard.css";
import { useCart } from "../../context/CartContext";

const FoodCard = ({ food }) => {

    const {

        cart,

        addToCart,

        increaseQuantity,

        decreaseQuantity

    } = useCart();

    const cartItem = cart.find(item => item.id === food.id);

    return (

        <div className="food-card">

            <img
                src={food.image}
                alt={food.name}
            />

            <div className="food-content">

                <h3>{food.name}</h3>

                <p>{food.description}</p>

                <div className="food-bottom">

                    <span>₹{food.price}</span>

                    {

                        !cartItem ?

                            (

                                <button
                                    className="add-btn"
                                    onClick={() => addToCart(food)}
                                >

                                    Add

                                </button>

                            )

                            :

                            (

                                <div className="quantity-box">

                                    <button

                                        onClick={() => decreaseQuantity(food.id)}

                                    >

                                        -

                                    </button>

                                    <span>

                                        {cartItem.quantity}

                                    </span>

                                    <button

                                        onClick={() => increaseQuantity(food.id)}

                                    >

                                        +

                                    </button>

                                </div>

                            )

                    }

                </div>

            </div>

        </div>

    );

};

export default FoodCard;