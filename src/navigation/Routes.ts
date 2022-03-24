import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
import HomeScreen from "../screens/Home/Home";
import AddFunds from "../screens/mpesaToCusd/AddFunds";
import Onboarding from "../screens/Onboarding/Onboarding";
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
    name: "AddFunds",
    component: AddFunds,
  },
];

export default routes;
