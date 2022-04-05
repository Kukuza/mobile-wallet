import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "react-native-svg";
import COLORS from "../../styles/colors/colors";
import { web3 } from "../../utils/magic";
import { WAKALA_CONTRACT_ADDRESS } from "../../utils/ContractAdresses/contract";
import wakalaEscrowAbi from "../../utils/ContractABIs/wakalaEscrow.abi.json";
import { AbiItem } from "web3-utils";
import { connect, useDispatch } from "react-redux";

const TestScreen = (props) => {
  const dispatch = useDispatch();
  const magic = props.magic;
  const navigation = props.navigation;

  const [submitted, SetSubmitted] = useState(false);

  const magicCall = async () => {
    const helloWorldContract = "0x1e1bF128A09fD30420CE9fc294C4266C032eF6E7";
    const contract = new web3.eth.Contract(
      wakalaEscrowAbi as AbiItem[],
      WAKALA_CONTRACT_ADDRESS
    );

    console.log("xxxxxxxxxxxxxxxxxxxxxxx> start");
    await contract.methods
      .initializeDepositTransaction(1)
      .send({ from: "0x9FDf3F87CbEE162DC4a9BC9673E5Bb6716186757" });
    console.log("<xxxxxxxxxxxxxxxxxxxxxxx finish");
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => magicCall()}>
        <Text> Click</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    magic: state.magic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: async (action) => {
      await dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);

// export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 40,
  },

  buttonText: {
    fontSize: 20,
    lineHeight: 23.3,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Rubik_700Bold",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 56,
    width: 200,
  },
});
