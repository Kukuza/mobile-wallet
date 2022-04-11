import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import HeaderTitle from "../../components/HeaderTitle";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
import DefaultButton from "../../components/buttons/DefaultButton";
// import ContractMethods from "../../utils/Celo-Integration/ContractMethods";
import { connect, useDispatch } from "react-redux";
import { CONNECTIVITY, SHARED } from "../../assets/images";
import { FONTS } from "../../styles/fonts/fonts";
import ModalLoading from "../../components/modals/ModalLoading";
import Modal from "../../components/modals/Modal";
import {
  WAKALA_CONTRACT_ADDRESS,
  ERC20_ADDRESS,
  KARMA_CONTRACT_ADDRESS,
} from "../../utils/ContractAdresses/contract";
import { magic, web3 } from "../../utils/magic";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { CeloContract } from "@celo/contractkit";
import { WakalaEscrowAbi } from "../../utils/ContractABIs/WakalaEscrowAbi";
import ContractMethods from "../../utils/Celo-Integration/contractMethods";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";

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
            We shared your{" "}
            {props.operation === "TopUp" ? "deposit" : "withdraw"} request with
            the agent community. We will notify you once an agent has answered
            your request. It can take up to 4 minutes. Click OK to exit this
            page.
          </Text>

          <TouchableOpacity onPress={props.handleAction}>
            <Text style={modalStyles.button}>Okay</Text>
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

  let web3: any = new Web3(magic.rpcProvider);
  let kit = newKitFromWeb3(web3);

  const contract = new kit.web3.eth.Contract(
    WakalaEscrowAbi as AbiItem[],
    WAKALA_CONTRACT_ADDRESS
  );

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const call = async () => {
    let txObject = await contract.methods.initializeDepositTransaction(value);
    let cUSDcontract = await kit.contracts.getStableToken();
    let tx = await kit.sendTransactionObject(txObject, {
      from: "0x9FDf3F87CbEE162DC4a9BC9673E5Bb6716186757",
      // feeCurrency: cUSDcontract.address,
    });
    let receipt = await tx.waitReceipt();
    console.log(receipt);
  };
  const contractCall = async () => {
    // console.log("++++++++++++++++++++++++++++++++++");

    // let cUSDcontract = await kit.contracts.getStableToken();
    // let contract = new kit.web3.eth.Contract(
    //   WakalEscrowAbi as AbiItem[],
    //   WAKALA_CONTRACT_ADDRESS
    // );
    // console.log("******************************");
    // const user = {
    //   publicAdress: "0x9FDf3F87CbEE162DC4a9BC9673E5Bb6716186757",
    // };

    // const tx = await contract.methods.initializeDepositTransaction(2).send({
    //   from: user.publicAdress,
    // });

    // let receipt = await tx.waitReceipt();
    // console.log(receipt);

    // Encode the transaction to HelloWorld.sol according to the ABI
    // let txObject = await contract.methods.initializeDepositTransaction(2);

    // Send the transaction
    // let tx = await kit.sendTransactionObject(txObject, {
    //   from: user.publicAdress,
    //   feeCurrency: cUSDcontract.address,
    // });
    // let receipt = await tx.waitReceipt();
    // console.log(receipt);
    // console.log("******************************");

    // let contractCall = await contract.methods
    //   .initializeDepositTransaction(value)
    //   .send({ from: "0x9FDf3F87CbEE162DC4a9BC9673E5Bb6716186757" });
    openModal();
    setIsLoading(true);
    console.log("something is cooking");
    setLoadingMessage("Initializing the transaction...");
    console.log("==============>");
    console.log(operation);
    
    if (operation === "TopUp") {
      setLoadingMessage("Sending the deposit transaction...");
      console.log("The transaction has started");

      await contract.methods
        .initializeDepositTransaction(value)
        .send({ from: publicAddress })
        .then(() => {
          console.log("reached 2nd then");
          setLoadingMessage("");
          setIsLoading(false);
        })
        .catch((error: any) => {
          setLoadingMessage(error.toString());
          console.log(error.toString() + " \n Amount: " + value.toString());
          setIsActionSuccess(false);
          setIsLoading(false);
        });
      console.log("The transaction has gone through");
      setIsLoading(false);
    } else {
      setLoadingMessage("Sending the Withdrawal transaction...");
      console.log("The withdrawal transaction has started");

      await contract.methods
        .initializeWithdrawalTransaction(value)
        .send({ from: publicAddress })
        .then(() => {
          setLoadingMessage("");
          setIsLoading(false);
        })
        .catch((error: any) => {
          setLoadingMessage(error.toString());
          console.log(error.toString() + " \n Amount: " + value.toString());
          setIsActionSuccess(false);
          setIsLoading(false);
        });
      console.log("The withdrawal transaction has gone through");
      setIsLoading(false);
    }
  };

  const handleAction = async () => {
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
    let amount = contractMethods.web3.utils.toBN(value);
    console.log(operation);
    if (operation === "TopUp") {
      setLoadingMessage("Sending the deposit transaction...");
      // try {
      await contractMethods
        .initializeDepositTransaction(amount)
        .then(() => {
          console.log("reached 2nd then");
          setLoadingMessage("");
          setIsLoading(false);
        })
        .catch((error: any) => {
          setLoadingMessage(error.toString());
          console.log(error.toString() + " \n Amount: " + amount.toString());
          setIsActionSuccess(false);
          setIsLoading(false);
        });

      // } catch (error: any) {

      // }
    } else {
      try {
        setLoadingMessage("Sending the withdrawal transaction...");
        let result = await contractMethods.initializeWithdrawalTransaction(
          amount
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
    modalRef.current?.closeModal();
    props.navigation.navigate("MyDrawer");
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
        <View style={styles.wrapper}>
          <HeaderTitle
            additionalStyling={styles.headerTitleAdditionalStyling}
            backButtonHandler={() => props.navigation.navigate("Add Funds")}
          />
          <RequestTxInformationCard
            cardSubtitle={
              operation === "TopUp" ? "Top up Amount" : "Withdraw Amount"
            }
            grossAmount={props.route.params?.param}
            netValue={"Ksh " + props.route.params?.param * 114}
            additionalStyling={styles.requestTsxInfoCard}
          ></RequestTxInformationCard>
          <DefaultButton
            onPress={() => contractCall()}
            // onPress={() => navigation.navigate("Home")}
            style={{ minWidth: 286, marginTop: 40 }}
            text="Continue"
          />
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
