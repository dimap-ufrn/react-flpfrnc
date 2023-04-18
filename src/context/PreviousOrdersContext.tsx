import { Dispatch, ReactNode, createContext, useEffect, useState } from "react";
import mockData from "../assets/menu.json";
import { CartItem } from "../types";

interface PreviousOrdersProviderProps {
  children?: ReactNode;
}

interface CartDetailedItem {
  id: number;
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

interface ContextProps {
  previous: CartDetailedItem[][] | undefined;
  refresher: number;
  setRefresher: Dispatch<number>;
}

export const PreviousOrdersContext = createContext<ContextProps>(
  {} as ContextProps
);

export function PreviousOrdersProvider(props: PreviousOrdersProviderProps) {
  const [previous, setPrevious] = useState<CartDetailedItem[][]>();

  // set a refreshed to rerender the component as the purchase is made
  const [refresher, setRefresher] = useState<number>(0);

  // gets stored data {id: number, quantity: number} from localstorage
  // and merge with the identical base object in the mock json
  useEffect(() => {
    const previousCartItems =
      localStorage.length > 0
        ? JSON.parse(localStorage.getItem("previousOrders") || "")
        : [];

    const result = previousCartItems?.map((prevCartItems: CartItem[]) => {
      const mergedItems = prevCartItems.map((item) => {
        return Object.assign(
          {},
          mockData.find((data) => data.id === item.id && prevCartItems) ||
            ({} as CartDetailedItem),
          { quantity: item.quantity }
        );
      });
      return mergedItems;
    });
    setPrevious(result);
  }, [refresher]);

  return (
    <PreviousOrdersContext.Provider
      value={{
        previous,
        refresher,
        setRefresher,
      }}
    >
      {props.children}
    </PreviousOrdersContext.Provider>
  );
}
