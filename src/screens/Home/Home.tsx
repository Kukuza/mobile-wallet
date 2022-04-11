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
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";


const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props: any) => {

  let wakalaContractKit = WakalaContractKit.getInstance();

  const { navigation } = props;

  let data = wakalaContractKit?.wakalaTxsArray;

  console.log(` HOME ${data}`);

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
          {data?.length == 0 ? (
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
              data={data}
              renderItem={({ item }) => <RequestCardComponent navigation={navigation} wakalaTransaction={item} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        <View style={{ marginBottom: 100 }}>
          <BottomMenu navigation={navigation}></BottomMenu>
        </View>
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
