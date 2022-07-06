import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, { Fragment, useCallback, useRef, useState } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
import { connect, useDispatch } from "react-redux";
import { FONTS } from "../../styles/fonts/fonts";
import ModalLoading from "../../components/modals/ModalLoading";
import Modal from "../../components/modals/Modal";
import NavHeader from "../../containers/NavHeader";
import { EventData } from "web3-eth-contract";
import SwipeButton from "../../components/buttons/MainButtons/SwipeButton";
import Error from "../../assets/images/modals/Error";
import WriteContractDataKit from '../../utils/smart_contract_integration/write_data_utils/WriteContractDataKit';
import ReadContractDataKit from "../../utils/smart_contract_integration/read_data_utils/ReadContractDataKit";
import { ContractEventsListenerKit } from '../../utils/smart_contract_integration/read_data_utils/WakalaContractEventsKit';
import { SHARED } from "../../assets/images";
import CurrencyLayerAPI from '../../utils/currencyLayerUtils';

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
            We shared your deposit request with the agent community. We will
            notify you once an agent has answered the request. It can take up to
            4 minutes. Do not exit this page.
          </Text>
        </View>
      ) : (
        <View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Error style={modalStyles.errorImage} />
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
  const publicAddress = ""
  
  const value = props.route.params?.param;
  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const writeDataContractKit = WriteContractDataKit.getInstance();
  const readDataContractKit = ReadContractDataKit.getInstance();
  const contractEventListenerKit = ContractEventsListenerKit.getInstance();

  contractEventListenerKit?.wakalaEscrowContract?.once(
    "AgentPairingEvent",
    async (error: Error, event: EventData) => {
      console.log("AgentPairingEvent", event.returnValues.wtx[0]);
      const index: number = event.returnValues.wtx[0];
      const tx = await readDataContractKit?.queryTransactionByIndex(index);
      props.navigation.navigate("Confirm Request", { tx: tx });
      console.log("The transaction id is : " + index);
    }
  );

  // let web3: any = new Web3(magic.rpcProvider);
  // let kit = newKitFromWeb3(web3);

  // const contract = new kit.web3.eth.Contract(
  //   WakalaEscrowAbi as AbiItem[],
  //   WAKALA_CONTRACT_ADDRESS
  // );

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const handleAction = async () => {
    let phoneNumber =  ""; // wakalaContractKit?.userMetadata?.phoneNumber ??
    phoneNumber = Buffer.from(phoneNumber).toString("base64");

    const currencyConverter = new CurrencyLayerAPI();
    const conversionRate = await currencyConverter.usdToKsh(1);
    const conversionRateString = Number(conversionRate).toString();

    openModal();
    //Init
    setIsLoading(true);
    console.log("something is cooking");

    let amount = writeDataContractKit?.kit?.web3?.utils.toWei(value);
    const contract = writeDataContractKit?.wakalaEscrowContract;

    console.log("=========>", amount, conversionRateString);

    try {
      if (operation === "TopUp") {
        setLoadingMessage("Sending the top up/deposit transaction...");
        const txObject = contract?.methods.initializeDepositTransaction(amount, "KES", conversionRateString);
        const receipt = await writeDataContractKit?.sendTransactionObject(txObject);
        console.log(receipt);
        
      } else {
        setLoadingMessage("Approve fund transfer form account...");
        await writeDataContractKit?.cUSDApproveAmount(amount);
        setLoadingMessage("Sending the withdrawal transaction...");
        const txObject = contract?.methods.initializeWithdrawalTransaction(amount, "KES", conversionRateString);
        const receipt = await writeDataContractKit?.sendTransactionObject(txObject);
        console.log(receipt);
      }
      setLoadingMessage("");
      setIsLoading(false);
    } catch (error: any) {
      setLoadingMessage(error.toString());
      console.log(
        error.toString() + " \n Amount to withdraw: " + value.toString()
      );
      setIsActionSuccess(false);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    if (!isActionSuccess) {
      modalRef.current?.closeModal();
      return;
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
            totalLabel="Total you receive"
            grossAmount={props.route.params?.param}
            // netValue={"Ksh " + props.route.params?.param}
            additionalStyling={styles.requestTsxInfoCard}
          ></RequestTxInformationCard>
          <View style={{ marginTop: 200 }}>
            <SwipeButton
              title="Swipe to Confirm"
              handleAction={() => handleAction()}
              style={{ minWidth: 286, marginTop: 200 }}
            />
          </View>
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
