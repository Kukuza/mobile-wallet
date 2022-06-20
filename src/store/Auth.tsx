import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    encryptPasswordWithNewMnemonic, 
    getAccountFromMnemonic, 
    getStoredMnemonic } from "../redux/auth/auth.utils";
import WakalaContractKit from '../utils/Celo-Integration/WakalaContractKit';
import { retrieveStoredItem } from '../redux/auth/session.key.storage.utils';
import {MNEMONIC_STORAGE_KEY} from '../redux/auth/auth.utils'
import Storage from "../utils/Storage";
import { ProfileKey} from '../enums/ProfileKey'
import { INITIAL_STATE } from "./Profile";

 const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        pin: null,
        data: {},
        keys: { privateKey: '', publicKey: '', address: '' },
        loading: false,
        status: '',
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
                state.keys = action.payload;
                state.loading = false;
                state.status = 'Success';
            }),
        builder.addCase(
            createAccount.pending, 
            (state) => {
                state.loading = true;
            }),
        builder.addCase(
            createAccount.rejected, 
            (state) => {
                state.loading = false;
                state.status = "Failed";
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
        return await retrieveStoredItem(MNEMONIC_STORAGE_KEY);
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
    const encryptedMnemonic = await retrieveStoredItem(MNEMONIC_STORAGE_KEY);
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

    await storePublicAddress(keys.address);

    return keys;
 });

export async function storePublicAddress(publicAddress: string) {
    const profile = await Storage.get(ProfileKey.PROFILE_KEY);
    
    let p: any;
    if(profile) {
        p = {
            name: profile.name,
            phoneNumber: profile.phoneNumber,
            email: profile.email,
            locale: profile.locale,
            publicAddress: publicAddress,
            registered: true,
            mnemonic: ""
        }
      }else {
        p = INITIAL_STATE;
        p.publicAddress = publicAddress;
      }

    Storage.save(ProfileKey.PROFILE_KEY, JSON.stringify(p));
    const isNew: IProfile = await Storage.get(ProfileKey.PROFILE_KEY);
    console.log("Public address: ", isNew.publicAddress);

    return await Storage.get(ProfileKey.PROFILE_KEY);
}