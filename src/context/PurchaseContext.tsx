import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface PurchaseProviderProps {
  children?: ReactNode;
}

type CartItem = {
  id: number;
  quantity: number;
};

interface ContextProps {
  totalItems: number;
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  remove: (id: number) => void;
}

export const PurchaseContext = createContext<ContextProps>({} as ContextProps);

export function PurchaseProvider(props: PurchaseProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalItems = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

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
    <PurchaseContext.Provider
      value={{
        totalItems,
        cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        remove,
      }}
    >
      {props.children}
    </PurchaseContext.Provider>
  );
}
