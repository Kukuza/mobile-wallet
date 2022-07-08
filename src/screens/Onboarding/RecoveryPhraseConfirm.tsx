import { StyleSheet, View, Text, Pressable, Modal, Alert, TextInput, FlatList } from "react-native";
import ScreenComponent from "../../containers/ScreenComponent";
import { FONTS, SIZES } from "../../styles/fonts/fonts";
import { IStackScreenProps } from "../../navigation/StackScreenProps";
import React, { useEffect } from "react";
import COLORS from '../../styles/colors/colors';
import NavHeader from "../../containers/NavHeader";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from "react-redux";
import Format from "../../utils/Format";
import Phrase from "../../utils/Phrase";

const RecoveryPhraseConfirm: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const { navigation, route } = props;
  const recoveryPhrase = useSelector((state: any) => state.auth.recoveryPhrase);
  const [phraseWords, setPhraseWords] = React.useState([]);
  const [selectedCount, setSelectedCount] = React.useState(-1);
  const [displayCount, setDisplayCount] = React.useState("");
  const [randomPhraseWords, setRandomPhraseWords] = React.useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    separatePhrase();
    getNextRandom();
    nextDisplayCount(0);
  }, []);

  const separatePhrase = () => {
    setPhraseWords(getWords());
  }

  function getWords() {
    let words:any = Format.toArray(recoveryPhrase);
    return words;
  }

  const getNextRandom = () => {
    let _random: any = Phrase.getRandomWords(getWords());
    setRandomPhraseWords(_random);
  }

  const confirmedRecoveryPhrase = () => {
    navigation.navigate("RecoveryPhraseSaved");
  }

  const handlePick = (value: string) => {
    let _count: number = Phrase.updateSelected(value);
    setSelectedCount(_count);
    
    if(_count >= phraseWords.length) {
      if(Phrase.confirm(phraseWords)) {
        confirmedRecoveryPhrase();
      }else {
        setSelectedCount(-1);
      }
    }

    nextDisplayCount(_count);
    getNextRandom();
  }

  function nextDisplayCount(nextCount: number) {
    let _next = (nextCount > -1 && nextCount < 24) 
      ? (nextCount + 1) 
      : 1;

      setDisplayCount(Phrase.numberToWord(_next));
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
      </View>
      <View style={styles.textItem}>
      <FlatList
          data={phraseWords}
          numColumns={4}
          renderItem={({ item, index }) => (
            <Text style={styles.text}>{ (index < selectedCount) ? item : ++index }</Text>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style = {styles.phraseItem}>
        <Text style={styles.question}>
          What's the 
          <Text style={styles.textCount}> { displayCount } </Text>
          word of your Recovery
        </Text>
        <Text style={styles.question}>Phrase?</Text>

        <FlatList
          data={ randomPhraseWords }
          numColumns={3}
          renderItem={({ item, index }) => (
              <Text style={styles.textPicker} onPress={()=> handlePick(item)}>{item}</Text>
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