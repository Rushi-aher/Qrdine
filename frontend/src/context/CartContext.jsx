import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (food) => {

        const existing = cart.find(item => item.id === food.id);

        if (existing) {

            setCart(

                cart.map(item =>

                    item.id === food.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item

                )

            );

        }

        else {

            setCart([

                ...cart,

                {

                    ...food,

                    quantity: 1

                }

            ]);

        }

    };

    const increaseQuantity = (id) => {

        setCart(

            cart.map(item =>

                item.id === id

                    ? { ...item, quantity: item.quantity + 1 }

                    : item

            )

        );

    };

    const decreaseQuantity = (id) => {

        setCart(

            cart
                .map(item =>

                    item.id === id

                        ? {

                            ...item,

                            quantity: item.quantity - 1

                        }

                        : item

                )
                .filter(item => item.quantity > 0)

        );

    };

    const totalPrice = cart.reduce(

        (total, item) =>

            total + item.price * item.quantity,

        0

    );

    const totalItems = cart.reduce(

        (total, item) =>

            total + item.quantity,

        0

    );

    return (

        <CartContext.Provider

            value={{

                cart,

                addToCart,

                increaseQuantity,

                decreaseQuantity,

                totalItems,

                totalPrice

            }}

        >

            {children}

        </CartContext.Provider>

    );

};

export const useCart = () => useContext(CartContext);