import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import React, { Fragment, useRef, useState } from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import HeaderTitle from "../../components/HeaderTitle";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
import LargeModal from "../../components/modals/LargeModals";
import SwipeButton from "../../components/buttons/SwipeButton";
import NavHeader from "../../components/NavHeader";
import { isLoading } from "expo-font";
import { SHARED, CONNECTIVITY } from "../../assets/images";
import ModalLoading from "../../components/modals/ModalLoading";
import Modal from "../../components/modals/Modal";

import { FONTS, SIZES } from "../../styles/fonts/fonts";
import Web3 from "web3";
import { magic } from "../../utils/magic";
import { newKitFromWeb3 } from "@celo/contractkit";
import { WakalaEscrowAbi } from "../../utils/ContractABIs/WakalaEscrowAbi";
import { WAKALA_CONTRACT_ADDRESS } from "../../utils/ContractAdresses/contract";
import { AbiItem } from "web3-utils";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import COLORS from "../../styles/colors/colors";

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
const TopUpViewRequestScreen = (props) => {
  const { navigation, route } = props;
  // fetch route params operation and txId
  const operation = "TopUp";
  const txId = 2;
  const modalRef = useRef<any>();
  const [loadingMessage, setLoadingMessage] = useState("");
  const publicAddress = "0x9FDf3F87CbEE162DC4a9BC9673E5Bb6716186757";
  // const publicAddress =
  // WakalaContractKit.getInstance().userMetadata.publicAddress;
  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  let web3: any = new Web3(magic.rpcProvider);
  let kit = newKitFromWeb3(web3);

  const contract = new kit.web3.eth.Contract(
    WakalaEscrowAbi as AbiItem[],
    WAKALA_CONTRACT_ADDRESS
  );

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    if (!isActionSuccess) {
      modalRef.current?.closeModal();
      return;
    }
    modalRef.current?.closeModal();
    props.navigation.navigate("MyDrawer");
  };

  const handleAction = async () => {
    openModal();
    setIsLoading(true);
    console.log("something is cooking");
    setLoadingMessage("Initializing the transaction...");
    console.log("==============>");
    console.log(operation);
    if (operation === "TopUp") {
      setLoadingMessage("Accepting the deposit transaction...");
      console.log("The transaction has started");
      await contract.methods
        .agentAcceptDepositTransaction(txId)
        .send({ from: publicAddress })
        .then(() => {
          console.log("reached 2nd then");
          setLoadingMessage("");
          setIsLoading(false);
        })
        .catch((error: any) => {
          setLoadingMessage(error.toString());
          setIsActionSuccess(false);
          setIsLoading(false);
        });
      console.log("The transaction has gone through");
      setIsLoading(false);
    } else {
      setLoadingMessage("Accepting the withdrawal transaction...");
      console.log("The transaction has started");
      await contract.methods
        .agentAcceptWithdrawalTransaction(txId)
        .send({ from: publicAddress })
        .then(() => {
          console.log("reached 2nd then");
          setLoadingMessage("");
          setIsLoading(false);
        })
        .catch((error: any) => {
          setLoadingMessage(error.toString());
          setIsActionSuccess(false);
          setIsLoading(false);
        });
      console.log("The transaction has gone through");
      setIsLoading(false);
      // todo navigation
    }
  };

  return (
    <Fragment>
      <ScreenComponent>
        <View style={styles.wrapper}>
          <NavHeader
            showTitle={true}
            newTitle={
              operation === "TopUp" ? "Top Up Request" : "Withdraw Request"
            }
          ></NavHeader>

          <RequestTxInformationCard
            cardSubtitle={
              operation === "TopUp"
                ? "Member wants to top up"
                : "Member wants to withdraw"
            }
            cardSubtitle2="You Earn"
            additionalStyling={styles.requestTsxInfoCard}
          ></RequestTxInformationCard>

          <SwipeButton
            title={"Swipe to Accept"}
            // handleAction={() => {
            //   setModalVisible(true);
            // }}
            handleAction={handleAction}
            additionalStyling={styles.slidingButtonCustomStyling}
          />
          <magic.Relayer />
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

export default TopUpViewRequestScreen;
