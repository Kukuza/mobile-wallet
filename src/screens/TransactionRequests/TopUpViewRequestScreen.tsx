import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import React, { Fragment, useRef, useState } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
import SwipeButton from "../../components/buttons/SwipeButton";
import NavHeader from "../../components/NavHeader";
import { SHARED, CONNECTIVITY } from "../../assets/images";
import ModalLoading from "../../components/modals/ModalLoading";
import Modal from "../../components/modals/Modal";

import { FONTS, SIZES } from "../../styles/fonts/fonts";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import COLORS from "../../styles/colors/colors";
import { WakalaEscrowTransaction } from "../../utils/Celo-Integration/wakala_types";
import { connect, useDispatch } from "react-redux";
import { EventData } from "web3-eth-contract";

const ModalContent = (props) => {
  return (
    <View style={modalStyles.container}>
      {props.isActionSuccess ? (
        <View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image source={SHARED} style={modalStyles.image} />
          </View>
          <Text style={modalStyles.title}>Request Accepted</Text>
          <Text style={modalStyles.text}>
            Request accepted and the user has been notified. Please do not exit
            this page.
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
const TopUpViewRequestScreen = (props) => {
  const { navigation, route } = props;
  const wakalaEscrowTx: WakalaEscrowTransaction = route?.params?.transaction;

  const wakalaContractKit = WakalaContractKit.getInstance();
  const wakalaSmartContract = wakalaContractKit?.wakalaEscrowContract;

  let phoneNumber =  ""; //wakalaContractKit?.userMetadata?.phoneNumber ??
  phoneNumber = Buffer.from(phoneNumber).toString("base64");

  wakalaContractKit?.wakalaContractEvents?.wakalaEscrowContract?.once(
    "ClientConfirmationEvent",
    async (error: Error, event: EventData) => {
      const index: number = event.returnValues.wtx[0];
      props.navigation.navigate("Confirm Mpesa Payment Swipe Screen", {
        transaction: wakalaEscrowTx,
      });
      console.log("The transaction id is : " + index);
    }
  );

  // fetch route params operation and txId
  const operation = wakalaEscrowTx?.txType;
  const modalRef = useRef<any>();
  const [loadingMessage, setLoadingMessage] = useState("");
  // const publicAddress = "0x9FDf3F87CbEE162DC4a9BC9673E5Bb6716186757";
  const publicAddress = ""
    // WakalaContractKit?.getInstance()?.userMetadata?.publicAddress;
  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  // const contract = new kit.web3.eth.Contract(
  //   WakalaEscrowAbi as AbiItem[],
  //   WAKALA_CONTRACT_ADDRESS
  // );

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    if (!isActionSuccess) {
      modalRef.current?.closeModal();
      return;
    }
    modalRef.current?.closeModal();
    // props.navigation.navigate("MyDrawer");
  };

  const handleAction = async () => {
    openModal();
    //Init
    setIsLoading(true);
    try {
      if (operation === "DEPOSIT") {
        // handle deposit transaction contract calls.

        // Approve amount to be transferred from account to smart contract.
        setLoadingMessage("Approving fund transfer from account...");
        let weiAmount = wakalaContractKit?.kit?.web3?.utils.toWei(wakalaEscrowTx.amount);
        const approvalReceipt = await wakalaContractKit?.cUSDApproveAmount(weiAmount);
        // console.log("approval receipt", approvalReceipt);

        // Agent accept transaction
        setLoadingMessage("Accepting deposit transaction...");
        const tsxObj = wakalaSmartContract?.methods
                .agentAcceptDepositTransaction(wakalaEscrowTx?.id, phoneNumber);
        const receipt = wakalaContractKit?.sendTransactionObject(tsxObj);   
        console.log(receipt);
        setLoadingMessage("");

      } else {
        // handle deposit transaction contract calls.
        setLoadingMessage("Accepting the withdrawal transaction...");
        const tsxObj = wakalaSmartContract?.methods
                  .agentAcceptWithdrawalTransaction(wakalaEscrowTx?.id, phoneNumber);
        const receipt = wakalaContractKit?.sendTransactionObject(tsxObj);   
        // console.log("approval receipt", receipt);
        setLoadingMessage("");
      } 
    } catch (error: any) {
      setLoadingMessage(error.toString());
      console.log(error);
      setIsActionSuccess(false);
    }

    setIsLoading(false);
  };
  return (
    <Fragment>
      <ScreenComponent>
        <View style={styles.wrapper}>
          <NavHeader
            showTitle={true}
            newTitle={
              operation === "DEPOSIT" ? "Top Up Request" : "Withdraw Request"
            }
          ></NavHeader>

          <RequestTxInformationCard
            cardSubtitle={
              operation === "DEPOSIT"
                ? "Member wants to top up"
                : "Member wants to withdraw"
            }
            cardSubtitle2="You Earn"
            grossAmount={wakalaEscrowTx?.amount}
            totalLabel="Total you send"
            earnings={0.05}
            // netValue={wakalaEscrowTx?.grossAmount}
            additionalStyling={styles.requestTsxInfoCard}
          ></RequestTxInformationCard>

          <SwipeButton
            title={"Swipe to Accept"}
            // handleAction={() => {
            //   setModalVisible(true);
            // }}
            handleAction={() => handleAction()}
            additionalStyling={styles.slidingButtonCustomStyling}
          />
        </View>

        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {!processIsError ? (
          <View style={styles.modalOverlay}>
            <LargeModal
              onPressHanlder={() => setModalVisible(false)}
              title={"Oh Snap!"}
              message={"Something just happened. Please try  again."}
              btnText={"Try again"}
            ></LargeModal>
          </View>
        ) : (
          <View style={styles.modalOverlay}>
            <LargeModal
              onPressHanlder={() => setModalVisible(false)}
              title={"Money sent"}
              message={
                "cUSD 10 has been sent  to the Wakala escrow account. We shared your M-PESA number with the requesting member. We will notify you once the requesting member confirms the payment."
              }
              btnText={"Okay"}
              imageSrc={require("../../assets/images/modals/Shared_image.png")}
            ></LargeModal>
          </View>
        )}
      </Modal> */}
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
    paddingTop: 20,
  },
  requestTsxInfoCard: {
    minWidth: 375,
    marginTop: 40,
  },
  headerTitleAdditionalStyling: {
    paddingLeft: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  slidingButtonCustomStyling: {
    alignSelf: "center",
    marginTop: 60,
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
    ...FONTS.body3,
    color: COLORS.textPrimary,
    textAlign: "center",
  },

  text: {
    ...FONTS.headline,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginTop: 20,
  },

  button: {
    ...FONTS.sh1,
    color: COLORS.accent1,
    textAlign: "center",
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
)(TopUpViewRequestScreen);

// export default TopUpViewRequestScreen;
