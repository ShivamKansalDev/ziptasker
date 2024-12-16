import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import { JobTypeBox } from "../../../components/JobTypeBox";
import { Colors } from "../../../constants/Colors";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginTop,
  getWidthnHeight,
} from "../../../components/width";
import { ThemedText } from "../../../components/ThemedText";
import { IconTextInput } from "../../../components/IconTextInput";
import { ThemedIonicons } from "../../../components/ThemedIonicons";

const Step2: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const [selected, setSelected] = useState<number>(1);
  const [searchText, setSearchText] = useState<string | undefined>("");

  return (
    <View style={{ flex: 1 }}>
      <ThemedText
        style={[
          {
            lineHeight: -1,
            fontFamily: "SquadaOne_400Regular",
            color: Colors[theme]["iconColor"],
            fontSize: fontSizeH2().fontSize + 4,
          },
          // fontSizeH2(),
        ]}
      >
        Tell us where
      </ThemedText>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0,
          },
          getMarginTop(4),
        ]}
      >
        <JobTypeBox
          title="In-person"
          subtitle="Select this if you need the Tasker physically there"
          lightColor={
            selected === 1 ? Colors[theme]["yellow"] : Colors[theme]["screenBG"]
          }
          darkColor={
            selected === 1 ? Colors[theme]["yellow"] : Colors[theme]["screenBG"]
          }
          onPress={() => {
            if (selected == 2) {
              setSelected(1);
            }
          }}
          style={{
            width: getWidthnHeight(44)?.width,
            height: getWidthnHeight(40)?.width,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: getWidthnHeight(3)?.width,
            elevation: 4,
            shadowColor: Colors[theme]["iconColor"],
            shadowOpacity: 0.4,
            shadowRadius: 6,
          }}
        />
        <JobTypeBox
          title="Online"
          subtitle="Select this if the Tasker can do it from home"
          lightColor={
            selected === 2 ? Colors[theme]["yellow"] : Colors[theme]["screenBG"]
          }
          darkColor={
            selected === 2 ? Colors[theme]["yellow"] : Colors[theme]["screenBG"]
          }
          onPress={() => {
            if (selected == 1) {
              setSelected(2);
            }
          }}
          style={{
            width: getWidthnHeight(44)?.width,
            height: getWidthnHeight(40)?.width,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: getWidthnHeight(3)?.width,
            elevation: 4,
            shadowColor: Colors[theme]["iconColor"],
            shadowOpacity: 0.4,
            shadowRadius: 6,
          }}
        />
      </View>
      <ThemedText
        style={[
          { fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" },
          getMarginTop(4),
        ]}
      >
        Where do you need this done?
      </ThemedText>
      <View style={[getMarginTop(1.5)]}>
        <IconTextInput
          value={searchText}
          onChangeText={(text) => setSearchText(text.trimStart())}
          icon={
            <ThemedIonicons
              name="location"
              colorType={"iconColor"}
              size={getWidthnHeight(7)?.width}
            />
          }
          placeholder="Enter your postcode"
          placeholderTextColor={Colors[theme]["darkGray"]}
          style={{
            flex: 1,
            paddingHorizontal: getWidthnHeight(3)?.width,
            marginHorizontal: getWidthnHeight(1)?.width,
            fontSize: fontSizeH4().fontSize + 5,
          }}
        />
      </View>
    </View>
  );
};

export { Step2 };
