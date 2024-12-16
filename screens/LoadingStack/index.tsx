import React, { useEffect, useState } from "react";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  DancingScript_400Regular,
  DancingScript_500Medium,
  DancingScript_600SemiBold,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { GreatVibes_400Regular } from "@expo-google-fonts/great-vibes";
import { Birthstone_400Regular } from "@expo-google-fonts/birthstone";
import { Cookie_400Regular } from "@expo-google-fonts/cookie";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { SquadaOne_400Regular } from "@expo-google-fonts/squada-one";
import { Whisper_400Regular } from "@expo-google-fonts/whisper";
import { View, Text, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { ThemedSafe } from "../../components/ThemedSafe";
import { authActions } from "../../redux/slice/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAAla8ykZ_GUQlNcMNcob42vpyvj9SL9xs",
  authDomain: "zip-tasker.firebaseapp.com",
  databaseURL: "https://zip-tasker.firebaseio.com",
  projectId: "zip-tasker",
  storageBucket: "zip-tasker.appspot.com",
  messagingSenderId: "533861704598",
  appId: "1:533861704598:android:b15a1939491d0f5176f3b7",
  // measurementId: 'G-measurement-id'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

SplashScreen.preventAutoHideAsync();

function LoadingStack() {
  const dispatch = useDispatch();
  const [key, setKey] = useState(0); // Key to force component reset
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold,
    GreatVibes_400Regular,
    Birthstone_400Regular,
    Cookie_400Regular,
    Pacifico_400Regular,
    SquadaOne_400Regular,
    Whisper_400Regular,
  });

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync()
        .then(() => console.log("^^^ SPLASH LOADED "))
        .catch((error) => console.log("!!! SPLASH ERROR: ", error));
    } else {
      // Force reload only once if fonts are not loading
      setTimeout(() => {
        setKey((prevKey) => prevKey + 1);
        SplashScreen.hideAsync()
          .then(() => console.log("^^^ELSE SPLASH LOADED "))
          .catch((error) => console.log("!!!ELSE SPLASH ERROR: ", error));
      }, 1000); // Small delay to avoid immediate re-renders
    }
    console.log("@@@ LOADER: ", loaded, error);
  }, [loaded, error]);

  useEffect(() => {
    AsyncStorage.getItem("userData")
      .then((userData) => {
        if (userData) {
          dispatch(authActions.setIsLoggedIn(true));
          //   console.log("@@@ USER DATA: ", !!userData);
        } else {
          dispatch(authActions.setIsLoggedIn(false));
          //   console.log("### NO USER DATA: ", !!userData);
        }
      })
      .catch((error) => {
        __DEV__ && console.log("!!! ASYNC ERROR: ", error);
      });
  }, []);

  if (!loaded) {
    return (
      <ThemedSafe
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size={"large"} />
      </ThemedSafe>
    );
  }

  return null;
}

export default LoadingStack;
