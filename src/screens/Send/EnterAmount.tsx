import { View, TouchableOpacity, Pressable, Alert, StyleSheet, Text } from 'react-native'
import React,{useState, useRef} from 'react'
import ScreenComponent from '../../containers/ScreenComponent'
import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";
import { TextInput } from "react-native-gesture-handler";
import KeyPad from '../../components/buttons/KeyPad';
import { LinearGradient } from "expo-linear-gradient";
import { PortalProvider } from "@gorhom/portal";
import BottomSheet from './BottomSheet';

const EnterAmount = ({route, navigation}) => {
    const {recieversName, recieversPhoneNumber} = route.params;
    const modalRef = useRef<any>();

    const [value, setValue] = useState("");
    const [coinChoice, setCoinChoice] = useState("cUSD")
    const openModal = () => {
        modalRef.current?.open();
      };
    
      const closeModal = () => {
        modalRef.current?.close();
        }
    
        

    function handleChange(newValue) {
        setValue(newValue);
      }
    
  return (
    < PortalProvider>                        
    <ScreenComponent>
      <View>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>  
        <View>
        <Text style={styles.title}>Send Funds</Text>
        <Text style={styles.subTutle}>cUSD 13 available</Text>
        </View>
        <Pressable
          onPress={() => openModal()}
        >
            <View style={styles.dropDown}>
                <Text style={{...FONTS.body8, color:COLORS.primary}}>{coinChoice}</Text>
                <Entypo name="chevron-small-down" size={24} color={COLORS.primary} />
            </View>
        </Pressable>
        </View>
        <View style={styles.middleContainer}>
            <Pressable style={styles.minmax}>
                <Text style={styles.subTutle}>Max</Text>
            </Pressable>            
            <View style={{flex:1, paddingHorizontal:20}}>
            <TextInput style={styles.Texttitle} placeholder="Ksh 200">
          Ksh {value}
        </TextInput>
                <Text style={styles.subTutle}>cUSD 30</Text>

            </View>
            <Pressable  style={styles.minmax}>
            <MaterialCommunityIcons name="swap-vertical" size={20} color={COLORS.primary} />
            </Pressable>

        </View>
        <View style={{margin:20, padding:20}}>
        <KeyPad value={value} onChange={handleChange} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Description", {
              Name: recieversName,
              Phone:recieversPhoneNumber,
              Amount:value
          })}
        >
          <LinearGradient
            colors={["rgba(183, 0, 76, 0.3)", "rgba(19, 63, 219, 1)"]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Review</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScreenComponent>
    <BottomSheet modalRef={modalRef} onClose={closeModal}  setCoinChoice={ setCoinChoice}/>
       </PortalProvider>
  )
}

export default EnterAmount
const modalStyles = StyleSheet.create({
    container:{
        height: "auto",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
    }
})
const styles = StyleSheet.create({
    topContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        padding:15,
        marginHorizontal:10,
        marginVertical:10,
    },
    dropDown: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:COLORS.white,
        width:60,
        height:30,
        borderRadius:12
    },
    title:{
        ...FONTS.body3,
        color:COLORS.black

    },
    subTutle:{
        ...FONTS.s3,
        color:COLORS.grayLight,
        alignSelf:"center"
    },
    middleContainer :{
        padding:10,
        display:"flex",
        flexDirection:"row",
        paddingHorizontal:20,
        marginTop:40

    },
    minmax :{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:COLORS.white,
        width:45,
        height:45,
        borderRadius:14
    },
    Texttitle:{
        fontSize: 28,
        lineHeight: 34,
        marginBottom: 30,
        textAlign: "center",
        color: COLORS.primary,
        fontFamily: FONTS.displayBold.fontFamily,
    },
    button:{
        alignSelf:"center",
        height: 56,
        width: "80%",
        marginTop: 10,
        borderRadius: 28,
        marginBottom: 30,
        justifyContent: "center",
    },
    buttonText:{
        fontSize: 20,
        lineHeight: FONTS.displayBold.lineHeight,
        textAlign: "center",
        color: COLORS.white,
        fontFamily: FONTS.displayBold.fontFamily,
    }
})