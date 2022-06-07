import axios from 'axios';

export default class CurrencyLayerAPI {

    /**
     * Tag for logging and debugging purposes.
     */
    private TAG = "[ " + this.constructor.name + "] : ";

    /**
     * Converts amount from one currency to another.
     * @param from current currency.
     * @param to destination currency.
     * @param amount the amount (in from currency) to be converted.
     * @returns the http response.
     */
    async convertCurrencies(from: string, to: string, amount: number) {

            from = from.trim().toUpperCase();
            to = to.trim().toUpperCase();

            if (from === to) {
                console.error(`${this.TAG}  to {${to}} === from {${from}} `);
                return amount;
            } else if (amount <= 0) {
                return 0;
            } else {
                try {

                    const rqstStr = `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount.toString()}`
                    let resp = await axios.get(rqstStr, {
                        headers: {
                            // TODO: Hide API key.
                            apikey: "YtOZXS1BqTeTZ00KOqlqaIHF1GaZEdgH"
                        }
                    });

                    let responseData = resp.data;
                    if (responseData.success) {
                        return responseData.result;
                    } else {
                        console.error(this.TAG, responseData);
                        return 0;
                    }
            } catch(error) {
                console.error(this.TAG, error)
            }
        }
    }

    /**
     * Converts kenya shillings to US dollars
     * @param amount the amount of money to be converted.
     * @returns the converted amount.
     */
    async kshToUSD(amount: number) {
        return await this.convertCurrencies("kes", "usd", amount);
    }

    /**
     * Converts US dollars to kenya shillings.
     * @param amount the amount of money to be converted.
     * @returns the converted amount.
     */
    async usdToKsh(amount: number) {
        return await this.convertCurrencies("usd", "kes", amount);
    }
    
}