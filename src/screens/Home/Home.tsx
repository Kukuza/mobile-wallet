import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BottomMenu from '../../components/homepage/BottomMenu';
import RequestCardComponent from '../../components/homepage/RequestCardComponent';
import ScreenComponent from '../../components/ScreenComponent';
import { COLORS, SIZES } from '../../styles/theme';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default function HomeScreen(props) {

  const { navigation } = props;

    return (
      <ScreenComponent>
        <View
          style={{
            justifyContent: "center",
          }}
        >

          <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <MaterialIcons name="menu" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        
        <View style={{alignItems: 'center', height: SIZES.height * 0.82}}>
          <FlatList
                data={DATA}
                renderItem={({ item }) => (
                  <RequestCardComponent
                  />
                )}
                keyExtractor={(item) => item.id}
              />
        </View>
      
          
          <BottomMenu></BottomMenu>
      </View>
      </ScreenComponent>
    );
  }

  const styles = StyleSheet.create({
    menu: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 30,
      marginTop: 20
    },
  });