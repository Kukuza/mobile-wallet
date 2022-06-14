import Storage from "../utils/Storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const PROFILE_KEY = 'user';
const INITIAL_STATE: IProfile = {
    name: "",
    phoneNumber: "",
    email: "",
    locale: "",
    publicAddress: "",
    registered: false
}

 const profileSlice = createSlice ({
    name: PROFILE_KEY,
    initialState: {
        data: INITIAL_STATE,
        loading: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            saveProfile.fulfilled, (state, action) => {
                state.data = action.payload
            }),
        builder.addCase(
            saveProfile.pending, (state) => {
                state.loading = 'pending'
            }),
        builder.addCase(
            saveProfile.rejected, (state) => {
                state.loading = 'rejected'
            }),
        builder.addCase(
            getProfile.fulfilled, (state, action) => {
                state.data = action.payload
            }),
          builder.addCase(
            getProfile.pending, (state) => {
                state.loading = 'pending'
            }),
          builder.addCase(
            getProfile.rejected, (state) => {
                state.loading = 'rejected'
            }),
        builder.addCase(
            deleteProfile.fulfilled, (state, action) => {
                state.data = action.payload
            }),
          builder.addCase(
            deleteProfile.pending, (state) => {
                state.loading = 'pending'
            }),
          builder.addCase(
            deleteProfile.rejected, (state) => {
                state.loading = 'rejected'
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
    async (data: IProfile) => {
    Storage.remove(PROFILE_KEY);
    return await Storage.get(PROFILE_KEY);
 });