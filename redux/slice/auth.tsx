import { createSlice } from "@reduxjs/toolkit";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import {
  AntDesignNames,
  EntypoNames,
  EvilIconsNames,
  FeatherNames,
  FontAwesome5Names,
  FontAwesome6Names,
  FontAwesomeNames,
  FontistoNames,
  FoundationNames,
  IoniconsNames,
  MaterialCommunityIconsNames,
  MaterialIconsNames,
  OctIconsNames,
  SimpleLineIconsNames,
  VectorIconsProps,
  ZocialNames,
} from "../../constants/VectorIcons";

export type UserDetails = FirebaseAuthTypes.UserCredential & {
  name?: string;
};

type InitialStateProps = {
  isConnected: boolean;
  isLoggedIn: boolean | null;
  isNewUser: boolean;
  details: UserDetails | null | string;
  showMap: boolean;
};

const initialState: InitialStateProps = {
  isConnected: true,
  isLoggedIn: null,
  isNewUser: true,
  details: null,
  showMap: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsConnected: (state, action) => {
      return {
        ...state,
        isConnected: action.payload,
      };
    },
    setIsLoggedIn: (state, action) => {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
    setIsNewUser: (state, action) => {
      return {
        ...state,
        isNewUser: action.payload,
      };
    },
    resetAuthSlice: () => {
      return initialState;
    },
    setUserDetails: (state, action) => {
      return {
        ...state,
        details: action.payload,
      };
    },
    setShowMap: (state, action) => {
      return {
        ...state,
        showMap: action.payload,
      };
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
