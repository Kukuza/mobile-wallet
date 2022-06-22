import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { Fragment, useRef, useState } from "react";
import TransactionConfirmationCard from "../../components/cards/TransactionConfirmationCard";
import SwipeButton from "../../components/buttons/MainButtons/SwipeButton";
import ScreenComponent from "../../containers/ScreenComponent";
import NavHeader from "../../containers/NavHeader";
import { useRoute, useNavigation } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import Modal from "../../components/modals/Modal";
import ModalLoading from "../../components/modals/ModalLoading";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import {CONNECTIVITY } from "../../assets/images";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import COLORS from "../../styles/colors/colors";
import { EventData } from "web3-eth-contract";
import { WakalaEscrowTransaction } from "../../utils/Celo-Integration/wakala_types";
import Thankyou from "../../assets/images/modals/Thankyou";

// const ModalContent = (props) => {
//   return (
//     <View style={modalStyles.container}>
//       {props.isActionSuccess ? (
//         props.operation === "TopUp" ? (
//           <View>
//             <Image source={THANK_YOU_IMAGE} style={modalStyles.image} />
//             <Text style={modalStyles.title}>Thank you!</Text>
//             <Text style={modalStyles.text}>
//               After your agents confirms of M-PESA payment receipt. Your cUSD
//               will be deposited to your wallet.
//             </Text>

//             <TouchableOpacity onPress={() => props.handleAction()}>
//               <Text style={modalStyles.button}>Got it!</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View>
//             <Ionicons
//               name="checkmark-circle"
//               size={36}
//               color="#4840BB"
//               style={{ textAlign: "center", marginBottom: 12 }}
//             />
//             <Text style={[mainStyles.title, { color: "#4840BB" }]}>
//               Transaction Successful!
//             </Text>
//             <TouchableOpacity onPress={() => props.handleAction()}>
//               <Text style={modalStyles.button}>Got it!</Text>
//             </TouchableOpacity>
//           </View>
//         )
//       ) : (
//         <View>
//           <Image source={CONNECTIVITY} style={modalStyles.errorImage} />
//           <Text style={modalStyles.title}>Oh Snap!</Text>
//           <Text style={modalStyles.text}>
//             Something just happened. Please try again.
//           </Text>
//           <Text style={{ ...FONTS.body5, textAlign: "center", marginTop: 5 }}>
//             {props.errorMessage}
//           </Text>
//           <TouchableOpacity onPress={() => props.handleAction()}>
//             <Text style={modalStyles.button}>Try again</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };
const ModalContent = (props) => {
  return (
    <View style={modalStyles.container}>
      {props.isActionSuccess ? (
        <View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Thankyou style={modalStyles.image} />
          </View>
          <Text style={modalStyles.title}>Thank you!</Text>
          <Text style={modalStyles.text}>
            After your agents confirms of M-PESA payment receipt. Your cUSD will
            be deposited to your wallet. Do not close this page.
          </Text>
          <TouchableOpacity onPress={() => props.handleAction()}>
            <Text style={modalStyles.button}>Got it!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image source={CONNECTIVITY} style={modalStyles.errorImage} />
          </View>
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

  const wakalaContractKit = WakalaContractKit.getInstance();
  const wakalaSmartContract = wakalaContractKit?.wakalaEscrowContract;

  const route = useRoute<any>();
  const modalRef = useRef<any>();
  const navigation = useNavigation<any>();
  const { tx, cUSDBalance } = route.params;

  //   const value = route.params.value;
  //   const operation = route.params.operation;
  //   const transaction = route.params.transaction;

  //   todo remove
  const operation = "TopUp";
  const transaction: WakalaEscrowTransaction = route.params?.tx;

  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "ConfirmationCompletedEvent",
    async (error: Error, event: EventData) => {
      navigation.navigate("MyDrawer");
    }
  );

  const dispatch = useDispatch();
  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  // };
  const handleAction = async () => {
    openModal();
    //Init
    setIsLoading(true);
    setLoadingMessage("Initializing the transaction...");

    try {

        if (operation === "TopUp") {
          setLoadingMessage(`Confirming that you made the M-PESA payment...`);
          const txObject = wakalaSmartContract?.methods.clientConfirmPayment(transaction.id);
          const receipt = await wakalaContractKit?.sendTransactionObject(txObject);
          console.log(receipt);
          setLoadingMessage("");
          setIsLoading(false);

        } else {
          try {
            setLoadingMessage("Sending the withdrawal transaction...");
            // let result = await contractMethods.agentAcceptWithdrawalTransaction(
            //   transaction.id
            // );
            setLoadingMessage("");
            setIsLoading(false);
          } catch (error: any) {
            setLoadingMessage(error.toString());
            setIsActionSuccess(false);
            setIsLoading(false);
          }
        }
    } catch (error: any) {
      setLoadingMessage(error.toString());
      setIsActionSuccess(false);
      setIsLoading(false);
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

    // navigation.navigate("MyDrawer");

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
          <TransactionConfirmationCard transaction={transaction} />
          <View style={{ marginTop: 40 }}>
            <SwipeButton
              title="Swipe to Confirm"
              handleAction={() => handleAction()}
            />
          </View>
        </View>
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
