import { useContext } from "react";
import { priceFormat } from "../../components/utils";
import { PreviousOrdersContext } from "../../context/PreviousOrdersContext";

const PreviousOrders = () => {
  const { previous } = useContext(PreviousOrdersContext);

  return (
    <div className="flex flex-col w-[500px] max-h-[400px] overflow-y-scroll">
      {previous?.map((receiptList, index) => {
        return (
          <div key={index} className="my-2">
            <strong className="px-2">{`Pedido Nº: ${index + 1}`}</strong>
            {receiptList.map((receiptItem, index) => {
              return (
                <div
                  className="flex flex-col p-4 bg-yellow-200"
                  key={`receiptItem${index}`}
                >
                  <span>{receiptItem.name}</span>
                  <div className="flex justify-between">
                    <span>
                      {receiptItem.quantity}x - {priceFormat(receiptItem.price)}
                    </span>
                    <strong>
                      {priceFormat(receiptItem.price * receiptItem.quantity)}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PreviousOrders;
