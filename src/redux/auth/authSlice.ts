import { createSlice } from "@reduxjs/toolkit";
import WakalaContractKit from '../../utils/Celo-Integration/WakalaContractKit';
import { createNewAccountWithMnemonic, encryptPasswordWithNewMnemonic, getStoredMnemonic } from "./auth.utils";

// export function* importBackupPhraseSaga({ phrase, useEmptyWallet }: ImportBackupPhraseAction) {

// Use to generate seed phrase
// import { generateKeys, generateMnemonic, MnemonicStrength } from '@celo/utils/lib/account';

const privateKeySlice = createSlice({
  name: 'encryptedPrivateKey',
  initialState: { keystore: "" },
  reducers: {
    createKeystore: function (state, action) {
      console.log("action", action)
      encryptPasswordWithNewMnemonic(action.payload).then((storageResult) => {
        getStoredMnemonic(action.payload).then((mnemonic) => {
          console.log("updated mnemonic =====> ", mnemonic)
        })
      })
      
    },
    resetKeyStore: function(state, action) {
        state.keystore= ""
        
    },
    initiateSession: function (state, action) {
      
    }
  }
})
  
export const { createKeystore, resetKeyStore } = privateKeySlice.actions

export default privateKeySlice.reducer

