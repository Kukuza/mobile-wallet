import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CurrencyLayerAPI from "../utils/currencyLayerUtils";
import {ICurrency} from '../interfaces/ICurrency';
import { IRate } from "../interfaces/IRate";
import { Status } from "../enums/Status";

 const currencySlice = createSlice ({
    name:"currency",
    initialState: {
        data:null,
        rate: null,
        loading: false,
        status: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getCurrency.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.status = Status.SUCCESS;
            }),
        builder.addCase(
        getCurrency.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(
        getCurrency.rejected, (state) => {
            state.loading = false;
            state.status = Status.FAILED;
        }),
        builder.addCase(
            getRate.fulfilled, (state, action) => {
                state.rate = action.payload;
                state.loading = false;
                state.status = Status.SUCCESS;
            }),
        builder.addCase(
            getRate.pending, (state) => {
                state.loading = true;
        }),
        builder.addCase(
            getRate.rejected, (state) => {
                state.loading = false;
                state.status = Status.FAILED;
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