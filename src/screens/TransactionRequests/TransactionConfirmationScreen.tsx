import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { Fragment, useRef, useState } from "react";
import TransactionConfirmationCard from "../../components/cards/TransactionConfirmationCard";
import SwipeButton from "../../components/buttons/SwipeButton";
import ScreenComponent from "../../containers/ScreenComponent";
import NavHeader from "../../containers/NavHeader";
import { useRoute, useNavigation } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import Modal from "../../components/modals/Modal";
import ModalLoading from "../../components/modals/ModalLoading";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { Ionicons } from "@expo/vector-icons";
import { THANK_YOU_IMAGE, CONNECTIVITY } from "../../assets/images";
import { mainStyles } from "../../components/componentTheme";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { magic } from "../../utils/magic";
import { WakalaEscrowAbi } from "../../utils/ContractABIs/WakalaEscrowAbi";
import { WAKALA_CONTRACT_ADDRESS } from "../../utils/ContractAdresses/contract";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import { AbiItem } from "web3-utils";
import COLORS from "../../styles/colors/colors";
import ContractMethods from "../../utils/Celo-Integration/contractMethods";
import { EventData } from "web3-eth-contract";

const ModalContent = (props) => {
  return (
    <View style={modalStyles.container}>
      {props.isActionSuccess ? (
        props.operation === "TopUp" ? (
          <View>
            <Image source={THANK_YOU_IMAGE} style={modalStyles.image} />
            <Text style={modalStyles.title}>Thank you!</Text>
            <Text style={modalStyles.text}>
              After your agents confirms of M-PESA payment receipt. Your cUSD
              will be deposited to your wallet.
            </Text>

            <TouchableOpacity onPress={() => props.handleAction()}>
              <Text style={modalStyles.button}>Got it!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Ionicons
              name="checkmark-circle"
              size={36}
              color="#4840BB"
              style={{ textAlign: "center", marginBottom: 12 }}
            />
            <Text style={[mainStyles.title, { color: "#4840BB" }]}>
              Transaction Successful!
            </Text>
            <TouchableOpacity onPress={() => props.handleAction()}>
              <Text style={modalStyles.button}>Got it!</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <View>
          <Image source={CONNECTIVITY} style={modalStyles.errorImage} />
          <Text style={modalStyles.title}>Oh Snap!</Text>
          <Text style={modalStyles.text}>
            Something just happened. Please try again.
          </Text>
          <Text style={{ ...FONTS.body5, textAlign: "center", marginTop: 5 }}>
            {props.errorMessage}
          </Text>
          <TouchableOpacity onPress={() => props.handleAction()}>
            <Text style={modalStyles.button}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const TransactionConfirmationScreen = (props) => {
  const route = useRoute<any>();
  const modalRef = useRef<any>();
  const navigation = useNavigation<any>();

  //   const value = route.params.value;
  //   const operation = route.params.operation;
  //   const transaction = route.params.transaction;

  //   todo remove
  const value = 2;
  const operation = "TopUp";
  const transaction = route.params?.tx;
  console.log(transaction.id);

  const wakalaContractKit = WakalaContractKit.getInstance();

  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "ConfirmationCompletedEvent",
    async (error: Error, event: EventData) => {
      console.log("ConfirmationCompletedEvent", event.returnValues.wtx[0]);
      const index: number = event.returnValues.wtx[0];
      const tx = await wakalaContractKit?.queryTransactionByIndex(index);
      props.navigation.navigate("TransactionSuccess", { tx: tx });
      console.log("The transaction id is : " + index);
    }
  );
  const dispatch = useDispatch();

  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  // const publicAddress =
  //   WakalaContractKit.getInstance().userMetadata.publicAddress;
  const publicAddress = "";
  let web3: any = new Web3(magic.rpcProvider);
  let kit = newKitFromWeb3(web3);
  const contract = new kit.web3.eth.Contract(
    WakalaEscrowAbi as AbiItem[],
    WAKALA_CONTRACT_ADDRESS
  );
  // const handleAction = async () => {
  //   openModal();
  //   setIsLoading(true);
  //   setLoadingMessage("Confirming Payment...");
  //   console.log("==============>");
  //   console.log("The transaction has started");
  //   await contract.methods
  //     .clientConfirmPayment(transaction)
  //     .send({ from: publicAddress })
  //     .then(() => {
  //       console.log("reached 2nd then");
  //       setLoadingMessage("");
  //       setIsLoading(false);
  //     })
  //     .catch((error: any) => {
  //       setLoadingMessage(error.toString());
  //       console.log(error.toString() + " \n Amount: " + transaction.toString());
  //       setIsActionSuccess(false);
  //       setIsLoading(false);
  //     });
  //   console.log("The transaction has gone through");
  //   setIsLoading(false);
  // };
  const handleAction = async () => {
    openModal();
    //Init
    setIsLoading(true);
    setLoadingMessage("Initializing the transaction...");
    let contractMethods = new ContractMethods(props.magic);
    if (props.contractMethods.initialized) {
      contractMethods = props.contractMethods;
    } else {
      setLoadingMessage("Initializing the Blockchain connection...");
      await contractMethods.init();
      dispatch({
        type: "INIT_CONTRACT_METHODS",
        value: contractMethods,
      });
    }

    if (operation === "TopUp") {
      setLoadingMessage(`Accepting deposit request.... ${transaction.id}`);
      try {
        let result = await contractMethods.clientConfirmPayment(transaction.id);
        setLoadingMessage("");
        setIsLoading(false);
      } catch (error: any) {
        setLoadingMessage(error.toString());
        setIsActionSuccess(false);
        setIsLoading(false);
      }
    } else {
      try {
        setLoadingMessage("Sending the withdrawal transaction...");
        let result = await contractMethods.agentAcceptWithdrawalTransaction(
          transaction.id
        );
        setLoadingMessage("");
        setIsLoading(false);
      } catch (error: any) {
        setLoadingMessage(error.toString());
        setIsActionSuccess(false);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };
  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    if (!isActionSuccess) {
      modalRef.current?.closeModal();
      return;
    }

    modalRef.current?.closeModal();

    navigation.navigate("MyDrawer");

    // if (operation === "TopUp") {
    //   navigation.navigate("Success", {
    //     operation: operation,
    //   });
    // } else {
    //   navigation.navigate("Rate", {
    //     operation: operation,
    //   });
    // }
  };
  return (
    <Fragment>
      <ScreenComponent>
        <NavHeader />
        <View style={styles.container}>
          <TransactionConfirmationCard />
          <View style={{ marginTop: 40 }}>
            <SwipeButton
              title="Swipe to Confirm"
              handleAction={() => handleAction()}
            />
            <magic.Relayer />
          </View>
        </View>
        <magic.Relayer />
      </ScreenComponent>
      <Modal
        ref={modalRef}
        style={
          !isActionSuccess
            ? { height: 490 }
            : operation === "TopUp"
            ? { height: 420 }
            : { height: 300 }
        }
        content={
          isLoading ? (
            <ModalLoading loadingMessage={loadingMessage} />
          ) : (
            <ModalContent
              handleAction={closeModal}
              isActionSuccess={isActionSuccess}
              errorMessage={loadingMessage}
            />
          )
        }
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    magic: state.magic,
    contractMethods: state.contractMethods,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: async (action) => {
      await dispatch(action);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionConfirmationScreen);

// export default TransactionConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    margin: 30,
  },
});

const modalStyles = StyleSheet.create({
  container: {
    height: "auto",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  image: {
    height: 70,
    maxWidth: SIZES.width * 0.8,
    resizeMode: "contain",
    marginBottom: 20,
  },

  errorImage: {
    height: 180,
    maxWidth: SIZES.width * 0.8,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    ...FONTS.body3,
    alignSelf: "center",
    marginBottom: 28,
  },

  text: {
    ...FONTS.headline,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 25,
  },

  button: {
    ...FONTS.sh1,
    color: COLORS.accent1,
    textAlign: "center",
    marginTop: 40,
  },
});
