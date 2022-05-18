import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
import AddFunds from "../screens/mpesaToCusd/AddFunds";
import SelectPaymentMethod from "../screens/mpesaToCusd/SelectPaymentMethodScreen";
import TransactionType from "../screens/mpesaToCusd/TransactionType";
import MyDrawer from "../screens/Drawer/MyDrawer";
import Onboarding from "../screens/Onboarding/Onboarding";
import ConfirmMpesaPaymentSwipeScreen from "../screens/TransactionRequests/ConfirmMpesaPaymentSwipeScreen";
import ConfirmRequest from "../screens/PerformRequest/ConfirmRequest";
import TransactionConfirmationScreen from "../screens/TransactionRequests/TransactionConfirmationScreen";
import TestScreen from "../screens/TestScreen/TestScreen";
import Rating from "../screens/KarmaRating/Rating";
import TransactionSuccess from "../screens/TransactionRequests/TransactionSuccess";
import TopUpViewRequestScreen from "../screens/TransactionRequests/TopUpViewRequestScreen";
import AddFundsConfirmationScreen from "../screens/TransactionRequests/AddFundsConfirmationScreen";
import AccountAddress from "../screens/Settings/AccountAddress";
import EnterPin from "../screens/Settings/RecoveryPhrase/EnterPin";
import ConnectYourPhoneNumberScreen from "../screens/Attestation/ConnectYouPhoneNumberScreen/ConnectYourPhoneNumberScreen";
import AttestationLoaderScreen from "../screens/Attestation/LoaderScreen/AttestationLoaderScreen";
import CodeConfirmationScreen from "../screens/Attestation/AttestationCodeConfirmationScreen/CodeConfirmationScreen";
import Send from "../screens/Send/Send";
import YouAreAllSetScreen from "../screens/Attestation/YouAreAllSetScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditions/TermsAndConditionsScreen";
import EnterAmount from "../screens/Send/EnterAmount";



const routes: IRouteProps[] = [
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
  }
];

export default routes;
