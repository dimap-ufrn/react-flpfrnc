import { useState } from "react";
import { priceFormat } from "../utils";

interface ItemDetailProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const CartItem = ({ name, description, imageUrl, price }: ItemDetailProps) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  return (
    <div className="flex gap-4 p-4 shadow-xl bg-white rounded-2xl overflow-hidden">
      <div className="-my-4 -ml-4">
        <img className="h-full shadow-sm shadow-black" src={imageUrl} />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-xl">{name}</h1>
        <span className="text-sm max-w-[20rem] min-w-[20rem]">
          {description}
        </span>
        <span className="text-sm">{priceFormat(price)}</span>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 bg-[lightgray] flex justify-center items-center">
            {itemQuantity}
          </div>
          <div className="flex flex-col">
            <button
              id="increaseQuantity"
              className="w-10"
              onClick={() => setItemQuantity(itemQuantity + 1)}
            >
              ⬆️
            </button>
            <button
              id="decreaseQuantity"
              className="w-10"
              onClick={() => {
                itemQuantity > 0 && setItemQuantity(itemQuantity - 1);
              }}
            >
              ⬇️
            </button>
          </div>
        </div>
        <div className="min-w-[10rem] px-4 text-end">
          {itemQuantity > 0 ? priceFormat(price * itemQuantity) : "R$ 0.00"}
        </div>
        <div>
          <button
            id="decreaseQuantity"
            className="w-10"
            onClick={() => setItemQuantity(0)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
