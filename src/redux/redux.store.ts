import { configureStore } from '@reduxjs/toolkit'
import privateKeyProducers from './auth/authSlice';
import currencyRatesReducer from './currency/currencySlice'

const customStore = configureStore({
  reducer: {
    privateKey: privateKeyProducers,
    kesRates:currencyRatesReducer
  }
})

export default customStore;