import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WakalaContractKit from "../utils/smart_contract_integration/WakalaContractKit";
import { ContractKit, newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";
import configs from "../configs";
import { ProfileKey } from "../enums/ProfileKey";
import Storage from "../utils/Storage";
import ReadContractDataKit from '../utils/smart_contract_integration/read_data_utils/ReadContractDataKit';
import { Status } from "../enums/Status";

const walletSlice = createSlice ({
    name: 'wallet',
    initialState: {
        balance: 0,
        loading: false,
        status: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getBalance.fulfilled, 
            (state, action) => {
                state.balance = action.payload;
                state.loading = false;
                state.status = Status.SUCCESS;
            }),
        builder.addCase(
            getBalance.pending, 
            (state) => {
                state.loading = true;
            }),
        builder.addCase(
            getBalance.rejected, 
            (state) => {
                state.loading = false;
                state.status = Status.FAILED;
            })
      },
 });

export default walletSlice.reducer;

export const getBalance: any = createAsyncThunk(
    'getBalance', async () => {
    // const web3: Web3 | any = new Web3(configs.CONTRACT_KIT_URI!);

    const readContractData = ReadContractDataKit.getInstance();

    const profile: IProfile = await Storage.get(ProfileKey.PROFILE_KEY);
    const publicAddress = profile.publicAddress;  
    const balances = await readContractData?.getCurrentAccountBalance(publicAddress);
    let money: any = balances?.cUSD;
    // change balance to cUSD.
    let amount = readContractData?.kit?.web3.utils.fromWei(money?.toString(), "ether");
    const balance = Number(amount);
    console.log("Tx public address: ", publicAddress, balance);

    return balance;
});