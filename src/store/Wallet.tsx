import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WakalaContractKit from "../utils/Celo-Integration/WakalaContractKit";
import { ContractKit, newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";
import configs from "../configs";
import { ProfileKey } from "../enums/ProfileKey";
import Storage from "../utils/Storage";

const walletSlice = createSlice ({
    name: 'wallet',
    initialState: {
        balance: 0,
        loading: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getBalance.fulfilled, 
            (state, action) => {
                state.balance = action.payload
            }),
        builder.addCase(
            getBalance.pending, 
            (state) => {
                state.loading = 'pending'
            }),
        builder.addCase(
            getBalance.rejected, 
            (state) => {
                state.loading = 'rejected'
            })
      },
 });

export default walletSlice.reducer;

export const getBalance: any = createAsyncThunk(
    'getBalance', async () => {
    // const web3: Web3 | any = new Web3(configs.CONTRACT_KIT_URI!);
    const web3: Web3 | any = new Web3("https://alfajores-forno.celo-testnet.org");
    const kit: ContractKit = newKitFromWeb3(web3);
    const profile: IProfile = await Storage.get(ProfileKey.PROFILE_KEY);
    const publicAddress = profile.publicAddress;  
    const balances = await kit.getTotalBalance(publicAddress);
    let money: any = balances?.cUSD;
    // change balance to cUSD.
    let amount = kit?.web3.utils.fromWei(money?.toString(), "ether");
    const balance = Number(amount);
    console.log("Tx public address: ", publicAddress);

    return balance;
});