import { useContext, useEffect, useState } from "react";
import { priceFormat } from "../utils";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

interface ItemDetailProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const CartItem = ({
  id,
  name,
  description,
  imageUrl,
  price,
}: ItemDetailProps) => {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
    remove,
  } = useContext(ShoppingCartContext);

  return (
    <div className="flex gap-4 p-4 shadow-xl bg-white rounded-2xl overflow-hidden h-[120px]">
      <div className="-my-4 -ml-4 w-[120px]">
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
          <div className="w-10 h-10 bg-[#979ACF4D] flex justify-center items-center rounded-lg">
            {getItemQuantity(id)}
          </div>
          <div className="flex flex-col">
            <button
              id="increaseQuantity"
              className="w-10"
              onClick={() => increaseCartQuantity(id)}
            >
              ⬆️
            </button>
            <button
              id="decreaseQuantity"
              className="w-10"
              onClick={() => decreaseCartQuantity(id)}
            >
              ⬇️
            </button>
          </div>
        </div>
        <div className="min-w-[10rem] px-4 text-end">
          {getItemQuantity(id) > 0
            ? priceFormat(price * getItemQuantity(id))
            : "R$ 0.00"}
        </div>
        <div>
          <button
            id="clearItemQuantity"
            className="w-10"
            onClick={() => remove(id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
