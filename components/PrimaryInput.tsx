import React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { ThemedView } from "./ThemedView";

interface InputProps extends TextInputProps {
  containerStyle: StyleProp<ViewStyle>;
}

const PrimaryInput: React.FC<InputProps> = ({ containerStyle, ...props }) => {
  return (
    <ThemedView style={containerStyle}>
      <TextInput {...props} />
    </ThemedView>
  );
};

export { PrimaryInput };
