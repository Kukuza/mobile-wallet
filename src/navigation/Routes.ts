import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
import MyDrawer from "../screens/Drawer/MyDrawer";
import Onboarding from "../screens/Onboarding/Onboarding";
import AddFundsConfirmationScreen from '../screens/TransactionRequests/AddFundsConfirmationScreen';
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
    name: "MyDrawer",
    component: MyDrawer,
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
