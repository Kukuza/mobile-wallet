import { View, TouchableOpacity, Pressable, Alert, StyleSheet, Text } from 'react-native'
import React,{useState, useRef, Fragment, useEffect} from 'react'
import ScreenComponent from '../../containers/ScreenComponent'
import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../styles/colors/colors";
import { FONTS } from "../../styles/fonts/fonts";
import { TextInput } from "react-native-gesture-handler";
import KeyPad from '../../components/buttons/KeyPad';
import { LinearGradient } from "expo-linear-gradient";
import { PortalProvider } from "@gorhom/portal";
import BottomSheet from '../../components/cards/BottomSheets/BottomSheet';
import Banner from '../../components/cards/Banner';
import Popup from '../../components/cards/Popup';
import WakalaContractKit from "../../utils/smart_contract_integration/WakalaContractKit";




const EnterAmount = ({route, navigation}) => {
    const {recieversName, recieversPhoneNumber} = route.params;
    const [balance, setBalance] = useState("");
    const [celo, setCelo] = useState("")
    const modalRef = useRef<any>();
    const bannerRef = useRef<any>();
    const popupRef = useRef<any>();

    const [value, setValue] = useState("");
    const [coinChoice, setCoinChoice] = useState("cUSD");
   // const convertToUsd: ICurrency = {from:"kes", to:"usd", amount:Number(value!)}
   // const [cusd, setCusd] = useState("")
   

    const walletBalance = async () => {
      const wakalaKit = WakalaContractKit?.getInstance();
      const balances = await WakalaContractKit?.getInstance()?.getCurrentAccountBalance();
      let money = balances?.cUSD;
      let celoMoney = balances?.CELO
  
      // change balance to cUSD.
      let amount = wakalaKit?.web3.utils.fromWei(money?.toString(), "ether");
      const toNum = Number(amount);
      setBalance(toNum.toFixed(2));

      //Get CELO Balances.
      let celoamount = wakalaKit?.web3.utils.fromWei(celoMoney?.toString(), "ether");
      const celotoNum = Number(celoamount);
      const celovisibleAmount = celotoNum.toFixed(2);
      setCelo(celovisibleAmount);

    };
    useEffect(() => {
      walletBalance();
    }, [])
    
    const BannerContent = (props: any) => {
      return (
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>cUSD 1,000 Limit</Text>
          <Text style={modalStyles.Text}>
          You are about to send more than your send daily limit of cUSD 1,000. Please contact <Text style={modalStyles.support}>wakala@support.com </Text>if you want to raise your daily send limit.
          </Text>
          <View style={modalStyles.buttons}>
          <TouchableOpacity
          style={modalStyles.button}
            onPress={() => props.bannerRef.current?.closeBanner()}
          >
            <Text style={modalStyles.contact}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={modalStyles.button}
            onPress={() => props.bannerRef.current?.closeBanner()}
          >
            <Text style={modalStyles.okay}>Okay</Text>
          </TouchableOpacity>
          </View>

        </View>
      );
    };
    const PopupContent = (props: any) => {
      const amount = props.value
      return (
        <View>
          <Text style={{...FONTS.headline, color:COLORS.error}}>
          {amount < 1 ? "Please enter the amount to send":"You should have a minimum of Ksh 2.70 to make this transaction. Please add funds or try sending less"}
          
          </Text>
        </View>
      );
    };
    const openModal = () => {
        modalRef.current?.open();
      };
    
      const closeModal = () => {
        modalRef.current?.close();
        }
    
        

    function handleChange(newValue: any) {
      if (value == "" && newValue == "0") {
        return null;
      }
      setValue(value + newValue);
     // dispatch(getCurrency(convertToUsd));
    //  const cusdAmt = useSelector((state: any) => state.currency);
   //   setCusd(cusdAmt)
      }
    function validateInput(value: any) {
      if(value.length < 1){
        popupRef.current?.openBanner()
        setTimeout(() => {
        popupRef.current?.closeBanner();
        }, 2000);
      } else if(value >= 100000){
        bannerRef.current?.openBanner()
      } else {
        navigation.navigate("Description", {
          Name: recieversName,
          Phone:recieversPhoneNumber,
          Amount:value,
          Coin:coinChoice
      })
      }

    }
    function handleDelete () {
      setValue(value.slice(0, -1));
    }
    
  return (
    < PortalProvider>
    <Fragment>                       
    <ScreenComponent>
      <View>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={32} color={COLORS.primary} />
        </TouchableOpacity>  
        <View>
        <Text style={styles.title}>Send Funds</Text>
        <Text style={styles.subTutle}>{coinChoice} {coinChoice === "CELO" ? `${celo}`:`${balance}`} available</Text>
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
                <Text style={styles.subTutle}>{coinChoice} 30</Text>

            </View>
            <Pressable  style={styles.minmax}>
            <MaterialCommunityIcons name="swap-vertical" size={20} color={COLORS.primary} />
            </Pressable>

        </View>
        <View style={{margin:20, padding:20}}>
        <KeyPad  value={value} onChange={handleChange} onDelete={handleDelete} />
        </View>
        <TouchableOpacity
          onPress={() => validateInput(value) }
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
    <Banner
        ref={bannerRef}
        style={{ height: 250 }}
        content={<BannerContent bannerRef={bannerRef} />}
      />
      <Popup
        ref={popupRef}
        style={{ height: 90}}
        content={<PopupContent popupRef={popupRef} value={value}  />}
      />
    </Fragment>
    <BottomSheet 
      modalRef={modalRef}
      onClose={closeModal}
      bal={balance} 
      celo={celo} 
      setCoinChoice={ setCoinChoice}/>
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
    },
    buttons:{
      width:"85%",
      padding:10,
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-around",
      marginTop:"20%",

    },
    Text:{
      marginTop:"10%",
      ...FONTS.headline,
      color:COLORS.textDarkBlue
    },
    button:{
  

    },
    contact:{
      ...FONTS.sh1,
      color:COLORS.textPrimary
    },
    okay:{
      ...FONTS.sh1,
      color:COLORS.primary
    },
    title:{
      marginTop:"10%",
      ...FONTS.sh2,
      color:COLORS.textDarkBlue
    },
    support:{
      ...FONTS.headline,
      color:COLORS.accent1
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
        ...FONTS.body4,
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