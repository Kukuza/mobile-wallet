import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface IStackScreenProps {
  name: string;
  navigation: StackNavigationProp<any>;
  route: RouteProp<ParamListBase, any>;
}
