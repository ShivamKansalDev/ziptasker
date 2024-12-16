import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { ThemedView } from "../../components/ThemedView";
import { ThemedSafe } from "../../components/ThemedSafe";
import {
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { ThemedText } from "../../components/ThemedText";
import { BrowseStackNavigationProps, TaskDetailsStackParamList } from ".";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { Colors } from "../../constants/Colors";
import { PostComponent } from "../../components/PostComponent";
import { ThemedFontAwesome } from "../../components/ThemedFontAwesome";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { FlatButton } from "../../components/Buttons/FlatButton";
import { ThemedPicker } from "../../components/ThemedPicker";
import { ThemedGradientView } from "../../components/ThemedGradientView";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";

type TaskDetailsRouteProp = RouteProp<TaskDetailsStackParamList, "taskDetails">;

const TaskDetails: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const route = useRoute<TaskDetailsRouteProp>();
  const navigation = useNavigation<BrowseStackNavigationProps>();
  const taskDetails = route.params?.details;
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const [animateSlide, setAnimateSlide] = useState<Animated.Value>(
    new Animated.Value(0)
  );

  const items = [
    {
      label: "Post a similar task",
      value: "item1",
    },
    {
      label: "Set up Alerts",
      value: "item2",
    },
  ];

  useEffect(() => {
    if (expand) {
      slidingEffect(1);
    } else {
      slidingEffect(0);
    }

    return () => {
      navigation.navigate("browseTasks");
    };
  }, [expand]);

  function slidingEffect(value: number) {
    Animated.timing(animateSlide, {
      toValue: value,
      useNativeDriver: false,
    }).start();
  }

  const animatedStyle: ViewStyle = {
    transform: [
      {
        translateY: animateSlide.interpolate({
          inputRange: [0, 1],
          outputRange: [0, getWidthnHeight(-40)?.width!],
        }),
      },
    ],
  };

  const animateHeight: ViewStyle = {
    // height: animateSlide.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ["100%", "60%"],
    // }),
  };

  return (
    <ThemedSafe style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ThemedView
          colorType={"screenBG"}
          style={{
            flex: 1,
            borderWidth: 0.01,
            borderColor: "transparent",
            paddingHorizontal: getWidthnHeight(3)?.width,
          }}
        >
          <ThemedView
            colorType={"white"}
            style={[styles.shadow, getMarginTop(2)]}
          >
            <View
              style={[
                {
                  paddingTop: getWidthnHeight(2)?.width,
                },
              ]}
            >
              <View
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                }}
              >
                <View
                  style={[
                    {
                      shadowColor: Colors[theme]["iconColor"],
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <ThemedView
                    colorType={"yellow"}
                    style={{
                      paddingHorizontal: getWidthnHeight(2)?.width,
                      borderRadius: getWidthnHeight(5)?.width,
                    }}
                  >
                    <ThemedText style={{ fontSize: fontSizeH4().fontSize - 2 }}>
                      OPEN
                    </ThemedText>
                  </ThemedView>
                  <ThemedView
                    colorType={"iconColor"}
                    style={{
                      paddingHorizontal: getWidthnHeight(2)?.width,
                      borderRadius: getWidthnHeight(5)?.width,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <ThemedAntDesign
                      name={"heart"}
                      colorType={"buttonBG"}
                      size={getWidthnHeight(3)?.width}
                    />
                    <ThemedText
                      colorType={"buttonBG"}
                      style={[
                        { fontSize: fontSizeH4().fontSize - 2 },
                        getMarginLeft(1),
                      ]}
                    >
                      Follow
                    </ThemedText>
                  </ThemedView>
                </View>
                <ThemedText
                  style={[
                    fontSizeH2(),
                    {
                      lineHeight: -1,
                      fontFamily: "SquadaOne_400Regular",
                      color: Colors[theme]["iconColor"],
                    },
                    getMarginTop(2),
                  ]}
                >
                  {taskDetails?.title}
                </ThemedText>
              </View>
              <PostComponent
                style={{
                  marginTop: getMarginTop(2).marginTop,
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  backgroundColor: Colors[theme]["commonScreenBG"],
                  borderWidth: 0.01,
                  borderColor: "transparent",
                }}
                subtitle="Jane A."
                icon={
                  <ThemedFontAwesome
                    name={"user-circle"}
                    colorType={"yellow"}
                    size={getWidthnHeight(7)?.width}
                  />
                }
              />
              <PostComponent
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  borderWidth: 0.01,
                  borderColor: "transparent",
                }}
                time={null}
                title={"LOCATION"}
                subtitle="Remote"
                icon={
                  <ThemedIonicons
                    name={"location-outline"}
                    colorType={"iconColor"}
                    size={getWidthnHeight(7)?.width}
                  />
                }
              />
              <PostComponent
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  backgroundColor: Colors[theme]["commonScreenBG"],
                  borderWidth: 0.01,
                  borderColor: "transparent",
                }}
                time={null}
                title={"TO BE DONE ON"}
                subtitle={"Flexible"}
                icon={
                  <ThemedFontAwesome
                    name={"calendar-check-o"}
                    colorType={"iconColor"}
                    size={getWidthnHeight(6)?.width}
                  />
                }
              />
            </View>
          </ThemedView>

          <ThemedView
            colorType={"white"}
            style={[styles.shadow, getMarginTop(2)]}
          >
            <View
              style={{
                paddingVertical: getWidthnHeight(2)?.width,
              }}
            >
              <View style={getMarginTop(0)}>
                <ThemedText
                  style={{
                    textAlign: "center",
                    fontSize: fontSizeH4().fontSize - 2,
                  }}
                >
                  TASK BUDGET
                </ThemedText>
                <ThemedText
                  style={[
                    {
                      lineHeight: -1,
                      fontFamily: "SquadaOne_400Regular",
                      color: Colors[theme]["iconColor"],
                      textAlign: "center",
                      fontSize: fontSizeH1().fontSize,
                    },
                  ]}
                >
                  $700
                </ThemedText>
              </View>
              <FlatButton
                lightColor={Colors[theme]["yellow"]}
                darkColor={Colors[theme]["yellow"]}
                title="Make an offer"
                onPress={() => {}}
                style={getMarginBottom(2)}
                textStyle={{
                  paddingVertical: getWidthnHeight(2)?.width,
                  fontSize: fontSizeH4().fontSize + 3,
                }}
              />
              <View
                style={[
                  {
                    paddingHorizontal: getWidthnHeight(3)?.width,
                  },
                  getMarginTop(0),
                ]}
              >
                <ThemedPicker
                  items={items}
                  placeholder="More Options"
                  colorType={"commonScreenBG"}
                  containerStyle={{
                    borderRadius: getWidthnHeight(2)?.width,
                  }}
                  selectedValue={selectedOption}
                  onValueChange={(itemValue, index) => {
                    console.log("@@@ ITEM SELECTED: ", itemValue);
                  }}
                />
              </View>
            </View>
          </ThemedView>

          <View>
            <Animated.View
              style={[
                {
                  borderWidth: 0,
                },
                animateHeight,
                getMarginTop(2),
              ]}
            >
              <ThemedView
                colorType={"white"}
                style={[
                  {
                    padding: getWidthnHeight(3)?.width,
                  },
                  styles.shadow,
                ]}
              >
                <ThemedText
                  style={{
                    fontSize: fontSizeH4().fontSize + 4,
                    fontWeight: "500",
                  }}
                >
                  Details
                </ThemedText>
                <ThemedText
                  style={[
                    {
                      fontSize: fontSizeH4().fontSize + 2,
                      lineHeight: -1,
                      textAlign: "justify",
                      borderWidth: 0,
                    },
                    getMarginTop(2),
                  ]}
                >
                  {`We are seeking a detail-oriented freelancer to transcribe data from PDF files into Excel spreadsheets.
              \nThe ideal candidate will have experience in accurately converting text and tables, ensuring that all data is entered correctly and formatted appropriately. This project requires attention to detail and proficiency with both PDF and Excel. If you have a keen eye for detail and can work efficiently, we would love to hear from you!`}
                </ThemedText>
                <Animated.View
                  style={[
                    {
                      borderWidth: 0,
                    },
                    animatedStyle,
                  ]}
                >
                  <ThemedGradientView
                    style={{
                      paddingTop: getWidthnHeight(20)?.width,
                      borderWidth: 0,
                    }}
                    colors={["transparent", Colors[theme]["background"]]}
                    locations={[0, 0.6]} // Top color takes up 80% of the space
                    start={{ x: 0, y: 0 }} // Top
                    end={{ x: 0, y: 1 }} // Bottom
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0,
                      }}
                      onPress={() => setExpand(!expand)}
                    >
                      <ThemedText>{expand ? "More" : "Less"}</ThemedText>
                      <ThemedMaterialIcons
                        name={
                          expand ? "keyboard-arrow-down" : "keyboard-arrow-up"
                        }
                        colorType={"iconColor"}
                        size={getWidthnHeight(6)?.width}
                      />
                    </TouchableOpacity>
                  </ThemedGradientView>
                  <ThemedView>
                    <ThemedText
                      style={[
                        {
                          fontSize: fontSizeH4().fontSize + 4,
                          fontWeight: "500",
                        },
                        getMarginTop(3),
                      ]}
                    >
                      Offers
                    </ThemedText>
                    <ThemedView>
                      <View style={[{ alignItems: "center" }, getMarginTop(2)]}>
                        <Image
                          source={require("../../assets/offers.png")}
                          resizeMode="contain"
                          style={{
                            width: getWidthnHeight(40)?.width,
                            height: getWidthnHeight(40)?.width,
                          }}
                        />
                      </View>
                    </ThemedView>
                    <View style={{ borderWidth: 0 }}>
                      <FlatButton
                        colorType={"lightYellow"}
                        title="Make an offer"
                        onPress={() => {}}
                        style={{
                          borderRadius: getWidthnHeight(10)?.width,
                          alignSelf: "center",
                          paddingHorizontal: getWidthnHeight(10)?.width,
                        }}
                        textStyle={{
                          paddingVertical: getWidthnHeight(2)?.width,
                          fontSize: fontSizeH4().fontSize + 3,
                        }}
                      />
                    </View>
                  </ThemedView>
                </Animated.View>
              </ThemedView>
            </Animated.View>
          </View>
          <ThemedView
            colorType={"white"}
            style={[styles.shadow, getMarginVertical(2)]}
          >
            <View
              style={{
                padding: getWidthnHeight(2)?.width,
              }}
            >
              <ThemedText
                style={{
                  fontSize: fontSizeH4().fontSize + 4,
                  fontWeight: "500",
                }}
              >
                Cancellation policy
              </ThemedText>
              <ThemedText
                style={[
                  {
                    fontSize: fontSizeH4().fontSize + 2,
                    lineHeight: -1,
                    textAlign: "justify",
                    borderWidth: 0,
                  },
                  getMarginTop(2),
                ]}
              >
                {`If you are responsible for cancelling this task, a Cancellation Fee will be deducted from your next payment payout(s).`}
              </ThemedText>
            </View>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedSafe>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    borderRadius: getWidthnHeight(3)?.width,
    overflow: "hidden",
  },
});

export { TaskDetails };
