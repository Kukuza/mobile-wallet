import { StyleSheet, View } from "react-native";
import React from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import { SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import HeaderTitle from "../../components/HeaderTitle";
import RequestTxInformationCard from "../../components/cards/RequestTxInformationCard";
import DefaultButton from "../../components/buttons/DefaultButton";

/**
 * 
 * @param props { 
 *          navigaion: 
 *          route: 
 * }
 * @returns 
 */
const AddFundsConfirmationScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route } = props;

  return (
    <ScreenComponent>
      <View style={styles.wrapper}>
        <HeaderTitle 
            additionalStyling={styles.headerTitleAdditionalStyling}
            backButtonHandler={ () => navigation.navigate("Home") }
        />
        <RequestTxInformationCard
            additionalStyling={styles.requestTsxInfoCard}
        ></RequestTxInformationCard>
        <DefaultButton
            onPress={() => navigation.navigate("Home")}
            style= {{ minWidth: 286, marginTop: 40 }}
            text="Continue"
          />
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 52
  },
  requestTsxInfoCard: {
      minWidth: 375,
      marginTop: -30
  },
  headerTitleAdditionalStyling: {
      paddingLeft: 24
  }
});

export default AddFundsConfirmationScreen;
