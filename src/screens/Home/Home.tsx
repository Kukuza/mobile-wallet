import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import BottomMenu from "../../components/menus/BottomMenu";
import RequestCardComponent from "../../components/cards/RequestViewCard";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import COLORS from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { DrawerActions } from "@react-navigation/native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props: any) => {
  const { navigation } = props;

  return (
    <ScreenComponent>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="menu" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", height: SIZES.height * 0.82 }}>
          {DATA.length > 0 ? (
            <View style={styles.wrapper}>
              {/* {isFetching ? <Text>{loadingMessage}</Text> : <></>} */}
              <Image
                source={require("../../assets/images/home/home_empty.png")}
                style={styles.image}
              />
              <Text style={styles.text}>
                All requests have been fullfilled. Take a break, get some air,
                check back in later
              </Text>
            </View>
          ) : (
            <FlatList
              data={DATA}
              renderItem={({ item }) => <RequestCardComponent />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        <BottomMenu navigation={navigation}></BottomMenu>
      </View>
    </ScreenComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 20,
  },
  image: {
    height: 180,
    maxWidth: SIZES.width * 0.8,
    resizeMode: "contain",
  },
  text: {
    ...FONTS.body4,
    textAlign: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
});
