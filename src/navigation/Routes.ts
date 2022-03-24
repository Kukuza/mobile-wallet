import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
import HomeScreen from "../screens/Home/Home";
import Onboarding from "../screens/Onboarding/Onboarding";
import AddFundsConfirmationScreen from '../screens/TransactionRequests/AddFundsConfirmationScreen';
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
    name: "Add Funds Confirmation",
    component: AddFundsConfirmationScreen,
  },
];

export default routes;
