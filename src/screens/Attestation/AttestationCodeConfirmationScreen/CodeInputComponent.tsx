import React from "react";
import { FONTS, SIZES } from "../../../styles/fonts/fonts";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Image } from "react-native";
import COLORS from '../../../styles/colors/colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from "expo-linear-gradient";

/**
 * 
 * @param props {
 *     inputLabel: then input label. 
 * }
 * @returns 
 */
const CodeInputComponent = (props) => {

    const setCodeVerificationStatus = props.setCodeVerificationStatus;
    const [code, setCode] = React.useState("");
    const [componentStateStyling, onChangeComponentStateStyling] = React.useState(styles.blurContainer);
    // True is being verified has been verified.
    const  [verifying, onCodeVerificationStart] = React.useState(false);
    // True if code has been verified.
    const  [verified, onCodeVerified] = React.useState(false);

    
    const onCodeChange = (c: string) => {
        setCode(c);
         if (c.length > 7)  {
            onCodeVerificationStart(true);
            onCodeVerified(false);

            setTimeout(function () { 
                onCodeVerificationStart(false);
                onCodeVerified(true);
                setCodeVerificationStatus(true);
            }, 10000);
        } else { 
            onCodeVerified(false);
            onCodeVerificationStart(false);
        }
    }


    return (
        <View style={[styles.container, componentStateStyling]}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.inputLabel}>{props.inputLabel}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onCodeChange}
                    placeholder="Paste Code"
                    keyboardType="numeric"
                    placeholderTextColor={COLORS.grayLight}
                    onBlur={ () => onChangeComponentStateStyling(styles.blurContainer) }
                    onFocus={ () => onChangeComponentStateStyling(styles.focusContainer) }
                    editable={!verifying && !verified}
                />

               
                {verifying? 
                    <LinearGradient
                        colors={COLORS.nextButtonGradient}
                        start={[1, 0]}
                        end={[0, 1]}
                        style={styles.circularProgressBackground}
                    >
                        <CircularProgress
                            value={97}
                            radius={10.5}
                            inActiveStrokeOpacity={0.5}
                            activeStrokeWidth={12}
                            inActiveStrokeWidth={12}
                            showProgressValue={false}
                            activeStrokeSecondaryColor={COLORS.white}
                            inActiveStrokeColor={COLORS.white}
                            activeStrokeColor={COLORS.white}
                            duration={10000}
                            dashedStrokeConfig={{
                                count: 10,
                                width: 2,
                            }}
                        />
                    </LinearGradient>: null
                }

                {verified? 
                   <Image
                    source={require("../../../assets/icons/akar-icons_circle-check.png")}
                    style={styles.circleCheckIcon}
                    />: null
                }
                </View>
            </SafeAreaView>
        </View>

    );
  };

const styles = StyleSheet.create({
    container: {
      height: SIZES.height * 0.1,
      width: SIZES.width * 0.85,
      backgroundColor: COLORS.white,
      justifyContent: 'flex-end',
      alignSelf: 'center',
      borderRadius: 20, 
      padding: 20,
      marginTop: 20,
      marginBottom: 20
    },
    focusContainer: {
        shadowColor: COLORS.realBlack,
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 24,
    },
    blurContainer: {

    },
    input: {
        // height: 40,
        margin: 12,
        width: SIZES.width * 0.6,
        ...FONTS.body7,
    },
    inputLabel: {
        ...FONTS.body7,
        color: COLORS.grayLightest,
        marginTop: 35,
        paddingLeft: 10
    },
    circularProgressBackground: {
        width: 25,
        height: 25,
        borderRadius: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    circleCheckIcon: {
        marginTop: 5,
        height: 22,
        width: 22
    }
  });

  export default CodeInputComponent;