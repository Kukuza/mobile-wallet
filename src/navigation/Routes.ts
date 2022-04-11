import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
import HomeScreen from "../screens/Home/Home";
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
];

export default routes;
