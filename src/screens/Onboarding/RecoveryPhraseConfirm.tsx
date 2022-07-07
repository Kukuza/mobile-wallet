import { StyleSheet, View, Text, Pressable, Modal, Alert, TextInput, FlatList } from "react-native";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import React, { useEffect } from "react";
import DefaultButton from "../../components/buttons//MainButtons/DefaultButton";
import COLORS from '../../styles/colors/colors';
import NavHeader from "../../containers/NavHeader";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from "react-redux";
import Format from "../../utils/Format";

const RecoveryPhraseConfirm: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;
  const [phraseWords, setPhraseWords] = React.useState();
  const recoveryPhrase = useSelector((state: any) => state.auth.recoveryPhrase);
  const dispatch = useDispatch();

  useEffect(() => {
    separatePhrase();
  }, []);

  useEffect(() => {
    //confirmedRecoveryPhrase();
  }, []);

  const separatePhrase = () => {
    let words:any = Format.toArray(
      recoveryPhrase);
    setPhraseWords(words);
  }

  //TODO: redirect
  const confirmedRecoveryPhrase = () => {
        navigation.navigate("RecoveryPhraseSaved");
  }

  const handlePick = (phrasePicked: string) => {
    alert(phrasePicked);
  }

  return (
    <ScreenComponent>
      <NavHeader
          hideBackButton={false}
          showTitle={true}
          newTitle="Step 6 of 8"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Recovery phrase</Text>
        {/* Remove once done with screen */}
        <Pressable onPress={confirmedRecoveryPhrase}>
          <Text style={styles.textCount}>Incomplete screen. Skip for testing</Text>
        </Pressable>
      </View>
      <View style={styles.textItem}>
      <FlatList
          data={phraseWords}
          numColumns={4}
          renderItem={({ item }) => (
            <Text style={styles.text}>{item}</Text>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style = {styles.phraseItem}>
        <Text style={styles.question}>
          What's the 
          <Text style={styles.textCount}> first </Text>
          word of your Recovery
        </Text>
        <Text style={styles.question}>Phrase?</Text>

        <FlatList
          data={phraseWords}
          numColumns={3}
          renderItem={({ item }) => (
              <Text style={styles.textPicker}>{item}</Text>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />

      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: "center",
    height: SIZES.height,
    marginTop: hp("1%"),
     marginHorizontal: wp("8%")
  },
  title: {
    ...FONTS.body1,
    color: COLORS.black,
    fontWeight: "bold",
    textAlign: "center"
  },
  question: {
    ...FONTS.body3,
    color: COLORS.black,
    textAlign: "center",
    marginBottom: hp("1%"),
  },
  textCount: {
    ...FONTS.body3,
    color: COLORS.success,
    textAlign: "center",
    marginBottom: hp("1%"),
  },
  textItem: {
    flex: 0.4,
    marginHorizontal: wp("4%"),
    padding: 5,
  },
  text: {
    flex: 1/4,
    backgroundColor: '#fff',
    margin: '1%',
    textAlign: "center",
    padding: 4,
    borderRadius: 15,
    ...FONTS.body4,
  },
  textPicker: {
    flex: 1/3,
    backgroundColor: '#fff',
    margin: '1%',
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.success,
    padding: 12,
    borderRadius: 15,
    ...FONTS.body4,
  },
  phraseItem: {
    flex: 1/3,
    marginHorizontal: wp("4%"),
    marginVertical:hp("1%")
}
});

export default RecoveryPhraseConfirm;