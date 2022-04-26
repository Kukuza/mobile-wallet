import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenComponent from "../../containers/ScreenComponent";
import ConfirmMpesaPaymentCard from "../../components/cards/ConfirmMpesaPayment";
import DefaultButton from "../../components/buttons/DefaultButton";
import { FONTS } from "../../styles/fonts/fonts";
import COLORS from "../../styles/colors/colors";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmMpesaScreen(props: any) {
  const navigation = useNavigation<any>();

  const handleTransaction = () => {
    navigation.navigate("ConfirmMpesaSwipeScreen");
  };
  return (
    <ScreenComponent>
      <View style={styles.wrapper}>
        <ConfirmMpesaPaymentCard />
        <DefaultButton
          // onPress={contractCall}
          onPress={() => handleTransaction()}
          style={{ minWidth: 286, marginTop: 70 }}
          text="Continue"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text style={styles.footerText}>Didn't Receive Payments?</Text>
        </View>
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  footerText: {
    ...FONTS.sh1,
    marginTop: 50,
    color: COLORS.primary,
  },
});
