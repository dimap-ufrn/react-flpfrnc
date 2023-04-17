import "./App.css";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

export default function App() {
  return (
    <ShoppingCartProvider>
      <ShoppingCart />
    </ShoppingCartProvider>
  );
}
