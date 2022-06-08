import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ScreenComponent from '../../containers/ScreenComponent'
import CardImage from '../../components/cards/CardImage';
import configs from '../../configs';
import { IStackScreenProps } from "../../navigation/StackScreenProps";

const LanguagesList: React.FunctionComponent<IStackScreenProps> = (props) => {
  
  const locales = configs.LOCALES ?? [];
  const { navigation, route } = props;
  const handleSelect = (code: string) => {
    //TODO: persist selected locale to storage
    console.log(code);
    navigation.navigate("Onboarding");
  }

  return (
    <ScreenComponent>
        <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={locales}
            renderItem={({ item }) => (
              <CardImage 
                  text={item.name} 
                  imgSrc={item.image} 
                  code={item.code}
                  handleSelect={handleSelect} /> 
            )}
            keyExtractor={(item) => item.code}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      height: '100%',
      borderEndWidth: 1,
      borderColor: '#f00'
    },
    list: {
      marginTop: '60%'
    }
});

export default LanguagesList;