import mockItems from "../../assets/menu.json";
import { useContext, useEffect } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import ShoppingSummary from "../ShoppingSummary/ShoppingSummary";
import PreviousOrders from "../PreviousOrders/PreviousOrders";
import CartItem from "../CartItem/CartItem";

const ShoppingCart = () => {
  const { cartTotalItems, increaseCartQuantity, cartItems } =
    useContext(ShoppingCartContext);

  const handleInitializeCart = () => {
    if (cartItems.length === 0) {
      return mockItems.map((item) => {
        increaseCartQuantity(item.id);
      });
    }

    return alert("Carrinho já preenchido");
  };

  return (
    <div className="w-full">
      <header className="p-4 pt-8">
        <div className="flex gap-4">
          {" "}
          <h1 className="text-2xl">Carrinho de compras</h1>
          <button
            className="bg-[#4DE1C1] hover:bg-[#62eed0] active:bg-[#2bb194] p-2 text-sm rounded-md h-8 outline-none"
            type="submit"
            onClick={handleInitializeCart}
          >
            Preencher Carrinho
          </button>
        </div>
        <span>Você tem {cartTotalItems} itens.</span>
      </header>
      <div className="flex sm:flex-col lg:flex-row">
        <div className="flex flex-col gap-2 mx-4">
          {mockItems.map(
            (item, index) =>
              cartItems.find((cartItem) => cartItem.id === item.id) && (
                <div key={item.name + index}>
                  <CartItem
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl}
                  />
                </div>
              )
          )}
        </div>
        <aside className="flex lg:flex-col sm:p-5 lg:p-0 sm:flex-row-reverse gap-4">
          <ShoppingSummary />
          <PreviousOrders />
        </aside>
      </div>
    </div>
  );
};

export default ShoppingCart;
