import { configureStore } from '@reduxjs/toolkit'
import privateKeyProducers from './auth/authSlice';

const customStore = configureStore({
  reducer: {
    privateKey: privateKeyProducers
  }
})

export default customStore;