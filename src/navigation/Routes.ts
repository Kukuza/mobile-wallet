import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
import HomeScreen from "../screens/Home";
import SelectOperation from "../screens/mpesaToCusd/TransactionType";
import Onboarding from "../screens/Onboarding/Onboarding";
import SelectPaymentMethod from "../screens/mpesaToCusd/SelectPaymentMethodScreen";
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
    name: "TransactionType",
    component: SelectOperation,
  },
  {
    name: "SelectPaymentMethod",
    component: SelectPaymentMethod,
  },
];

export default routes;
