import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import {
  useColorScheme,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";
import { DrawerNavProp, DrawerStackParamList } from "..";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "../../../components/width";
import { Colors } from "../../../constants/Colors";
import { PrimaryInput } from "../../../components/PrimaryInput";
import { RoundedDropdown } from "../../../components/RoundedDropdown";
import { ThemedButton } from "../../../components/Buttons/RoundButton";
import { ThemedFeather } from "../../../components/ThemedFeather";
import { ThemedMaterialCommunityIcons } from "../../../components/ThemedMaterialCommunityIcon";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { JobTypeBox } from "../../../components/JobTypeBox";
import { Step2 } from "./Step2";
import { FlatButton } from "../../../components/Buttons/FlatButton";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";

type CreateTaskRouteProp = RouteProp<DrawerStackParamList, "createTask">;

const totalSteps = 4;

const CreateTask: React.FC = () => {
  const route = useRoute<CreateTaskRouteProp>();
  const navigation = useNavigation<DrawerNavProp>();
  const theme = useColorScheme() ?? "light";
  const [step, setStep] = useState<number>(1);

  const [checked, setChecked] = useState<boolean>(false);

  const timeOfDay = [
    {
      id: "1",
      title: "Morning",
      subtitle: "Before 10am",
      icon: (
        <ThemedFeather
          size={getWidthnHeight(5)?.width}
          name="sunrise"
          color={Colors[theme]["iconColor"]}
        />
      ),
    },
    {
      id: "2",
      title: "Midday",
      subtitle: "10am - 2pm",
      icon: (
        <ThemedFeather
          size={getWidthnHeight(5)?.width}
          name="sun"
          color={Colors[theme]["iconColor"]}
        />
      ),
    },
    {
      id: "3",
      title: "Afternoon",
      subtitle: "2pm - 6pm",
      icon: (
        <ThemedMaterialCommunityIcons
          size={getWidthnHeight(5)?.width}
          name="weather-sunset"
          color={Colors[theme]["iconColor"]}
        />
      ),
    },
    {
      id: "4",
      title: "Evening",
      subtitle: "After 6pm",
      icon: (
        <ThemedIonicons
          size={getWidthnHeight(5)?.width}
          name="cloudy-night-outline"
          color={Colors[theme]["iconColor"]}
        />
      ),
    },
  ];

  useEffect(() => {
    console.log("### CREATE TASK ROUTE: ", route.params?.title);
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      {theme === "light" && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              alignItems: "center",
              justifyContent: "flex-end",
            },
          ]}
        >
          <Image
            source={require("../../../assets/query.jpg")}
            resizeMode="cover"
            style={[
              {
                // opacity: 0.1,
                width: getWidthnHeight(100)?.width,
                height: getWidthnHeight(75)?.width,
              },
              getMarginBottom(10),
            ]}
          />
        </View>
      )}
      <ThemedText
        style={[
          { paddingHorizontal: getWidthnHeight(4)?.width },
          fontSizeH4(),
          getMarginTop(4),
        ]}
      >
        {`STEP ${step}/4`}
      </ThemedText>
      <View
        style={{
          borderWidth: 0,
          flex: 1,
          paddingHorizontal: getWidthnHeight(4)?.width,
        }}
      >
        {step === 1 && (
          <View style={[{ flex: 1 }]}>
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
              Let's start with the basics
            </ThemedText>
            <View style={[getMarginTop(4)]}>
              <ThemedText
                style={[
                  { fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" },
                ]}
              >
                In a few words, what do you need done?
              </ThemedText>
              <View
                style={[
                  {
                    backgroundColor: Colors[theme]["screenBG"],
                    borderRadius: getWidthnHeight(3)?.width,
                    borderWidth: theme === "light" ? 0 : 1,
                    borderColor: Colors[theme]["iconColor"],
                  },
                  getMarginTop(1.5),
                ]}
              >
                <PrimaryInput
                  containerStyle={{
                    backgroundColor: "transparent",
                  }}
                  style={{
                    fontSize: fontSizeH4().fontSize + 4,
                    margin: getWidthnHeight(2)?.width,
                  }}
                  placeholder="eg. Help me move sofa"
                  placeholderTextColor={Colors[theme]["darkGray"]}
                  onChangeText={(text) => {}}
                />
              </View>
            </View>
            <View style={[getMarginTop(4)]}>
              <ThemedText
                style={[
                  { fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" },
                ]}
              >
                When do you need this done?
              </ThemedText>
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: "transparent",
                  },
                  getMarginTop(2),
                ]}
              >
                <RoundedDropdown
                  title={"On date"}
                  style={{
                    borderWidth: 2,
                    borderColor: Colors[theme]["iconColor"],
                    paddingHorizontal: getWidthnHeight(3)?.width,
                    paddingVertical: getWidthnHeight(1)?.width,
                    borderRadius: getWidthnHeight(10)?.width,
                  }}
                />
                <RoundedDropdown
                  title={"Before date"}
                  style={{
                    borderWidth: 2,
                    borderColor: Colors[theme]["iconColor"],
                    paddingHorizontal: getWidthnHeight(3)?.width,
                    paddingVertical: getWidthnHeight(1)?.width,
                    borderRadius: getWidthnHeight(10)?.width,
                  }}
                />
                <RoundedDropdown
                  title={"I'm flexible"}
                  iconSize={null}
                  style={{
                    borderWidth: 2,
                    borderColor: Colors[theme]["iconColor"],
                    paddingHorizontal: getWidthnHeight(3)?.width,
                    paddingVertical: getWidthnHeight(1)?.width,
                    borderRadius: getWidthnHeight(10)?.width,
                  }}
                />
              </View>
              <View
                style={[
                  { flexDirection: "row", alignItems: "center" },
                  getMarginTop(2),
                ]}
              >
                <Checkbox
                  value={checked}
                  onValueChange={() => setChecked(!checked)}
                />
                <ThemedText style={getMarginLeft(3)}>
                  I need certain time of day
                </ThemedText>
              </View>
            </View>
            {checked && (
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                  getMarginTop(3),
                ]}
              >
                <FlatList
                  data={timeOfDay}
                  numColumns={2}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    const backgroundColor = `${Colors[theme]["gradeOut"]}E0`;
                    return (
                      <ThemedView
                        style={[
                          {
                            flex: 1,
                            alignItems: "center",
                            marginHorizontal: getWidthnHeight(2)?.width,
                            borderRadius: getWidthnHeight(3)?.width,
                            backgroundColor,
                          },
                          getMarginTop(2),
                        ]}
                      >
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{
                            flex: 1,
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            paddingVertical: getWidthnHeight(4)?.width,
                          }}
                        >
                          <>
                            {item.icon}
                            <ThemedText
                              style={{
                                fontSize: fontSizeH4().fontSize + 5,
                                fontWeight: "500",
                              }}
                            >
                              {item.title}
                            </ThemedText>
                            <ThemedText style={[fontSizeH4()]}>
                              {item.subtitle}
                            </ThemedText>
                          </>
                        </TouchableOpacity>
                      </ThemedView>
                    );
                  }}
                />
              </View>
            )}
          </View>
        )}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </View>
      <View>
        {step === 1 && (
          <FlatButton
            lightColor={Colors[theme]["yellow"]}
            darkColor={Colors[theme]["yellow"]}
            title="Next"
            onPress={() => setStep(step + 1)}
            style={{ borderWidth: 0 }}
          />
        )}
        {step > 1 && (
          <View style={[]}>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: 0,
                  borderColor: "red",
                },
              ]}
            >
              <FlatButton
                lightColor={Colors[theme]["yellow"]}
                darkColor={Colors[theme]["yellow"]}
                title="Back"
                onPress={() => setStep(step - 1)}
                style={{ borderWidth: 0, width: step < 4 ? "50%" : "100%" }}
              />
              {step < 4 && (
                <FlatButton
                  lightColor={Colors[theme]["yellow"]}
                  darkColor={Colors[theme]["yellow"]}
                  title="Next"
                  onPress={() => setStep(step + 1)}
                  style={{
                    borderWidth: 0,
                    width: "50%",
                    borderLeftWidth: 1,
                    borderLeftColor: Colors[theme]["iconColor"],
                  }}
                />
              )}
            </View>
          </View>
        )}
      </View>
    </ThemedView>
  );
};

export { CreateTask };
