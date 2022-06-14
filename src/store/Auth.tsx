import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    encryptPasswordWithNewMnemonic, 
    getAccountFromMnemonic, 
    getStoredMnemonic } from "../redux/auth/auth.utils";
import WakalaContractKit from '../utils/Celo-Integration/WakalaContractKit';
import { retrieveStoredItem } from '../redux/auth/session.key.storage.utils';

 const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        pin: null,
        data: {},
        keys: {privateKey:'', publicKey: '', address: ''},
        loading: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            enterPin.fulfilled, 
            (state, action) => {
                state.pin = action.payload
            }),
        builder.addCase(
            confirmPin.fulfilled, 
            (state, action) => {
                state.pin = action.payload
            }),
         builder.addCase(
            retrieveItem.fulfilled, 
            (state, action) => {
                state.data = action.payload
            }),
        builder.addCase(
            getMnemonic.fulfilled, 
            (state, action) => {
                state.data = action.payload
            }),
        builder.addCase(
            getAccountByMnemonic.fulfilled, 
            (state, action) => {
                state.data = action.payload
            }),
        builder.addCase(
            createAccount.fulfilled, 
            (state, action) => {
                state.keys = action.payload
            }),
        builder.addCase(
            createAccount.pending, 
            (state) => {
                state.loading = 'pending'
            }),
        builder.addCase(
            createAccount.rejected, 
            (state) => {
                state.loading = 'rejected'
            })
      },
 });

export default authSlice.reducer;

export const enterPin: any = createAsyncThunk(
    'enterPin', (pin: string) => {
    return pin;
 });

export const confirmPin: any = createAsyncThunk(
    'confirmPin', (pin: string) => {
    return pin;
});

 export const retrieveItem: any = createAsyncThunk(
    'retrieveItem', async () => {
        return await retrieveStoredItem("mnemonic");
 });

  export const getMnemonic: any = createAsyncThunk(
    'getMnemonic', async (pin: string) => {
        return await getStoredMnemonic(pin);
 });

 export const getAccountByMnemonic: any = createAsyncThunk(
    'getAccountByMnemonic', async (mnemonic: string) => {
        return await getAccountFromMnemonic(mnemonic)
 });

 export const createAccount: any = createAsyncThunk(
    'createAccount', async (pin: string) => {
        const encryptedMnemonic = await retrieveStoredItem("mnemonic");
        let keys: any;

        if (encryptedMnemonic) {
            const mnemonic = await getStoredMnemonic(pin);
            keys = await getAccountFromMnemonic(mnemonic ?? "");
            WakalaContractKit.createInstance(keys.privateKey);
        }else {
            await encryptPasswordWithNewMnemonic(pin);
            const mnemonic = await getStoredMnemonic(pin);
            keys = await getAccountFromMnemonic(mnemonic ?? "");
            WakalaContractKit.createInstance(keys.privateKey);
        }

    return keys;
 });