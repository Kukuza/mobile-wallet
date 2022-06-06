// import CurrencyLayerAPI from "../currencyLayerUtils";

// describe("Currency layer", () => {
//   it("Convert ksh to usd", async () => {

//     const currencyLayer = new CurrencyLayerAPI();
//     const usd = await currencyLayer.convertCurrencies("kes", "usd", 1000);

//     expect(usd).toBeGreaterThan(0);
//     expect(usd).toBeLessThan(10);
//   });

//   it("Convert usd to ksh", async () => {

//     const currencyLayer = new CurrencyLayerAPI();
//     const ksh = await currencyLayer.convertCurrencies("usd", "kes", 10);

//     expect(ksh).toBeGreaterThan(0);
//     expect(ksh).toBeGreaterThan(1000);
//   });


//   it("Convert 0 usd to ksh", async () => {

//     const currencyLayer = new CurrencyLayerAPI();
//     const ksh = await currencyLayer.convertCurrencies("usd", "kes", 0);

//     expect(ksh).toEqual(0)
//   });

//   it("Test ksh to usd method", async () => {
//     const currencyLayer = new CurrencyLayerAPI();
//     const usd = await currencyLayer.kshToUSD(1000);

//     expect(usd).toBeGreaterThan(0)
//     expect(usd).toBeLessThan(10)
//   });

//   it("Test usd to ksh method", async () => {
//     const currencyLayer = new CurrencyLayerAPI();
//     const ksh = await currencyLayer.usdToKsh(10);

//     expect(ksh).toBeGreaterThan(0)
//     expect(ksh).toBeGreaterThan(1000)
//   });
// });
