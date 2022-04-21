import React, { Fragment, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ScreenComponent from "../../containers/ScreenComponent";
import RateSlider from "../../components/RateSlider";
import Modal from "../../components/modals/Modal";
import NavHeader from "../../components/NavHeader";
import { CONNECTIVITY } from "../../assets/images";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
import { web3 } from "../../utils/magic";
import { KARMA_CONTRACT_ADDRESS } from "../../utils/ContractAdresses/contract";
import { KARMA_ABI } from "../../utils/ContractABIs/KarmaAbi";
import { AbiItem } from "web3-utils";
import WakalaContractKit from "../../utils/Celo-Integration/WakalaContractKit";
import { magic } from "../../utils/magic";
import ModalLoading from "../../components/modals/ModalLoading";
import { consoleLogger } from "@celo/base";

const ModalContent = (props) => {
  return (
    <View style={modalStyles.container}>
      {props.isRatingSubmissionSuccess ? (
        <View>
          <Ionicons
            name="checkmark-circle"
            size={36}
            color="#4840BB"
            style={{ textAlign: "center", marginBottom: 12 }}
          />
          <Text style={modalStyles.title}>Thank you!</Text>
          <Text style={modalStyles.text}>We appreciate your feedback!</Text>
          <TouchableOpacity onPress={() => props.handleAction()}>
            <Text style={modalStyles.button}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image source={CONNECTIVITY} style={modalStyles.image} />
          </View>
          <Text style={modalStyles.title}>Oh Snap!</Text>
          <Text style={modalStyles.text}>
            Something just happened. Please try again.
          </Text>
          <TouchableOpacity onPress={() => props.handleAction()}>
            <Text style={modalStyles.button}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Rating = () => {
  const route = useRoute<any>();
  const modalRef = useRef<any>();
  const navigation = useNavigation<any>();
  const operation = "TopUp";
  // const operation = route.params.operation;

  const [newTitle, setNewTitle] = useState("");
  const [userStars, setUserStars] = useState<number>();
  const [ratingValue, setRatingValue] = useState("");
  const [numberOfTransactions, setNumberOfTransactions] = useState(180);
  const [isRatingSubmissionSuccess, setIsRatingSubmissionSuccess] =
    useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const contract = new web3.eth.Contract(
    KARMA_ABI as AbiItem[],
    KARMA_CONTRACT_ADDRESS
  );

  const contractMethods = WakalaContractKit.getInstance();

  const publicAddress =
    WakalaContractKit.getInstance()?.userMetadata?.publicAddress;
  // const publicAddress = "0x9FDf3F87CbEE162DC4a9BC9673E5Bb6716186757";
  // fetch and set data from the child component to the parent component
  const childToParent = (childData) => {
    setData(childData);
  };

  useEffect(() => {
    getKarmaRating(publicAddress);
    if (operation == "TopUp") {
      setNewTitle("Rate your community");
    } else {
      setNewTitle("Support community");
    }
  }, []);

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const getKarmaRating = async (publicAddress) => {
    console.log("====>fetching rating");
    await contractMethods?.init().then((result) => {
      console.log("rating contract methods are initialised");
    });
    await contractMethods
      ?.getKarma(publicAddress)
      .then((karma) => {
        setUserStars(karma);
      })
      .catch((error: any) => {
        console.log(error.toString());
      });
  };

  const handleRatingSubmition = async () => {
    openModal();
    setIsLoading(true);
    console.log("handle rating contract methods are initialised");
    setLoadingMessage("Initializing the Blockchain connection...");
    await contractMethods?.init().then((result) => {
      console.log("contract methods are initialised ");
    });

    setLoadingMessage("Submitting rating...");
    if (data !== "") {
      await contractMethods
        ?.updateKarma(publicAddress, data, 2)
        .then((receipt) => {
          setLoadingMessage("");
          setIsLoading(false);
          setIsRatingSubmissionSuccess(true);
        })
        .catch((error: any) => {
          setLoadingMessage(error.toString());
          setIsRatingSubmissionSuccess(false);
          setIsLoading(false);
          console.log(error.toString());
        });
    } else {
      const defaultRating: number = 3;
      await contractMethods
        ?.updateKarma(publicAddress, defaultRating, 2)
        .then((receipt) => {
          setLoadingMessage("");
          setIsLoading(false);
          setIsRatingSubmissionSuccess(true);
        })
        .catch((error: any) => {
          setLoadingMessage(error.toString());
          setIsRatingSubmissionSuccess(false);
          setIsLoading(false);
          console.log(error.toString());
        });
    }
  };

  const closeModal = () => {
    if (isRatingSubmissionSuccess) {
      navigation.navigate("MyDrawer");
    }
    modalRef.current?.closeModal();
  };

  return (
    <Fragment>
      <ScreenComponent>
        <NavHeader hideBackButton={true} showTitle={true} newTitle={newTitle} />
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.icon} />
            <View style={styles.starsIcons}>
              {[...Array(userStars)].map((e, i) => (
                <Entypo key={i} name="star" size={12} color="#4840BB" />
              ))}
              <Text style={styles.starsText}> {userStars}</Text>
            </View>
            <Text style={styles.transactionsText}>
              {numberOfTransactions} successful transactions
            </Text>
          </View>

          <View style={styles.reactionContainer}>
            <Text style={styles.text}>
              How was your experience with the community member?
            </Text>
            {/* <Text style={styles.text}>{data}</Text> */}

            <RateSlider rateToParent={childToParent} />
            <TouchableOpacity
              style={styles.button}
              onPress={handleRatingSubmition}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenComponent>
      <Modal
        ref={modalRef}
        style={isRatingSubmissionSuccess ? { height: 340 } : { height: 490 }}
        content={
          isLoading ? (
            <ModalLoading loadingMessage={loadingMessage} />
          ) : (
            <ModalContent
              handleAction={closeModal}
              isRatingSubmissionSuccess={isRatingSubmissionSuccess}
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
    margin: 30,
    marginVertical: SIZES.height > 700 ? 70 : 30,
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoContainer: {
    width: "100%",
    alignItems: "center",
  },

  icon: {
    width: 59,
    height: 59,
    borderRadius: 30,
    backgroundColor: "#FF8CA1",
  },

  starsIcons: {
    flexDirection: "row",
    marginTop: 18,
  },

  starsText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: FONTS.body6.fontFamily,
  },

  transactionsText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: FONTS.h1.fontFamily,
    marginTop: 10,
  },

  reactionContainer: {
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: COLORS.textPrimary,
    textAlign: "center",
    fontFamily: FONTS.body3.fontFamily,
    marginBottom: 50,
  },

  button: {
    width: 150,
    height: 50,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    marginTop: 30,
  },

  buttonText: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: "center",
    fontFamily: FONTS.sh2.fontFamily,
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
    height: 180,
    maxWidth: SIZES.width * 0.8,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textPrimary,
    textAlign: "center",
    fontFamily: FONTS.body3.fontFamily,
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textPrimary,
    textAlign: "center",
    fontFamily: FONTS.headline.fontFamily,
    marginTop: 25,
  },

  button: {
    fontSize: 20,
    lineHeight: 24,
    color: COLORS.accent1,
    textAlign: "center",
    fontFamily: FONTS.sh1.fontFamily,
    marginTop: 60,
  },
});

export default Rating;
