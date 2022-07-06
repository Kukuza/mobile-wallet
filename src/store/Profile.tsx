import Storage from "../utils/Storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileKey} from '../enums/ProfileKey'
import { Status } from "../enums/Status";

const PROFILE_KEY = ProfileKey.PROFILE_KEY;

export const INITIAL_STATE: IProfile = {
    name: "",
    phoneNumber: "",
    email: "",
    locale: "",
    language: "en",
    publicAddress: "",
    registered: false,
    mnemonic: "",
    currencyCode: "",
    recoverySaved: false
}

 const profileSlice = createSlice ({
    name: PROFILE_KEY,
    initialState: {
        data: INITIAL_STATE,
        loading: false,
        status: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            saveProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.status = Status.SUCCESS;
            }),
        builder.addCase(
            saveProfile.pending, (state) => {
                state.loading = true;
            }),
        builder.addCase(
            saveProfile.rejected, (state) => {
                state.loading = false;
                state.status = Status.FAILED;
            }),
        builder.addCase(
            getProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.status = Status.SUCCESS;
            }),
          builder.addCase(
            getProfile.pending, (state) => {
                state.loading = true;
            }),
          builder.addCase(
            getProfile.rejected, (state) => {
                state.loading = false;
                state.status = Status.FAILED;
            }),
        builder.addCase(
            deleteProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.status = Status.SUCCESS;
            }),
          builder.addCase(
            deleteProfile.pending, (state) => {
                state.loading = true;
            }),
          builder.addCase(
            deleteProfile.rejected, (state) => {
                state.loading = false;
                state.status = Status.FAILED;
            })
      },
 });

export default profileSlice.reducer;

export const saveProfile: any = createAsyncThunk(
    'saveProfile', 
    async (data: IProfile) => {
    Storage.save(PROFILE_KEY, JSON.stringify(data));
    return await Storage.get(PROFILE_KEY);
 });

export const getProfile: any = createAsyncThunk(
    'getProfile', 
    async () => {
    return await Storage.get(PROFILE_KEY);
 });

 export const deleteProfile: any = createAsyncThunk(
    'deleteProfile', 
    async () => {
    Storage.remove(PROFILE_KEY);
    return await Storage.get(PROFILE_KEY);
 });