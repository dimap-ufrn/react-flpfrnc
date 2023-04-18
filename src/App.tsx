import { PreviousOrdersProvider } from "./context/PreviousOrdersContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

export default function App() {
  return (
    <ShoppingCartProvider>
      <PreviousOrdersProvider>
        <ShoppingCart />
      </PreviousOrdersProvider>
    </ShoppingCartProvider>
  );
}
