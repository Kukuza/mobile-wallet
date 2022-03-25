import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
import HomeScreen from "../screens/Home/Home";
import AddFunds from "../screens/mpesaToCusd/AddFunds";
import SelectPaymentMethod from "../screens/mpesaToCusd/SelectPaymentMethodScreen";
import TransactionType from "../screens/mpesaToCusd/TransactionType";
import Onboarding from "../screens/Onboarding/Onboarding";
import AddFundsConfirmationScreen from "../screens/TransactionRequests/AddFundsConfirmationScreen";
import ConfirmMpesaPaymentSwipeScreen from "../screens/TransactionRequests/ConfirmMpesaPaymentSwipeScreen";
const routes: IRouteProps[] = [
  {
    name: "Onboarding",
    component: Onboarding,
  },
  {
    name: "Auth",
    component: AuthScreen,
  },
  {
    name: "Home",
    component: HomeScreen,
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
];

export default routes;
