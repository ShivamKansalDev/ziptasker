import React from "react";
import { TextStyle } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  style?: TextStyle;
  onPress?: () => void;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export interface ThemedIconProps extends ThemeProps {
  name: React.ComponentProps<typeof Feather>["name"];
  color?: string;
  style?: TextStyle;
  size?: number;
}

export const ThemedFeather: React.FC<ThemedIconProps> = ({
  name,
  size,
  style,
  lightColor,
  darkColor,
  colorType = "defaultIconColor",
  ...otherProps
}) => {
  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  return <Feather name={name} size={size} color={iconColor} {...otherProps} />;
};
