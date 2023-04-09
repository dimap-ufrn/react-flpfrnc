export const priceFormat = (price: number) => {
    const strPrice = price.toFixed(2).toString();

    return strPrice.split(".")[1].length < 2
      ? `R$ ${strPrice
          .padEnd(price.toString().length + 1, "0")
          .replace(".", ",")}`
      : `R$ ${strPrice.replace(".", ",")}`;
  };