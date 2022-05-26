import { createSlice } from "@reduxjs/toolkit";
import WakalaContractKit from '../../utils/Celo-Integration/WakalaContractKit';
import { createNewAccountWithMnemonic } from "./auth.utils";


// Use to generate seed phrase
// import { generateKeys, generateMnemonic, MnemonicStrength } from '@celo/utils/lib/account';

const privateKeySlice = createSlice({
  name: 'encryptedPrivateKey',
  initialState: { keystore: {} },
  reducers: {
    createKeystore: function (state, action) {
      console.log("action", action)
      createNewAccountWithMnemonic();
      state.keystore = { test :"test"}
    },
    resetKeyStore: function(state, action) {
        state.keystore= {}
        WakalaContractKit.destroyInstance();
    },
    initiateSession: function (state, action) {
      
    }
  }
})
  
export const { createKeystore, resetKeyStore } = privateKeySlice.actions

export default privateKeySlice.reducer

