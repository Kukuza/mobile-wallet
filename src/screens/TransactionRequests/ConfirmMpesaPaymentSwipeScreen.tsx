import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useCallback, Fragment } from "react";
import Modal from "../../components/modals/Modal";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import SwipeButton from "../../components/buttons/SwipeButton";
import COLORS from "../../styles/colors/colors";
import { WakalaEscrowTransaction } from "../../utils/Celo-Integration/wakala_types";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import { EventData } from "web3-eth-contract";
import { connect, useDispatch } from "react-redux";
import ModalLoading from "../../components/modals/ModalLoading";
import { SHARED, CONNECTIVITY } from "../../assets/images";
import { modalStyles } from "../../components/componentTheme";

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
          We shared your deposit request with the agent community.
          We will notify you once an agent has answered the request.
          It can take up to 4 minutes. Do not exit this page.
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
 *      @phoneNumber : The recipient phone number.
 *      @amount : the amount to be sent.
 * }
 * @returns the component.
 */
const ConfirmMpesaPaymentSwipeScreen = (props: any) => {
  const { navigation, route } = props;

  const transaction: WakalaEscrowTransaction = route.params?.transaction;

  const publicAddress = ""
    // WakalaContractKit.getInstance()?.userMetadata?.publicAddress;

  // used to change the visibility state of the modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isActionSuccess, setIsActionSuccess] = useState(true);

  const operation = "TopUp";
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<any>();

  // used to change the message of the modal.
  const [processIsError, setProcessIsError] = useState(false);


  const wakalaContractKit = WakalaContractKit.getInstance();
  const wakalaSmartContract = wakalaContractKit?.wakalaEscrowContract;


  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "TransactionCompletionEvent",
    async (error: Error, event: EventData) => {
      const index: number = event.returnValues.wtx[0];
      navigation.navigate("MyDrawer");
    }
  );

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const handleAction = async () => {
    openModal();
    //Init
    setIsLoading(true);
    console.log("something is cooking");
    setLoadingMessage("Initializing the transaction...");

    if (operation === "TopUp") {
      try {
        setLoadingMessage("Confirming payment receipt to the user...");
        const txObject = wakalaSmartContract?.methods.agentConfirmPayment(transaction.id);
        const receipt = await wakalaContractKit?.sendTransactionObject(txObject);
        console.log(receipt);
        setLoadingMessage("");
        setIsLoading(false);
      } catch (error: any) {
        setLoadingMessage(error.toString());
        console.log(error.toString() + " \n Amount to withdraw: ");
        setIsActionSuccess(false);
        setIsLoading(false);
      }
    } else {
      try {
        setLoadingMessage("Sending the withdrawal transaction...");
        // let result = await contractMethods.initializeWithdrawalTransaction(
        //   amount
        // );
        setLoadingMessage("");
        setIsLoading(false);
      } catch (error: any) {
        setLoadingMessage(error.toString());
        console.log(error.toString() + " \n Amount to withdraw: ");
        setIsActionSuccess(false);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
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

  const closeModal = () => {
    if (!isActionSuccess) {
      modalRef.current?.closeModal();
      return;
    }
    modalRef.current?.closeModal();
    // props.navigation.navigate("MyDrawer");
  };

  return (
    <Fragment>
      <ScreenComponent>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              width: SIZES.width * 0.7,
              alignSelf: "center",
            }}
          >
            <Image
              source={require("../../assets/icons/subheadingicon3.png")}
              style={styles.titleIcon}
            />
            <Text style={styles.cardTitle}> Confirm Payment Receipt</Text>
          </View>

          <Text style={styles.bodyText}>
          The user confirmed that he sent the amount to your M-PESA number
          </Text>
          <Text style={[styles.bodyText, { marginBottom: 341, marginTop: 30 }]}>
            Once you receive the payment, confirm the transaction below.
          </Text>

          <SwipeButton
            title={"Swipe to confirm"}
            handleAction={() => handleAction()}
            additionalStyling={styles.slidingButtonCustomStyling}
          />
          {/* 
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.pressableTxt}>Didn’t receive payments?</Text>
        </Pressable> */}
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
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    height: SIZES.height,
    paddingTop: 115,
  },
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  titleIcon: {
    alignSelf: "flex-start",
    height: 32,
    width: 40,
  },
  cardTitle: {
    ...FONTS.body3,
    paddingTop: 7,
    marginLeft: 7,
  },
  slidingButtonCustomStyling: {
    alignSelf: "center",
  },
  bodyText: {
    width: SIZES.width * 0.7,
    color: COLORS.textPrimary,
    ...FONTS.headline,
    marginTop: 21,
  },
  pressableTxt: {
    ...FONTS.sh1,
    color: COLORS.primary,
    marginTop: 70,
  },
  modalOverlay: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: "flex-end",
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
)(ConfirmMpesaPaymentSwipeScreen);
// export default ConfirmMpesaPaymentSwipeScreen;
