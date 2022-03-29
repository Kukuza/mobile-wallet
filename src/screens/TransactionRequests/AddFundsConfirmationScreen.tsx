import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, { Fragment, useCallback, useRef, useState } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import HeaderTitle from "../../components/HeaderTitle";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
import DefaultButton from "../../components/buttons/DefaultButton";
import ContractMethods from "../../utils/Celo-Integration/contractMethods";
import { connect, useDispatch } from "react-redux";
import { CONNECTIVITY, SHARED } from "../../assets/images";
import { FONTS } from "../../styles/fonts/fonts";
import ModalLoading from "../../components/modals/ModalLoading";
import Modal from "../../components/modals/Modal";

const ModalContent = (props) => {
  return (
    <View style={modalStyles.container}>
      {props.isActionSuccess ? (
        <View>
          <Image source={SHARED} style={modalStyles.image} />
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

/**
 *
 * @param props {
 *          navigaion:
 *          route:
 * }
 * @returns
 */
const AddFundsConfirmationScreen: React.FunctionComponent<IStackScreenProps> = (
  props: any
) => {
  const { navigation, route } = props;
  const operation = route.params.operation;
  const modalRef = useRef<any>();

  // console.log(props.route.params?.param);
  const value = props.route.params?.param;
  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

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
      await contractMethods.init();
      dispatch({
        type: "INIT_CONTRACT_METHODS",
        value: contractMethods,
      });
    }
    let amount = contractMethods.web3.utils.toBN(value);
    console.log("Teh" + amount);
    if (operation === "TopUp") {
      setLoadingMessage("Sending the deposit transaction...");
      try {
        let result = await contractMethods.initializeDepositTransaction(amount);
        setLoadingMessage("");
        setIsLoading(false);
      } catch (error: any) {
        setLoadingMessage(error.toString());
        console.log(error.toString() + " \n Amount: " + amount.toString());
        setIsActionSuccess(false);
        setIsLoading(false);
      }
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
  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    if (!isActionSuccess) {
      modalRef.current?.closeModal();
      return;
    }
    modalRef.current?.closeModal();
    navigation.navigate("Home Screen");
    /*navigation.navigate("Confirm Request", {
      value: value,
      operation: operation,
    });*/
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
            backButtonHandler={() => navigation.navigate("Add Funds")}
          />
          <RequestTxInformationCard
            grossAmount={props.route.params?.param}
            netValue={"Ksh " + props.route.params?.param * 114}
            additionalStyling={styles.requestTsxInfoCard}
          ></RequestTxInformationCard>
          <DefaultButton
            onPress={handleAction}
            // onPress={() => navigation.navigate("Home")}
            style={{ minWidth: 286, marginTop: 40 }}
            text="Continue"
          />
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
      paddingLeft: 24
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
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
