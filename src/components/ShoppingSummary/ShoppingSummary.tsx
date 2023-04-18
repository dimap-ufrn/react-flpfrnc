import { FormEvent, useContext, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { priceFormat } from "../utils";
import { Fee } from "./deliveryFee";
import { CartItem } from "../../types";
import { PreviousOrdersContext } from "../../context/PreviousOrdersContext";

interface DeliveryInfoProps {
  location: string;
  price: number;
}

const ShoppingSummary = () => {
  const { cartTotalItems, cartTotalPrice, cartItems, removeAll } =
    useContext(ShoppingCartContext);

  const { refresher, setRefresher } = useContext(PreviousOrdersContext);
  const [zipCode, setZipCode] = useState<string>("");
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoProps>({
    location: "",
    price: 0,
  });

  const cepMask = (cep: string) => {
    return cep.replace(/(\d{5})-?(\d{3})/, "$1-$2");
  };

  async function buscaCep(
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    if (!zipCode)
      return setDeliveryInfo({ price: 0, location: "CEP não informado" });

    const zip = zipCode.replace(/[^\/\d]/g, "");
    if (zip.length !== 8) {
      setDeliveryInfo({ price: 0, location: "CEP inválido" });
    }
    const data = await fetch(`https://viacep.com.br/ws/${zip}/json/`).then(
      (res) => res.json()
    );

    if (data.erro) {
      setDeliveryInfo({
        price: 0,
        location: "CEP não encontrado",
      });
      return;
    }

    setDeliveryInfo({
      price:
        Fee.find(
          (location) => location.location === `${data.localidade} - ${data.uf}`
        )?.price || 99,
      location: `${data.localidade} - ${data.uf}`,
    });
  }

  function clearPurchaseData() {
    removeAll();
    setDeliveryInfo({ location: "", price: 0 });
    setZipCode("");
  }

  function proccessPurchase() {
    let previousOrders: CartItem[][] = JSON.parse(
      localStorage.getItem("previousOrders") || "[]"
    );

    previousOrders.push(cartItems);

    localStorage.setItem(`previousOrders`, JSON.stringify(previousOrders));

    clearPurchaseData();
    setRefresher(refresher + 1);
    alert("Compra efetuada!");
  }

  return (
    <>
      <div className="max-h-[400px] xl:max-w-[500px] lg:max-w-[300px] rounded-xl bg-[#565ABB] font-normal text-white">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <span className="py-4">Resumo</span>
            <button
              className="bg-[#EF4444]  active:bg-[#c22f2f] hover:bg-[#f55f5f] p-2 text-sm rounded-md h-8"
              onClick={clearPurchaseData}
            >
              Limpar Carrinho
            </button>
          </div>
          <hr className="my-4 border-[#979ACF]" />
          <div className="flex flex-col gap-2">
            <span>Frete</span>
            <div className="flex gap-2 items-end">
              <form className="flex gap-2 items-center" onSubmit={buscaCep}>
                <label htmlFor="cep">CEP</label>
                <input
                  type="text"
                  id="cep"
                  className="bg-[#979ACF4D] outline-none rounded-md px-2 h-8 font-thin w-[120px]"
                  maxLength={zipCode.includes("-") ? 9 : 8}
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(cepMask(e.target.value));
                  }}
                />
              </form>
              <button
                className="bg-[#4DE1C1] hover:bg-[#62eed0] active:bg-[#2bb194] p-2 text-sm rounded-md h-8 outline-none"
                type="submit"
                onClick={buscaCep}
              >
                Pesquisar
              </button>
            </div>
            <span className="text-xs font-thin">{deliveryInfo.location} </span>
          </div>
          <hr className="my-4 border-[#979ACF]" />
          <div>
            <div className="w-full flex justify-between">
              <span>Itens ({cartTotalItems}):</span>
              <span>{priceFormat(cartTotalPrice)}</span>
            </div>
            <div className="w-full flex justify-between">
              <span>Frete:</span>
              <span>{priceFormat(deliveryInfo?.price)}</span>
            </div>
          </div>
          <hr className="my-4 border-[#979ACF]" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span>Total:</span>
              <span>{priceFormat(cartTotalPrice + deliveryInfo.price)}</span>
            </div>
            <button
              disabled={!cartTotalItems || !deliveryInfo.price}
              onClick={proccessPurchase}
              className="bg-[#4DE1C1] hover:bg-[#62eed0] active:bg-[#2bb194] p-2 text-md font-bold rounded-md h-12 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Fechar Pedido
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingSummary;
