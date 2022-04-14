import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { Fragment, useRef, useState } from "react";
import { SUCCESS, WALLET } from "../../assets/icons";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
import ScreenComponent from "../../containers/ScreenComponent";
import { LinearGradient } from "expo-linear-gradient";
import { connect, useDispatch } from "react-redux";
import { CONNECTIVITY, SHARED } from "../../assets/images";
import { isLoading } from "expo-font";
import ModalLoading from "../../components/modals/ModalLoading";
import Modal from "../../components/modals/Modal";
import { WakalaEscrowTransaction } from "../../utils/Celo-Integration/transaction_types";
import ContractMethods from "../../utils/Celo-Integration/contractMethods";

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
const TransactionSuccess = (props) => {
  const modalRef = useRef<any>();
  const { navigation, route } = props;
  const operation = "TopUp";
  const [isLoading, setIsLoading] = useState(true);
  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  const transaction: WakalaEscrowTransaction = route.params?.tx;
  const cUSDBalance = route.params.cUSDBalance;

  const dispatch = useDispatch();

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
    props.navigation.navigate("MyDrawer");
  };

  return (
    <Fragment>
      <ScreenComponent>
        <View style={styles.container}>
          <Image source={SUCCESS} />

          <Text style={styles.headingText}>Transaction Successfull</Text>
          <Text style={styles.subHeadingText}>
            Your cUSD has been deposited to your wallet
          </Text>
          <SuccessCard cUSDBalance={cUSDBalance} />
          <View style={{ marginTop: 120 }}>
            <Text style={styles.textButton} onPress={() => handleAction()}>
              Okay
            </Text>
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

const SuccessCard = (cUSDBalance) => {
  return (
    <LinearGradient
      colors={COLORS.cardGradient}
      start={[0, 1]}
      end={[1, 0]}
      style={[styles.cardContainer]}
    >
      <View>
        <Text
          style={{
            ...FONTS.headline,
            textAlign: "center",
            color: COLORS.textPrimary,
          }}
        >
          Your New Balance
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={{ marginRight: 10 }}>
          <Image source={WALLET} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textContainer}>cUSD {cUSDBalance}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  textContainer: {
    textAlign: "center",
    justifyContent: "center",
    fontFamily: FONTS.displayBold.fontFamily,
    fontSize: 24,
    lineHeight: 36,
  },
  cardContainer: {
    minWidth: 344,
    paddingBottom: 25,
    paddingTop: 23,
    paddingLeft: 10,
    borderColor: COLORS.white,
    borderWidth: 0.4,
    borderRadius: 11,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    marginTop: 100,
  },
  headingText: {
    color: COLORS.primary,
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
    lineHeight: FONTS.body3.lineHeight,
    marginTop: 10,
  },
  subHeadingText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.headline.fontFamily,
    fontSize: FONTS.headline.fontSize,
    lineHeight: FONTS.headline.lineHeight,
    marginTop: 15,
  },

  textButton: {
    fontFamily: FONTS.sh2.fontFamily,
    fontSize: 20,
    color: COLORS.accent1,
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSuccess);

// export default TransactionSuccess;
