import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const CardImage = (props) => {
  return (
    <View>
    <TouchableOpacity onPress={() => props.handleSelect(props.code)}>
        <View style={styles.card}>
            <Text style={styles.cardText}>{props.text}</Text>
            <Image source={props.imgSrc} style={styles.cardImage}/>
        </View>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 25,
        backgroundColor: '#fff',
        minWidth: 240,
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    cardText: {
        color: '#4840BB',
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardImage: {
        alignItems: 'center'
    }
});

export default CardImage;