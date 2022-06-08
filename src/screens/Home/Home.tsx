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
import { EventData } from "web3-eth-contract";
import { useEffect, useState } from "react";
import { WakalaEscrowTransaction } from "../../utils/Celo-Integration/wakala_types";
import CurrencyLayerAPI from '../../utils/currencyLayerUtils';

const EmptyList = (props) => {
  return (
    <View style={styles.wrapper}>
      {/* {isFetching ? <Text>{loadingMessage}</Text> : <></>} */}
      <Image
        source={require("../../assets/images/home/home_empty.png")}
        style={styles.image}
      />
      <Text style={styles.text}>
        All requests have been fulfilled. Take a break, get some air, check
        back in later
      </Text>
    </View>
  );
};

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props: any) => {
  const { navigation } = props;

  let wakalaContractKit = WakalaContractKit.getInstance();
  const [kesRate, setKesRate] = useState({});

  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(new Array<WakalaEscrowTransaction>());

  // fetch data
  const fetchData = async () => {
    if (wakalaContractKit) {
      setData(await wakalaContractKit?.fetchTransactions());
    } else {
      console.log("data is null");
    }
    setIsFetching(false);
  };

  // set status and refetch data.
  const onRefresh = () => {
    if (!isFetching) {
      setIsFetching(true);
      fetchData();
    }
  };

  useEffect(() => {
    onRefresh()
    convertCurrencies();
    return () => {
      // onRefresh()
    }
  }, []);
  
  const convertCurrencies = async () => {
    const currencyConverter = new CurrencyLayerAPI();
    const ksh = await currencyConverter.usdToKsh(1);
    setKesRate(ksh);
  }
  
  
  // Rerender on new transaction event.
  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "TransactionInitEvent",
    async (error: Error, event: EventData) => {
      let index: number = event.returnValues.wtxIndex;
      if (index) {
        onRefresh();
      }
    }
  );

  // startRender();
  return (
    <ScreenComponent>
      <View
        style={styles.container}
      >
        <View style={styles.menu}>

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="menu" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          
        </View>

        <View style={{ alignItems: "center", height: SIZES.height * 0.82 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <RequestCardComponent
                kesRate={kesRate}
                navigation={navigation}
                wakalaTransaction={item}
              />
            )}
            keyExtractor={(item) => item.id}
            onRefresh={onRefresh}
            refreshing={isFetching}
            progressViewOffset={250}
            ListEmptyComponent={<EmptyList />}
          />

        </View>
        <View>
          <BottomMenu navigation={navigation}></BottomMenu>
        </View>
      </View>
    </ScreenComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  menu: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    flex: 1,
    alignContent: "stretch",
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
    marginTop: 35,
    width: SIZES.width * 0.7,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 140,
  },
});
