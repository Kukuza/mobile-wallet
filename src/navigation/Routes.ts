import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
import AddFunds from "../screens/mpesaToCusd/AddFunds";
import SelectPaymentMethod from "../screens/mpesaToCusd/SelectPaymentMethodScreen";
import TransactionType from "../screens/mpesaToCusd/TransactionType";
import MyDrawer from "../screens/Drawer/MyDrawer";
import ConfirmMpesaPaymentSwipeScreen from "../screens/TransactionRequests/ConfirmMpesaPaymentSwipeScreen";
import ConfirmRequest from "../screens/PerformRequest/ConfirmRequest";
import TransactionConfirmationScreen from "../screens/TransactionRequests/TransactionConfirmationScreen";
import TestScreen from "../screens/TestScreen/TestScreen";
import Rating from "../screens/KarmaRating/Rating";
import TransactionSuccess from "../screens/TransactionRequests/TransactionSuccess";
import TopUpViewRequestScreen from "../screens/TransactionRequests/TopUpViewRequestScreen";
import AddFundsConfirmationScreen from "../screens/TransactionRequests/AddFundsConfirmationScreen";
import AccountAddress from "../screens/Settings/AccountAddress/AccountAddress";
import EnterPin from "../screens/Auth/EnterPin";
import ConfirmPin from "../screens/Auth/ConfirmPin";
import ConnectYourPhoneNumberScreen from "../screens/Attestation/ConnectYouPhoneNumberScreen/ConnectYourPhoneNumberScreen";
import AttestationLoaderScreen from "../screens/Attestation/LoaderScreen/AttestationLoaderScreen";
import CodeConfirmationScreen from "../screens/Attestation/AttestationCodeConfirmationScreen/CodeConfirmationScreen";
import Send from "../screens/Send/Send";
import YouAreAllSetScreen from "../screens/Attestation/YouAreAllSetScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditions/TermsAndConditionsScreen";
import EnterAmount from "../screens/Send/EnterAmount";
import Description from "../screens/Send/Description";
import SwipeToSend from "../screens/Send/SwipeToSend";
import HomeScreen from "../screens/Home/Home";
import Qrcode from "../screens/Send/Qrcode";
import Onboarding from "../screens/Onboarding/Onboarding";
import LanguagesList from "../screens/Languages/LanguagesList";
import UserDetails from "../screens/Onboarding/UserDetails"; 
import CurrencySelector from "../screens/Onboarding/CurrencySelector"
import SetupRecovery from "../screens/Onboarding/SetupRecovery";
import SetupRecoveryInfo from "../screens/Onboarding/SetupRecoveryInfo";
import RecoveryCodePin from "../screens/Onboarding/RecoveryCodePin";
import ViewRecoveryCode from "../screens/Onboarding/ViewRecoveryCode";
import RecoveryPhraseSaved from "../screens/Onboarding/RecoveryPhraseSaved";
import EditProfile from "../screens/Settings/EditProfile";
import SelectLanguage from "../screens/Settings/SelectLanguage";
import SelectCurrency from "../screens/Settings/SelectCurrency";
import ConnectedDapps from "../screens/Settings/ConnectedDapps";
import ViewAccountInfo from "../screens/Settings/AccountAddress/ViewAccountInfo";
import RecoveryPhrase from "../screens/Settings/RecoveryPhrase/RecoveryPhrase";
import ViewRecoveryInfo from "../screens/Settings/RecoveryPhrase/ViewRecoveryInfo";
import RecoveryEnterPin from "../screens/Settings/RecoveryPhrase/RecoveryEnterPin";

const routes: IRouteProps[] = [
  {
    name: "Home",
    component: HomeScreen,
  },
  {
    name: "Test",
    component: TestScreen,
  },
  {
    name: "Onboarding",
    component: Onboarding,
  },
  {
    name: "Auth",
    component: AuthScreen,
  },
  {
    name: "MyDrawer",
    component: MyDrawer,
  },
  {
    name: "Add Funds",
    component: AddFunds,
  },
  {
    name: "TransactionType",
    component: TransactionType,
  },
  {
    name: "SelectPaymentMethod",
    component: SelectPaymentMethod,
  },
  {
    name: "Add Funds Confirmation",
    component: AddFundsConfirmationScreen,
  },
  {
    name: "Confirm Mpesa Payment Swipe Screen",
    component: ConfirmMpesaPaymentSwipeScreen,
  },
  {
    name: "Confirm Request",
    component: ConfirmRequest,
  },
  {
    name: "Transaction Confirmation Screen",
    component: TransactionConfirmationScreen,
  },
  {
    name: "Top Up View Request",
    component: TopUpViewRequestScreen,
  },
  {
    name: "Rating",
    component: Rating,
  },
  {
    name: "TransactionSuccess",
    component: TransactionSuccess,
  },
  {
    name: "TopUpViewRequestScreen",
    component: TopUpViewRequestScreen,
  },
  {
    name: "AccountAddress",
    component: AccountAddress,
  },
  {
    name:"EnterPin",
    component: EnterPin,
  },
  {
    name:"EditProfile",
    component: EditProfile,
  },
  {
    name:"ConfirmPin",
    component: ConfirmPin,
  },
  {
    name: "ConnectYourPhoneNumberScreen",
    component: ConnectYourPhoneNumberScreen
  },
  {
    name: "AttestationLoaderScreen",
    component: AttestationLoaderScreen
  },
  {
    name: "AttestationCodeConfirmationScreen",
    component: CodeConfirmationScreen
  },
  {
    name:"Send",
    component:Send
  },
  {
    name: "YouAreAllSetScreen",
    component: YouAreAllSetScreen
  },
  {
    name: "TermsAndConditionsScreen",
    component: TermsAndConditionsScreen

  },
  {
    name:"EnterAmount",
    component: EnterAmount
  },
  {
    name:"Select Language",
    component: SelectLanguage
  },
  {
    name:"Select Currency",
    component: SelectCurrency
  },
  {
    name:"RecoveryPhraseSetting",
    component:RecoveryPhrase
  },
  {
    name:"Connected Dapps",
    component: ConnectedDapps
  },
  {
    name:"Description",
    component: Description
  },
  {
    name:"SwipeToSend",
    component: SwipeToSend
  },
  {
    name:"Qr",
    component: Qrcode
  },
  {
    name:"AccountInfo",
    component:ViewAccountInfo
  },
  {
    name:"ViewRecoveryInfo",
    component:ViewRecoveryInfo
  },
  {
    name:"RecoveryEnterPin",
    component:RecoveryEnterPin
  },
  {
    name: "LanguagesList",
    component: LanguagesList
  },
  {
    name: "UserDetails",
    component: UserDetails
  },
  {
    name: "CurrencySelector",
    component: CurrencySelector
  },
  {
    name: "SetupRecovery",
    component: SetupRecovery
  },
  {
    name: "SetupRecoveryInfo",
    component: SetupRecoveryInfo
  },
  {
    name: "RecoveryCodePin",
    component: RecoveryCodePin
  },
  {
    name: "ViewRecoveryCode",
    component: ViewRecoveryCode
  },
  {
    name: "RecoveryPhraseSaved",
    component: RecoveryPhraseSaved
  },
];

export default routes;
