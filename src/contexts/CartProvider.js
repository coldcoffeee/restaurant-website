import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const idx = state.items.findIndex((item) => item.id === action.item.id);

    if (idx === -1) {
      return {
        items: state.items.concat(action.item),
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    } else {
      const newItems = [...state.items];
      newItems[idx].amount += action.item.amount;

      return {
        items: newItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    }
  } else if (action.type === "REMOVE") {
    const idx = state.items.findIndex((item) => item.id === action.id);
    let newItems = [...state.items];
    newItems[idx].amount--;
    if (newItems[idx].amount <= 0)
      newItems = newItems.filter((item) => item.id !== action.id);
    return {
      items: newItems,
      totalAmount: Math.abs(state.totalAmount - state.items[idx].price),
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
