import CartItem from "../CartItem";
import mockMenu from "../../assets/menu.json";

const ShoppingCart = () => {
  return (
    <div className="w-[50rem]">
      <header className="p-4 pt-8">
        <h1 className="text-2xl">Carrinho de compras</h1>
        <span>Você tem 0 itens</span>
      </header>
      <div className="flex flex-col gap-2 mx-4">
        {mockMenu.map((item, index) => (
          <div key={item.name}>
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
    </div>
  );
};

export default ShoppingCart;
