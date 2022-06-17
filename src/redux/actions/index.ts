import CurrencyLayerAPI from "../../utils/currencyLayerUtils";
const currencyConverter = new CurrencyLayerAPI();
export async function getCurrentPrices() {
    return await currencyConverter.usdToKsh(1).then(response => response.json()).then(kes => {
        return { type: "GET_PRICE", payload: kes };
      });
  }