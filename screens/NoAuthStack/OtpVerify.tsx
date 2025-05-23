import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import auth from "@react-native-firebase/auth";
// import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";

import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginTop,
  getWidthnHeight,
} from "../../components/width";
import { Colors } from "../../constants/Colors";
import { NextIconButton } from "../../components/Buttons/RoundButton";
import { LoginTypesStackParamList } from ".";
import { authActions } from "../../redux/slice/auth";
import { RootState } from "../../redux/store";
import { saveUserToFirebase } from "../../firebase/create/saveUser";
import { getUserDetails } from "../../firebase/read/fetchUsers";

type OtpVerifyProps = StackScreenProps<LoginTypesStackParamList, "otpVerify">;

export type LoggedInUserDetailsProps = {
  photoURL?: string | undefined | null;
  phoneNumber: string | null;
  displayName?: string | undefined | null;
  emailVerified?: boolean;
  uid: string | undefined;
  email?: string | undefined | null;
  providerId?: string;
};

export type LoginResponseProps = {
  name?: string | null | undefined;
  additionalUserInfo?: {
    isNewUser?: boolean;
    providerId?: string;
  };
  user: LoggedInUserDetailsProps;
};

const CELL_COUNT = 6;

const OtpVerify: React.FC<OtpVerifyProps> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { details, isNewUser } = useSelector((state: RootState) => state.auth);
  const theme = useColorScheme() ?? "light";
  const { verificationId, phoneNumber } = route.params;

  const [otp, setOtp] = useState<string | null>("");

  useEffect(() => {
    if (details) {
      dispatch(authActions.setIsLoggedIn(true));
    }
  }, [details, isNewUser]);

  useEffect(() => {
    if (otp?.length === CELL_COUNT && verificationId) {
      handleConfirm();
    }
  }, [otp, verificationId]);

  const handleConfirm = useCallback(async () => {
    Keyboard.dismiss();
    if (verificationId && !!otp && otp.length === CELL_COUNT) {
      try {
        const credential = auth.PhoneAuthProvider.credential(
          verificationId,
          otp
        );
        const response = await auth().signInWithCredential(credential);
        const stringifyData = await getUserDetails(response.user.uid);
        if (stringifyData) {
          const parsedUserData: LoggedInUserDetailsProps =
            JSON.parse(stringifyData);
          const data: LoginResponseProps = {
            additionalUserInfo: response.additionalUserInfo,
            user: {
              ...parsedUserData,
              emailVerified: response.user.emailVerified,
              providerId: response.user.providerId,
              uid: response.user.uid,
            },
          };
          console.log("^^ DATABASE DETAILS: ", data);
          if (parsedUserData?.displayName) {
            dispatch(authActions.setIsNewUser(false));
          }
          AsyncStorage.setItem("userData", JSON.stringify(data));
          dispatch(authActions.setUserDetails(JSON.stringify(data)));
        } else {
          const data: LoginResponseProps = {
            additionalUserInfo: response.additionalUserInfo,
            user: response.user,
          };
          console.log("^^ LOGIN RESPONSE: ", data);
          if (response.user.displayName) {
            dispatch(authActions.setIsNewUser(false));
          }
          console.log("### USER DETAILS: ", response.user.displayName);
          AsyncStorage.setItem("userData", JSON.stringify(data));
          dispatch(authActions.setUserDetails(JSON.stringify(data)));
        }
      } catch (error: any) {
        console.log("!!!! confirmationERROR: ", JSON.stringify(error, null, 4));
      } finally {
      }
    }
  }, [otp]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.containerPadding}>
          <ThemedText numberOfLines={2} style={styles.titleStyle}>
            {"Enter your\nverification code"}
          </ThemedText>
          <ThemedText numberOfLines={2} style={styles.subTitleStyle}>
            {`The code has been sent to your mobile number\n +91-${phoneNumber}`}
          </ThemedText>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              borderWidth: 0,
            }}
          >
            <View
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  opacity: 1,
                },
                StyleSheet.absoluteFillObject,
                getMarginTop(7),
              ]}
            >
              <Image
                source={require("../../assets/otp.jpg")}
                resizeMode="cover"
                style={[
                  {
                    width: getWidthnHeight(70)?.width,
                    height: getWidthnHeight(90)?.width,
                  },
                ]}
              />
            </View>
            <View
              style={[
                getMarginTop(1),
                { borderWidth: 0, justifyContent: "center" },
                getWidthnHeight(100, 10),
              ]}
            >
              <OtpInput
                numberOfDigits={6}
                focusColor={Colors[theme]["iconColor"]}
                focusStickBlinkingDuration={500}
                onTextChange={(text) => setOtp(text)}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                theme={{
                  containerStyle: styles.container,
                  pinCodeContainerStyle: {
                    width: getWidthnHeight(12)?.width,
                    height: getWidthnHeight(12)?.width,
                    marginHorizontal: getWidthnHeight(1.5)?.width,
                    borderColor: Colors[theme]["gradeOut"],
                    //   backgroundColor: `${Colors[theme]["buttonBG"]}B0`,
                  },
                  pinCodeTextStyle: {
                    color: Colors[theme]["buttonBorder"],
                  },
                  // focusStickStyle: styles.focusStick,
                  focusedPinCodeContainerStyle: {
                    borderColor: Colors[theme]["buttonBorder"],
                    borderWidth: 1,
                  },
                }}
              />
            </View>
            <View
              style={[
                getMarginTop(1),
                {
                  width: "100%",
                  height: "100%",
                  alignItems: "flex-end",
                },
              ]}
            >
              <NextIconButton onPress={handleConfirm} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  containerPadding: {
    flex: 1,
    paddingHorizontal: getWidthnHeight(5)?.width,
  },
  titleStyle: {
    fontSize: fontSizeH2().fontSize + 8,
    fontFamily: "Cookie_400Regular",
    // lineHeight: -1,
  },
  subTitleStyle: {
    fontSize: fontSizeH4().fontSize,
    fontFamily: "Inter_400Regular",
    // lineHeight: -1,
  },
  container: {
    paddingHorizontal: getWidthnHeight(5)?.width,
    borderWidth: 0,
  },
  pinCodeContainer: {},
  activePinCodeContainer: {},
});

export { OtpVerify };
