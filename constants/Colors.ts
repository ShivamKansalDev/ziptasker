/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const primary = "#FFCE00";
const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const darkPrimary = "#151718";
const darkYellow = "#E7B10A";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    underline: darkPrimary,
    phoneIcon: "#FFFFFF",
    primary: primary,
    black: "#000000",
    buttonBG: "#FFFFFF",
    buttonBorder: "#000000",
    gradeOut: "#C4C4C4",
    darkGray: "#8b8989",
    defaultIconColor: "#FFFFFF",
    iconColor: "#000000",
    screenBG: "#F3F3F3",
    muddy: "#A2792F",
    orange: "#FF9D3D",
    white: "#FFFFFF",
    yellow: primary,
    lightYellow: `${primary}3F`,
    darkYellow,
    transparentGray: "#C4C4C4F0",
    commonScreenBG: "#F3F3F3",
  },
  dark: {
    text: "#ECEDEE",
    background: darkPrimary,
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    underline: "#FFFFFF",
    phoneIcon: "#FFFFFF",
    primary: primary,
    black: "#000000",
    buttonBG: "#000000",
    buttonBorder: "#FFFFFF",
    gradeOut: "#C4C4C4",
    darkGray: "#8b8989",
    defaultIconColor: "#000000",
    iconColor: "#FFFFFF",
    screenBG: darkPrimary,
    muddy: "#A2792F",
    orange: "#FF9D3D",
    white: "#FFFFFF",
    yellow: primary,
    lightYellow: `${primary}3F`,
    darkYellow,
    transparentGray: "#C4C4C4F0",
    commonScreenBG: "#F3F3F3",
  },
};