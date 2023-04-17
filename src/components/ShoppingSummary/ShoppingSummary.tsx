import { useContext, useEffect, useRef, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { priceFormat } from "../utils";
import { Fee } from "./deliveryFee";

interface DeliveryInfoProps {
  location: string;
  price: number;
}

const ShoppingSummary = () => {
  const { cartTotalItems, cartTotalPrice } = useContext(ShoppingCartContext);
  const [zipCode, setZipCode] = useState<string>("");
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoProps>({
    location: "",
    price: 0,
  });

  const cepMask = (cep: string) => {
    return cep.replace(/(\d{5})-?(\d{3})/, "$1-$2");
  };

  async function buscaCep() {
    if (!zipCode) return;
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
        )?.price || 0,
      location: `${data.localidade} - ${data.uf}`,
    });
  }

  return (
    <>
      <div className="min-h-780px w-[300px] rounded-xl bg-[#565ABB] font-normal text-white">
        <div className="p-4">
          <span className="py-4">Resumo</span>
          <hr className="my-4 border-[#979ACF]" />
          <div className="flex flex-col gap-2">
            <span>Frete</span>
            <div className="flex gap-2 items-end">
              <div className="flex gap-2 items-center">
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
              </div>
              <button
                className="bg-[#4DE1C1] hover:bg-[#62eed0] active:bg-[#2bb194] p-2 text-sm rounded-md h-8"
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
          Total: {priceFormat(cartTotalPrice + deliveryInfo.price)}
        </div>
      </div>
    </>
  );
};

export default ShoppingSummary;
