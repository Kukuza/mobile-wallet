import IRouteProps from "../navigation/RouteProps";
import AuthScreen from "../screens/Auth/AuthScreen";
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
];

export default routes;
