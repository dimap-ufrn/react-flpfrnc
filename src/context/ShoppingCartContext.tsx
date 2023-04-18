import { ReactNode, createContext, useState } from "react";
import mockItems from "../assets/menu.json";
import { CartItem } from "../types";

interface ShoppingCartProviderProps {
  children?: ReactNode;
}

interface ContextProps {
  cartItems: CartItem[];
  cartTotalItems: number;
  cartTotalPrice: number;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  remove: (id: number) => void;
  removeAll: () => void;
}

export const ShoppingCartContext = createContext<ContextProps>(
  {} as ContextProps
);

export function ShoppingCartProvider(props: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number) {
    return cartItems.find((cartItem) => cartItem.id === id)?.quantity || 0;
  }

  const cartTotalItems = cartItems.reduce(
    (quantity, cartItem) => cartItem.quantity + quantity,
    0
  );

  const cartTotalPrice = cartItems.reduce((quantity, cartItem) => {
    return (
      quantity +
      (mockItems.find((i) => i.id === cartItem.id)?.price || 0) *
        cartItem.quantity
    );
  }, 0);

  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      return !currentItems.find((item) => item.id === id)
        ? [...currentItems, { id, quantity: 1 }]
        : currentItems.map((item) => {
            return item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      return currentItems.find((item) => item.id === id)?.quantity === 1
        ? currentItems.filter((item) => item.id !== id)
        : currentItems.map((item) => {
            return item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item;
          });
    });
  }

  function remove(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function removeAll() {
    setCartItems([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartTotalPrice,
        cartTotalItems,
        cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        remove,
        removeAll,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
}
