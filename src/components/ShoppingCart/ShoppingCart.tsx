import CartItem from "../CartItem";
import mockItems from "../../assets/menu.json";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import ShoppingSummary from "../ShoppingSummary/ShoppingSummary";
import PreviousOrders from "../PreviousOrders/PreviousOrders";

const ShoppingCart = () => {
  const { cartTotalItems } = useContext(ShoppingCartContext);

  return (
    <div className="w-full">
      <header className="p-4 pt-8">
        <h1 className="text-2xl">Carrinho de compras</h1>
        <span>Você tem {cartTotalItems} itens.</span>
      </header>
      <div className="flex sm:flex-col lg:flex-row">
        <div className="flex flex-col gap-2 mx-4">
          {mockItems.map((item, index) => (
            <div key={item.name + index}>
              <CartItem
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            </div>
          ))}
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
