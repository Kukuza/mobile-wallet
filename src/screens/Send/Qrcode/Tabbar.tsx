import { Pressable, StyleSheet, Text, View,Animated } from 'react-native';
import React, { useState } from 'react';
import COLORS from "../../../styles/colors/colors";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import { Feather,FontAwesome } from '@expo/vector-icons';
const Tabheight = SIZES.height * 0.1
export default function Tabbar({state, descriptors, navigation, position}) {
    const [xTabOne, setXTabOne] = useState(0);
    const translateX = new Animated.Value(0);


const handleSlide =(toPosition: number) => {
Animated.spring(translateX,{
    toValue: toPosition,
    useNativeDriver: false, 
    damping:15,
}).start()

    }
    
  return (
    <View style={styles.wrapper} >
        <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
        <Feather name="x" size={24} color={COLORS.black} />
        </Pressable>
     <View style={styles.midContainer}>
     {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
  
        const isFocused = state.index === index;
        if(isFocused && index < 1){
            Animated.spring(translateX,{
                toValue: 0,
                useNativeDriver: false, 
                damping:15,
            }).start()
        } else {
            Animated.spring(translateX,{
                toValue: 94,
                useNativeDriver: false, 
                damping:15,
            }).start()
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
         <Pressable style={[styles.buttonLeft, isFocused && styles.buttonRight]}
         key={route.key}
         accessibilityRole="button"
         accessibilityState={isFocused ? {selected: true}:{}}
         accessibilityLabel={options.tabBarAccessibilityLabel}
         testID={options.tabBarTestID}
         onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
         onPress = {onPress}
        onLongPress={onLongPress}
         >
        <Text style={[styles.textLeft, isFocused && styles.textRight]}>{label}</Text>
         </Pressable>
        );
      })}
     </View>
      <Pressable>
      <FontAwesome name="share-square-o" size={28} color={COLORS.primary} />
        </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
wrapper:{
    top:25,
    display:"flex",
    flexDirection:"row",
    zIndex:5,
    height:Tabheight, 
    backgroundColor:"#F7EFFA",
    alignSelf:"center",
  

},
container:{
    alignSelf:"center",
    padding:15,
    display:"flex",
    flexDirection:"row", 
    justifyContent:"space-between",
    marginHorizontal:"2%"
},
midContainer:{
    flex:1,
    position:"relative",
    marginTop:"5%",
    marginHorizontal:"15%",
    flexDirection:"row",
    alignSelf:"center",
    justifyContent:"center",
    height:39,

    
},
overLay:{
    position:"absolute",
    width:"50%",
    height:"100%",
    top:0,
    left:0,
    backgroundColor:COLORS.primary
},
buttonRight:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:0.4,
    borderRightWidth:0,
    borderColor:COLORS.primary,
    height:"100%",
    backgroundColor:COLORS.primary
},
buttonLeft:{
    padding:0,
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:0.4,
    borderColor:COLORS.primary,
    height:"100%",
   
},
textRight:{
    ...FONTS.body7,
    color:COLORS.white
},
textLeft:{
    ...FONTS.body7,
    color:COLORS.textPrimary,
}


})