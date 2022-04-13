import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, { Fragment, useCallback, useRef, useState } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
// import ContractMethods from "../../utils/Celo-Integration/ContractMethods";
import { connect, useDispatch } from "react-redux";
import { CONNECTIVITY, SHARED } from "../../assets/images";
import { FONTS } from "../../styles/fonts/fonts";
import ModalLoading from "../../components/modals/ModalLoading";
import Modal from "../../components/modals/Modal";
import { WAKALA_CONTRACT_ADDRESS } from "../../utils/ContractAdresses/contract";
import { magic, web3 } from "../../utils/magic";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { WakalaEscrowAbi } from "../../utils/ContractABIs/WakalaEscrowAbi";
import ContractMethods from "../../utils/Celo-Integration/contractMethods";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import NavHeader from "../../containers/NavHeader";
import { EventData } from "web3-eth-contract";
import SwipeButton from "../../components/buttons/SwipeButton";

const ModalContent = (props) => {
  return (
    <View style={modalStyles.container}>
      {props.isActionSuccess ? (
        <View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image source={SHARED} style={modalStyles.image} />
          </View>
          <Text style={modalStyles.title}>Request Shared</Text>
          <Text style={modalStyles.text}>
          Request accepted and the user has been notified.Do not exit this page.
          </Text>
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

/**
 *
 * @param props {
 *          navigaion:
 *          route:
 * }
 * @returns
 */
const AddFundsConfirmationScreen = (props: any) => {
  // const { navigation, route } = props;
  const operation = props.route.params.operation;
  const modalRef = useRef<any>();
  console.log(props.route.params.operation);
  const publicAddress =
    WakalaContractKit.getInstance()?.userMetadata?.publicAddress;
  // console.log(WakalaContractKit.getInstance().userMetadata);
  // console.log(props.route.params?.param);
  const value = props.route.params?.param;
  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const wakalaContractKit = WakalaContractKit.getInstance();

  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "AgentPairingEvent",
    async (error: Error, event: EventData) => {
      console.log("AgentPairingEvent", event.returnValues.wtx[0]);
      const index: number = event.returnValues.wtx[0];
      const tx = await wakalaContractKit?.queryTransactionByIndex(index);
      props.navigation.navigate("Confirm Request", { tx: tx });
      console.log("The transaction id is : " + index);
    }
  );

  let web3: any = new Web3(magic.rpcProvider);
  let kit = newKitFromWeb3(web3);

  const contract = new kit.web3.eth.Contract(
    WakalaEscrowAbi as AbiItem[],
    WAKALA_CONTRACT_ADDRESS
  );

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const handleAction = async () => {
    let phoneNumber = wakalaContractKit?.userMetadata?.phoneNumber ?? "";

    phoneNumber = Buffer.from(phoneNumber).toString("base64");
    openModal();
    //Init
    setIsLoading(true);
    console.log("something is cooking");
    setLoadingMessage("Initializing the transaction...");
    let contractMethods: any = new ContractMethods(props.magic);
    if (props.contractMethods instanceof ContractMethods) {
      contractMethods = props.contractMethods;
    } else {
      setLoadingMessage("Initializing the Blockchain connection...");
      console.log("reached here");
      await contractMethods.init().then((result) => {
        dispatch({
          type: "INIT_CONTRACT_METHODS",
          value: contractMethods,
        });
      });
    }
    console.log("==============>");
    let amount = value;
    // let amount = contractMethods.web3.utils.toBN(2);
    // console.log("The BN amount is: " + amount);
    console.log(operation);
    if (operation === "TopUp") {
      setLoadingMessage("Posting your request to the Celo Blockchain...");

      // try {
      await contractMethods
        .initializeDepositTransaction(amount, phoneNumber)
        .then((receipt) => {
          // const rx = receipt?.events?.TransactionInitEvent?.returnValues;
          // console.log("rx is of type: " + rx?.wtxIndex);
          setLoadingMessage("");
          setIsLoading(false);
        })
        .catch((error: any) => {
          setLoadingMessage(error.toString());
          console.log(error.toString() + " \n Amount: " + amount.toString());
          setIsActionSuccess(false);
          setIsLoading(false);
        });
    } else {
      try {
        setLoadingMessage("Sending the withdrawal transaction...");
        let result = await contractMethods.initializeWithdrawalTransaction(
          amount,
          phoneNumber
        );
        setLoadingMessage("");
        setIsLoading(false);
      } catch (error: any) {
        setLoadingMessage(error.toString());
        console.log(
          error.toString() + " \n Amount to withdraw: " + amount.toString()
        );
        setIsActionSuccess(false);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    if (!isActionSuccess) {
      modalRef.current?.closeModal();
      return;
    }
    let emmited: any = null;
    console.log(emmited);
    if (emmited == null) {
      try {
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("no event found staying here");
    }

    modalRef.current?.closeModal();
  };

  const useViewSize = () => {
    const [size, setSize] = useState<any>(null);

    const onLayout = useCallback((event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setSize({ x, y, width, height });
    }, []);

    return [size, onLayout];
  };

  const useTextSize = () => {
    const [size, setSize] = useState<any>(null);

    const onLayout = useCallback((event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setSize({ x, y, width, height });
    }, []);

    return [size, onLayout];
  };

  const [viewSize, onViewLayout] = useViewSize();
  const [textSize, onTextLayout] = useTextSize();

  // used to change the visibility state of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // used to change the message of the modal.
  const [processIsError, setProcessIsError] = useState(false);

  return (
    <Fragment>
      <ScreenComponent>
        <View>
          {/* <HeaderTitle
            additionalStyling={styles.headerTitleAdditionalStyling}
            backButtonHandler={() =>
              props.navigation.navigate("Add Funds", { operation: operation })
            }

          /> */}
          <NavHeader
            showTitle={true}
            newTitle={operation === "TopUp" ? "Top Up Request" : "Withdraw"}
          />
        </View>

        <View style={styles.wrapper}>
          <RequestTxInformationCard
            cardSubtitle={
              operation === "TopUp" ? "Top up Amount" : "Withdraw Amount"
            }
            cardSubtitle2="Fee"
            grossAmount={props.route.params?.param}
            // netValue={"Ksh " + props.route.params?.param}
            additionalStyling={styles.requestTsxInfoCard}
          ></RequestTxInformationCard>
          <View style={{ marginTop: 200 }}>
            <SwipeButton
              title="Swipe to Confirm"
              handleAction={() => handleAction()}
              // onPress={() => navigation.navigate("Home")}
              style={{ minWidth: 286, marginTop: 200 }}
            />
          </View>
          <magic.Relayer />
        </View>
      </ScreenComponent>
      <Modal
        ref={modalRef}
        style={isActionSuccess ? { height: 510 } : { height: 490 }}
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 52,
  },
  requestTsxInfoCard: {
    minWidth: 375,
    marginTop: -30,
  },
  headerTitleAdditionalStyling: {
    paddingLeft: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 24,
  },
  container: {
    flex: 1,
    margin: 30,
    justifyContent: "space-between",
  },
  swipeButton: {
    marginTop: 200,
    marginLeft: "3%",
  },

  cardContainer: {
    width: "100%",
    height: 230,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#FFF",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },

  requestInfoContainer: {
    marginTop: 20,
    marginBottom: 35,
  },

  requestTitle: {
    fontSize: 12,
    lineHeight: 14,
    color: "#333333",
    fontFamily: "Rubik_400Regular",
  },

  requestAmount: {
    fontSize: 28,
    lineHeight: 34,
    color: "#4840BB",
    fontFamily: "Rubik_700Bold",
  },

  descriptionContainer: {
    flex: 6,
  },

  AmountContainer: {
    flex: 4,
  },

  feesText: {
    height: 15,
    fontSize: 11,
    lineHeight: 13,
    color: "#222222",
    marginBottom: 35,
    fontFamily: "Rubik_400Regular",
  },

  receivesText: {
    height: 18,
    fontSize: 14,
    lineHeight: 17,
    color: "#222222",
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
    height: 150,
    maxWidth: SIZES.width * 0.8,
    alignContent: "center",
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
    marginTop: 20,
  },

  button: {
    fontSize: 20,
    lineHeight: 24,
    color: "#133FDB",
    textAlign: "center",
    fontFamily: "Rubik_500Medium",
    marginTop: 50,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFundsConfirmationScreen);

// export default AddFundsConfirmationScreen;
