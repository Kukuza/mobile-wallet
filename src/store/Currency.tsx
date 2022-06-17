import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CurrencyLayerAPI from "../utils/currencyLayerUtils";
import {ICurrency} from '../interfaces/ICurrency';

 const currencySlice = createSlice ({
    name:"currency",
    initialState: {
        data:null,
        loading: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getCurrency.fulfilled, (state, action) => {
                state.data = action.payload
            }),
          builder.addCase(
            getCurrency.pending, (state) => {
                state.loading = 'pending'
            }),
          builder.addCase(
            getCurrency.rejected, (state) => {
                state.error = 'rejected'
            })
      }
 });

export default currencySlice.reducer;

export const getCurrency: any = createAsyncThunk(
    'getCurrency', 
    async (request:ICurrency) => {
    const convert = new CurrencyLayerAPI();
    return await convert.convertCurrencies(request.from, request.to, request.amount)
 });
