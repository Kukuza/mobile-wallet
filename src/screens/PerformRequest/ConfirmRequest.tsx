import React, { Fragment, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ScreenComponent from "../../containers/ScreenComponent";
import Modal from "../../components/modals/Modal";
import COLORS from "../../styles/colors/colors";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { CONNECTIVITY, THANK_YOU_IMAGE } from "../../assets/images";
import ModalLoading from "../../components/modals/ModalLoading";
import { connect, useDispatch } from "react-redux";
import DefaultButton from "../../components/buttons/DefaultButton";
import { WakalaEscrowTransaction } from "../../utils/Celo-Integration/transaction_types";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import { magic } from "../../utils/magic";
import { EventData } from "web3-eth-contract";

const CardElement = (props) => {
  
  const transaction: WakalaEscrowTransaction = props.transaction;

  return (
    <View style={cardStyles.container}>

      <View>
        <Text style={cardStyles.subTitle}>Send</Text>
        <Text style={cardStyles.title}>
            Ksh {transaction.amount * 115}
        </Text>
      </View>
      
      <View>
        <Text style={cardStyles.subTitle}>To</Text>
        <Text style={cardStyles.title}>{transaction.agentPhoneNumber}</Text>
        <TouchableOpacity style={cardStyles.copyContainer}>
          <Text style={cardStyles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
         <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image source={THANK_YOU_IMAGE} style={modalStyles.errorImage} />
          </View>
            <Text style={[mainStyles.title, { color: "#4840BB" }]}>
                Thank You!
            </Text>
            <Text style={mainStyles.thankyouText}>
              After your agents confirms of M-PESA payment receipt. Your cUSD will be deposited to your wallet. Do not close this page.
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
          <magic.Relayer />
        </View>
      )}
    </View>
  );
};

const ConfirmRequest = (props) => {
  const route = useRoute<any>();
  const modalRef = useRef<any>();
  const navigation = useNavigation<any>();

  const operation = "TopUp";
  const transaction: WakalaEscrowTransaction = route.params?.tx;
  const value = transaction.amount;
  const dispatch = useDispatch();

  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  const wakalaContractKit = WakalaContractKit.getInstance();

  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "AgentConfirmationEvent",
    async (error: Error, event: EventData) => {
      const index: number = event.returnValues.wtx[0];
      const tx = wakalaContractKit?.queryTransactionByIndex(index);
      navigation.navigate("Transaction Confirmation Screen", {
        tx: transaction,
      });
    }
  );

  const handleAction = async () => {
    navigation.navigate("Transaction Confirmation Screen", { tx: transaction });
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

    if (operation === "TopUp") {
      navigation.navigate("Success", {
        operation: operation,
      });
    } else {
      navigation.navigate("Rate", {
        operation: operation,
      });
    }
  };

  return (
    <Fragment>
      <ScreenComponent>
        <View style={mainStyles.container}>
          <View>
            <View style={mainStyles.titleContainer}>
              <View style={mainStyles.iconContainer}>
                {operation === "TopUp" ? (
                  <Ionicons
                    name="md-paper-plane-sharp"
                    size={20}
                    color="white"
                  />
                ) : (
                  <FontAwesome5 name="money-bill" size={20} color="white" />
                )}
              </View>
              <Text style={mainStyles.title}>
                {operation === "TopUp"
                  ? "Send M-PESA to Agent"
                  : "Confirm M-PESA Payment "}
              </Text>
            </View>

            <Text
              style={[mainStyles.text, { marginBottom: 30, marginTop: 15 }]}
            >
              {operation === "TopUp"
                ? "Your cUSD is ready and has been deposited to the Wakala escrow account!"
                : "The agent confirmed that he sent Ksh 1,000 to your number +254 706 427 718"}
            </Text>
            <Text style={mainStyles.text}>
              {operation === "TopUp"
                ? "To receive your cUSD, send the amount to the M-PESA number below."
                : "Once you receive the payment, confirm the transaction below."}
            </Text>
          </View>

          {operation === "TopUp" && <CardElement value={value} transaction={transaction}/>}
          <View>
            
            <DefaultButton
              // onPress={contractCall}
              onPress={() => handleAction()}
              style={{ minWidth: 286, marginTop: 40 }}
              text="Continue"
            />

            <TouchableOpacity
              style={mainStyles.button}
              onPress={() => navigation.goBack()}
            >

            <Text
                style={[mainStyles.secondaryButtonText, { color: "#133FDB" }]}
              >
                {operation === "TopUp" ? "Cancel" : "Didn’t receive payments?"}
              </Text>
            </TouchableOpacity>
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
              operation={operation}
              isActionSuccess={isActionSuccess}
              errorMessage={loadingMessage}
            />
          )
        }
      />
    </Fragment>
  );
};
const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginTop: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 45,
    height: 38,
    borderRadius: 6,
    backgroundColor: "#4840BB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  title: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    fontFamily: "Rubik_500Medium",
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    color: "#333333",
    fontFamily: "Rubik_400Regular",
  },

  secondaryButtonText: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Rubik_500Medium",
    textAlign: "center",
    color: "#FFF",
  },

  button: {
    width: "auto",
    height: 56,
    marginTop: 60,
    justifyContent: "center",
  },
  thankyouText:{
    fontSize: 14,
    lineHeight: 21,
    color: "#333333",
    textAlign: "center",
    fontFamily: "Rubik_400Regular",
    marginTop: 20,
  }
});

const cardStyles = StyleSheet.create({
  container: {
    height: SIZES.height * 0.35,
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#FFF",
    justifyContent: "space-around",
    padding: 15,
  },

  subTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#A2A3A2",
    fontFamily: "Rubik_500Medium",
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    color: COLORS.primary,
    fontFamily: "Rubik_700Bold",
  },

  copyContainer: {
    width: 70,
    height: 30,
    marginTop: 10,
    borderRadius: 16,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },

  copyText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#333333",
    textAlign: "center",
    fontFamily: "Rubik_500Medium",
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
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    textAlign: "center",
    fontFamily: "Rubik_500Medium",
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    color: "#333333",
    textAlign: "center",
    fontFamily: "Rubik_400Regular",
    marginTop: 25,
  },

  button: {
    fontSize: 20,
    lineHeight: 24,
    color: "#133FDB",
    textAlign: "center",
    fontFamily: "Rubik_500Medium",
    marginTop: 40,
  },

});

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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRequest);
