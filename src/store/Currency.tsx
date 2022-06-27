import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CurrencyLayerAPI from "../utils/currencyLayerUtils";
import {ICurrency} from '../interfaces/ICurrency';
import { IRate } from "../interfaces/IRate";

 const currencySlice = createSlice ({
    name:"currency",
    initialState: {
        data:null,
        rate: null,
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
        }),
        builder.addCase(
            getRate.fulfilled, (state, action) => {
                state.rate = action.payload
            }),
        builder.addCase(
            getRate.pending, (state) => {
            state.loading = 'pending'
        }),
        builder.addCase(
            getRate.rejected, (state) => {
            state.error = 'rejected'
        })
      }
 });

export default currencySlice.reducer;

export const getCurrency: any = createAsyncThunk(
    'getCurrency', 
    async (request: ICurrency) => {
    const convert = new CurrencyLayerAPI();
    return await convert.convertCurrencies(request.from, request.to, request.amount)
 });

 export const getRate: any = createAsyncThunk(
    'getRate', 
    async (request:IRate) => {
    const convert = new CurrencyLayerAPI();
    return await convert.convertCurrencies(request.from, request.to, 1)
 });