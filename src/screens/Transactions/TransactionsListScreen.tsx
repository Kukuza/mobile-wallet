import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import RequestCardComponent from '../../components/RequestCardComponent';

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
];

class TransactionsListScreen extends Component {

  render() {
    return (
      
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        {/* <RequestCardComponent></RequestCardComponent>
        <RequestCardComponent></RequestCardComponent>
        <RequestCardComponent></RequestCardComponent> */}
       
        <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <RequestCardComponent
                  // _id={item._id}
                  // amount={item.amount}
                  // stars={item.stars}
                  // rating={item.rating}
                  // type={item.type}
                  // transaction={item}
                  // deleteItem={removeDepositRequestItem}
                />
              )}
              keyExtractor={(item) => item.id}
            />
      </View>
      
    );
  }
}

export default TransactionsListScreen;

const styles = StyleSheet.create({
  
});
