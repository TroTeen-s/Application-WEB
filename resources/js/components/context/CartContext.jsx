import React, { createContext, useReducer } from "react";

export const CartContext = createContext({
    cart: [],
    dispatch: () => {
    }
});

export const ACTIONS = {
    CART_ADD: "add_to_cart",
    CART_ADD_UNIQUE: "add_to_cart_unique",
    CART_REMOVE_UNIQUE: "remove_from_cart_unique",
    CART_REMOVE: "remove_from_cart",
    CART_INIT: "initialize_cart",
    CART_RESET: "reset_cart"
};

const cartReducer = (cart, action) => {
    switch (action.type) {
        case ACTIONS.CART_ADD: {
            console.log("on ajoute au panier avec l'id" + action.payload.id);
            let cartToBe = JSON.parse(JSON.stringify(cart));
            const { id } = action.payload;
            let index = cartToBe.findIndex((product) => product.id === id);
            if (index !== -1) {
                cartToBe[index].quantity++;
            } else {
                cartToBe.push({
                    id: id,
                    quantity: 1
                });
            }
            let cartString = JSON.stringify(cartToBe);

            localStorage.setItem("cart", cartString);

            return cartToBe;
        }

        case ACTIONS.CART_ADD_UNIQUE: {
            console.log("on ajoute au panier avec l'id" + action.payload.id);
            let cartToBe = JSON.parse(JSON.stringify(cart));
            const { id } = action.payload;
            let index = cartToBe.findIndex((product) => product.id === id);
            if (index !== -1) {
                console.log(`Product with product id ${id} already in cart`);
            } else {
                cartToBe.push({
                    id: id,
                    quantity: 1
                });
            }
            let cartString = JSON.stringify(cartToBe);

            localStorage.setItem("cart", cartString);

            return cartToBe;
        }

        case ACTIONS.CART_INIT:
            return action.payload.initialCart;

        case ACTIONS.CART_RESET:
            return [];

        case ACTIONS.CART_REMOVE: {
            console.log("on remove au panier avec l'id" + action.payload.id);
            let cartToBe = JSON.parse(JSON.stringify(cart));
            const { id } = action.payload;
            let index = cartToBe.findIndex((product) => product.id === id);
            if (index !== -1) {
                cartToBe[index].quantity--;
                if (cartToBe[index].quantity <= 0) {
                    cartToBe.splice(index, 1);
                }
            }
            let cartString = JSON.stringify(cartToBe);

            localStorage.setItem("cart", cartString);

            return cartToBe;
        }
        case ACTIONS.CART_REMOVE_UNIQUE: {
            console.log("on remove au panier avec l'id" + action.payload.id);
            let cartToBe = JSON.parse(JSON.stringify(cart));
            const { id } = action.payload;
            let index = cartToBe.findIndex((product) => product.id === id);
            if (index !== -1) {
                cartToBe.splice(index, 1);

            }
            let cartString = JSON.stringify(cartToBe);

            localStorage.setItem("cart", cartString);

            return cartToBe;
        }

        default:
            return cart;
    }
};


const CartProvider = ({ children }) => {

    const cartInitializer = () => {
        let cartStorage = localStorage.getItem("cart");

        if (cartStorage) {
            return JSON.parse(cartStorage);
        } else {
            return [
                {
                    id: 1,
                    quantity: 3
                },
                {
                    id: 7,
                    quantity: 4
                }
            ];

        }
    };

    const [cart, dispatch] = useReducer(cartReducer, [], cartInitializer);

    return (
        <>
            <CartContext.Provider value={{ cart, dispatch }}>
                {children}
            </CartContext.Provider>
        </>

    );
};

export default CartProvider;
