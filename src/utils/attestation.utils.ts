import { ContractKit } from '@celo/contractkit';
import WakalaContractKit from './Celo-Integration/WakalaContractKit';
import { extractAttestationCodeFromMessage } from "@celo/utils/lib/attestations";
import { OdisUtils } from '@celo/identity/lib/odis'

/**
 * Contains attestation logic.
 */
export class AttestationUtils {
    
    walalaContractKit?: WakalaContractKit;

    contractKit?: ContractKit;

    phoneNumber:  string;

    account: string;

    phoneHash;

    pepper;

    authSigner;

    privateKey;

    constructor(privateKey: string) {
        const phoneNumber: string = "+254791725651";
        this.privateKey = privateKey;
        this.walalaContractKit = WakalaContractKit.getInstance();
        this.phoneNumber = phoneNumber;
        this. account = this.contractKit?.defaultAccount ?? '';
        this.contractKit = this.walalaContractKit?.kit;
        // this.authSigner = {
        //     authenticationMethod: OdisUtils.Query.AuthenticationMethod.WALLET_KEY,
        //     contractKit: this.contractKit,
        // };
    }

    async init() {
        await this.getHashAndPepper();
    }

    // lookup phone number from ODIS, get the identifier (pepper) and phone number hash
    async getHashAndPepper() {
        console.log('Phone Number:', this.phoneNumber);
        const response = await this.lookup();
        this.pepper = response.pepper;
        this.phoneHash = response.phoneHash;
        console.log(`Pepper: ${this.pepper}`);
        console.log(`Phone hash: ${this.phoneHash}`);
    }


    // lookup the phoneHash and pepper for given account
    async lookup() {
        let odisUrl, odisPubKey;

        // Test net: TODO  move to env vars.
        odisUrl = "https://us-central1-celo-phone-number-privacy.cloudfunctions.net";
        odisPubKey = "kPoRxWdEdZ/Nd3uQnp3FJFs54zuiS+ksqvOm9x8vY6KHPG8jrfqysvIRU0wtqYsBKA7SoAsICMBv8C/Fb2ZpDOqhSqvr/sZbZoHmQfvbqrzbtDIPvUIrHgRS0ydJCMsA";
        
        // const blindingFactor = ReactBlsBlindingClient.generateDeterministicBlindingFactor(
        //     this.privateKey,
        //     this.phoneNumber
        // )

        // Main net: TODO move to env vars
        // odisUrl = "https://us-central1-celo-pgpnp-mainnet.cloudfunctions.net";
        // odisPubKey = "FvreHfLmhBjwxHxsxeyrcOLtSonC9j7K3WrS4QapYsQH6LdaDTaNGmnlQMfFY04Bp/K4wAvqQwO9/bqPVCKf8Ze8OZo8Frmog4JY4xAiwrsqOXxug11+htjEe1pj4uMA";
            
        const serviceContext = { odisUrl, odisPubKey };
    
        let response = {};
        response = await OdisUtils.PhoneNumberIdentifier.getPhoneNumberIdentifier(
            this.phoneNumber, this.account, this.authSigner, serviceContext);
    
        return response;
    }
}