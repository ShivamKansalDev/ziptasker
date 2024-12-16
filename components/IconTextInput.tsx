import React, { ReactNode } from "react";
import {
  TextInput,
  TextInputProps,
  TextStyle,
  useColorScheme,
  View,
} from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedIonicons } from "./ThemedIonicons";
import { getWidthnHeight } from "./width";
import { Colors } from "../constants/Colors";

type IconTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  icon?: ReactNode;
  style?: TextStyle;
};

const IconTextInput: React.FC<IconTextInputProps> = ({
  icon,
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView
      colorType={"screenBG"}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: getWidthnHeight(3)?.width,
        paddingVertical: getWidthnHeight(2)?.width,
        borderRadius: getWidthnHeight(3)?.width,
        elevation: 4,
        shadowColor: Colors[theme]["iconColor"],
        shadowOpacity: 0.6,
        shadowRadius: 6,
      }}
    >
      {icon && <View style={{ borderWidth: 0 }}>{icon}</View>}
      <TextInput style={style} {...otherProps} />
    </ThemedView>
  );
};

export { IconTextInput };
