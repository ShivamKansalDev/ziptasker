import React, { useCallback, useEffect, useState, useRef } from "react";
import Checkbox from "expo-checkbox";
import {
  useColorScheme,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";
import * as _ from "lodash";
import moment from "moment";
import axios from "axios";
import * as Location from "expo-location";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";

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
  getMarginVertical,
  getWidthnHeight,
} from "../../../components/width";
import { Colors } from "../../../constants/Colors";
import { PrimaryInput } from "../../../components/PrimaryInput";
import { RoundedDropdown } from "../../../components/RoundedDropdown";
import { ThemedFeather } from "../../../components/ThemedFeather";
import { ThemedMaterialCommunityIcons } from "../../../components/ThemedMaterialCommunityIcon";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { Step2 } from "./Step2";
import { FlatButton } from "../../../components/Buttons/FlatButton";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { DateTimePicker } from "../../../components/DateTimePicker";
import { ThemedSafe } from "../../../components/ThemedSafe";
import { CustomBS } from "../../../components/BottomSheet/CustomBS";
import { ThemedBSView } from "../../../components/ThemedBSView";
import { ThemedAntDesign } from "../../../components/ThemedAntDesign";
import { IconTextInput } from "../../../components/IconTextInput";
import { ThemedEvilIcons } from "../../../components/ThemedEvilicons";
import { LocationTile } from "../../../components/LocationTile";
import { ThemedMaterialIcons } from "../../../components/ThemedMaterialIcon";

type CreateTaskRouteProp = RouteProp<DrawerStackParamList, "createTask">;

const totalSteps = 4;

const apiKey = "AIzaSyDVRsp7LueqZB-lS1fP5RaKeUwGLB6U8rY";
interface Location {
  lat: number;
  lng: number;
}
export interface Place {
  description: string;
  placeId: string | undefined;
  location: Location | undefined;
}

export type LocationDetails = {
  description: string | undefined;
  place_id: string | undefined;
};

const GOOGLE = "google";

const CreateTask: React.FC = () => {
  const currentTimeStamp = moment().valueOf();
  const route = useRoute<CreateTaskRouteProp>();
  const navigation = useNavigation<DrawerNavProp>();
  const theme = useColorScheme() ?? "light";
  const [step, setStep] = useState<number>(1);

  const [checked, setChecked] = useState<boolean>(false);
  const [showOnDate, setShowOnDate] = useState<boolean>(false);
  const [showBeforeDate, setShowBeforeDate] = useState<boolean>(false);
  const [onDate, setOnDate] = useState<string | null>(null);
  const [beforeDate, setBeforeDate] = useState<string | null>(null);
  const [flexibleTimings, setFlexibleTimings] = useState<boolean>(false);
  const [fromTimeStamp, setFromTimeStamp] = useState(currentTimeStamp);
  const [toTimeStamp, setToTimeStamp] = useState(currentTimeStamp);
  const [taskTitle, setTaskTitle] = useState<string | undefined>(undefined);
  const [certainTime, setCertainTime] = useState<string | null>(null);

  const [step1Error, setStep1Error] = useState<boolean>(true);
  const [submitStep1, setSubmitStep1] = useState<boolean>(false);
  const [step1DateError, setStep1DateError] = useState<boolean>(true);

  const [selected, setSelected] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [searchText, setSearchText] = useState<string | undefined>("");
  const [locations, setLocations] = useState<LocationDetails[]>([]);
  const [submitStep2, setSubmitStep2] = useState<boolean>(false);
  const locationInputRef = useRef<TextInput>(null);

  const googleSearchRef = useRef<BottomSheetModal>(null);

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

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    if (location?.coords?.latitude) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${apiKey}`
        );
        const data = response.data;
        if (Array.isArray(data?.results)) {
          const result = data.results[0];
          const address = result.formatted_address;
          const placeId = result.place_id;
          console.log("$$$ GEOCODING RESPONSE: ", address, placeId);
          setSelectedLocation({
            description: address,
            placeId: placeId,
            location: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            },
          });
          closeBottomSheet();
        }
      } catch (error) {
        console.error("Error in reverse geocoding:", error);
      }
    }
  }

  function focusLocationInput() {
    locationInputRef.current?.focus();
  }

  function openBottomSheet(type = GOOGLE) {
    if (type === GOOGLE) {
      console.log("@@@ CALL");
      googleSearchRef.current?.present();
    }
  }

  function closeBottomSheet(type = GOOGLE) {
    if (type === GOOGLE) {
      googleSearchRef.current?.close();
    }
  }

  const fetchResults = async (searchQuery: string) => {
    try {
      if (!searchQuery) {
        return;
      }
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&types=geocode&key=${apiKey}`
      );
      const data = response.data;
      const predictions = data?.predictions;
      if (Array.isArray(predictions)) {
        const extractDetails = predictions.map((item) => ({
          description: item?.description,
          place_id: item?.place_id,
        }));
        setLocations(extractDetails);
        // console.log("@@@ RESPONSE: ", JSON.stringify(extractDetails, null, 4));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debouncedFetchResults = useCallback(
    _.debounce((text) => fetchResults(text), 1000), // 1000ms debounce delay
    []
  );

  async function fetchLocationCoords(item: LocationDetails) {
    try {
      if (!item?.place_id) {
        return;
      }
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${apiKey}`;
      console.log("$$$ LOCATION URL: ", url);
      const response = await axios.get(url);
      const data = response.data;
      // console.log("@@@ RESPONSE: ", JSON.stringify(data, null, 4));
      const location: Location = data?.result?.geometry?.location;
      if (location) {
        const locationData = {
          description: item.description!,
          placeId: item.place_id!,
          location: location,
        };
        setSelectedLocation(locationData);
        closeBottomSheet();
        console.log("@@@ RESPONSE: ", JSON.stringify(locationData, null, 4));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (route.params?.title) {
      setTaskTitle(route.params.title);
    }
  }, []);

  useEffect(() => {
    checkStep1ForErrors();
  }, [
    onDate,
    beforeDate,
    flexibleTimings,
    taskTitle,
    submitStep1,
    checked,
    certainTime,
  ]);

  useEffect(() => {
    if (!searchText) {
      setLocations([]);
    }
  }, [searchText]);

  function checkStep1ForErrors() {
    const dateBoolean = (!!onDate || !!beforeDate || flexibleTimings) === false;
    setStep1DateError(dateBoolean);
    // console.log(
    //   "!!! DATE BOOLEAN: ",
    //   !!onDate,
    //   !!beforeDate,
    //   flexibleTimings,
    //   dateBoolean
    // );
    if (!taskTitle || dateBoolean || (checked && !certainTime)) {
      setStep1Error(true);
    } else {
      setStep1Error(false);
    }
  }

  return (
    <ThemedSafe style={{ flex: 1 }}>
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
        style={[{ paddingHorizontal: getWidthnHeight(4)?.width }, fontSizeH4()]}
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
                  // lineHeight: -1,
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
                    borderWidth:
                      theme === "light"
                        ? submitStep1 && !taskTitle
                          ? 1
                          : 0
                        : 1,
                    borderColor:
                      submitStep1 && !taskTitle
                        ? Colors[theme]["red"]
                        : Colors[theme]["iconColor"],
                  },
                  getMarginTop(1.5),
                ]}
              >
                <PrimaryInput
                  containerStyle={{
                    backgroundColor: "transparent",
                  }}
                  numberOfLines={1}
                  value={taskTitle}
                  style={{
                    fontSize: fontSizeH4().fontSize + 4,
                    marginVertical: getWidthnHeight(4)?.width,
                    marginHorizontal: getWidthnHeight(4)?.width,
                  }}
                  placeholder="eg. Help me move sofa"
                  placeholderTextColor={"darkGray"}
                  onChangeText={(text) => setTaskTitle(text)}
                />
                {submitStep1 && !taskTitle && (
                  <View>
                    <ThemedText
                      style={{
                        position: "absolute",
                        color: Colors[theme]["red"],
                        fontSize: fontSizeH4().fontSize - 1,
                      }}
                    >
                      *Task title is required
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>
            <View style={[getMarginTop(3)]}>
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
                    // borderWidth: 1,
                    // borderColor: "transparent",
                  },
                  getMarginTop(2),
                ]}
              >
                <View>
                  <RoundedDropdown
                    title={onDate ?? "On date"}
                    onPress={() => setShowOnDate(true)}
                    titleStyle={{
                      fontSize: fontSizeH4().fontSize + (onDate ? 1 : 3),
                    }}
                    style={{
                      borderWidth: 2,
                      borderColor: Colors[theme]["iconColor"],
                      paddingHorizontal: getWidthnHeight(3)?.width,
                      paddingVertical: getWidthnHeight(1)?.width,
                      borderRadius: getWidthnHeight(10)?.width,
                      backgroundColor: onDate
                        ? Colors[theme]["yellow"]
                        : "transparent",
                    }}
                  />
                  {showOnDate && (
                    <View>
                      <DateTimePicker
                        value={moment(fromTimeStamp).utc().toDate()}
                        display="default"
                        minimumDate={moment(currentTimeStamp).utc().toDate()}
                        onChange={(event, date) => {
                          if (event.type === "dismissed") {
                            setShowOnDate(!showOnDate);
                            return;
                          }
                          setFlexibleTimings(false);
                          const timeStamp = event.nativeEvent.timestamp;
                          setFromTimeStamp(timeStamp);
                          if (Platform.OS === "android") {
                            setShowOnDate(!showOnDate);
                            setOnDate(moment(date).format("ddd DD,MMM"));
                            if (fromTimeStamp > toTimeStamp) {
                              setBeforeDate(null);
                            }
                          }
                          Keyboard.dismiss();
                        }}
                      />
                    </View>
                  )}
                </View>
                <View>
                  <RoundedDropdown
                    title={beforeDate ?? "Before date"}
                    onPress={() => setShowBeforeDate(true)}
                    titleStyle={{
                      fontSize: fontSizeH4().fontSize + (beforeDate ? 1 : 3),
                    }}
                    style={{
                      borderWidth: 2,
                      borderColor: Colors[theme]["iconColor"],
                      paddingHorizontal: getWidthnHeight(3)?.width,
                      paddingVertical: getWidthnHeight(1)?.width,
                      borderRadius: getWidthnHeight(10)?.width,
                      backgroundColor: beforeDate
                        ? Colors[theme]["yellow"]
                        : "transparent",
                    }}
                  />
                  {showBeforeDate && (
                    <View>
                      <DateTimePicker
                        value={moment(toTimeStamp).utc().toDate()}
                        display="default"
                        minimumDate={moment(fromTimeStamp).utc().toDate()}
                        onChange={(event, date) => {
                          if (event.type === "dismissed") {
                            setShowBeforeDate(!showBeforeDate);
                            return;
                          }
                          setFlexibleTimings(false);
                          const timeStamp = event.nativeEvent.timestamp;
                          setToTimeStamp(timeStamp);
                          if (Platform.OS === "android") {
                            setShowBeforeDate(!showBeforeDate);
                            setBeforeDate(moment(date).format("ddd DD,MMM"));
                          }
                          Keyboard.dismiss();
                        }}
                      />
                    </View>
                  )}
                </View>
                <RoundedDropdown
                  title={"I'm flexible"}
                  onPress={() => {
                    setOnDate(null);
                    setBeforeDate(null);
                    setFlexibleTimings(true);
                  }}
                  iconSize={null}
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 3,
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: Colors[theme]["iconColor"],
                    backgroundColor: flexibleTimings
                      ? Colors[theme]["yellow"]
                      : "transparent",
                    paddingHorizontal: getWidthnHeight(3)?.width,
                    paddingVertical: getWidthnHeight(1.5)?.width,
                    borderRadius: getWidthnHeight(10)?.width,
                  }}
                />
              </View>
              {submitStep1 && step1DateError && (
                <View>
                  <ThemedText
                    style={{
                      position: "absolute",
                      color: Colors[theme]["red"],
                      fontSize: fontSizeH4().fontSize - 1,
                    }}
                  >
                    *Date is required
                  </ThemedText>
                </View>
              )}
              <View
                style={[
                  { flexDirection: "row", alignItems: "center" },
                  getMarginTop(3),
                ]}
              >
                <Checkbox
                  value={checked}
                  onValueChange={() => {
                    if (checked) {
                      setCertainTime(null);
                    }
                    setChecked(!checked);
                  }}
                />
                <ThemedText style={getMarginLeft(3)}>
                  I need certain time of day
                </ThemedText>
              </View>
            </View>
            {checked && submitStep1 && !certainTime && (
              <View>
                <ThemedText
                  style={{
                    position: "absolute",
                    color: Colors[theme]["red"],
                    fontSize: fontSizeH4().fontSize - 1,
                  }}
                >
                  *Please select certain time
                </ThemedText>
              </View>
            )}
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
                    let backgroundColor = `${Colors[theme]["gradeOut"]}E0`;
                    if (item.id === certainTime) {
                      backgroundColor = `${Colors[theme]["yellow"]}E0`;
                    }
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
                          onPress={() => setCertainTime(item.id)}
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
        {step === 2 && (
          <Step2
            selected={selected}
            setSelected={setSelected}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            submitStep2={submitStep2}
            openBottomSheet={() => openBottomSheet()}
          />
        )}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </View>
      <View>
        {step === 1 && (
          <FlatButton
            lightColor={Colors[theme]["yellow"]}
            darkColor={Colors[theme]["yellow"]}
            title="Next"
            onPress={() => {
              setSubmitStep1(true);
              if (!step1Error) {
                setStep(step + 1);
              }
              // if (taskTitle && (onDate || beforeDate || flexibleTimings)) {
              //   if (checked) {
              //     if (certainTime) {
              //       setStep(step + 1);
              //     }
              //   } else {
              //     setStep(step + 1);
              //   }
              // }
            }}
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
                  onPress={() => {
                    if (step === 2) {
                      setSubmitStep2(true);
                      if (selectedLocation) {
                        setStep(step + 1);
                      }
                    }
                  }}
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
        <CustomBS
          ref={googleSearchRef}
          onOpen={focusLocationInput}
          snapPoints={["85%"]}
          bsStyle={{
            borderTopLeftRadius: getWidthnHeight(5)?.width,
            borderTopRightRadius: getWidthnHeight(5)?.width,
            // borderWidth: 4,
          }}
          handleComponent={() => (
            <View style={[{ alignItems: "center" }, getMarginTop(-7)]}>
              <View
                style={{
                  width: getWidthnHeight(10)?.width,
                  height: getWidthnHeight(10)?.width,
                  borderRadius: getWidthnHeight(5)?.width,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ThemedAntDesign
                  name={"close"}
                  onPress={() => closeBottomSheet()}
                  colorType={"white"}
                  size={getWidthnHeight(6)?.width}
                />
              </View>
            </View>
          )}
        >
          <View
            style={[
              { flex: 1, alignItems: "center", borderWidth: 0 },
              getWidthnHeight(100),
            ]}
          >
            <IconTextInput
              ref={locationInputRef}
              value={searchText}
              onChangeText={(text) => {
                const value = text.trimStart();
                setSearchText(value);
                debouncedFetchResults(value);
              }}
              onClear={() => {
                setSearchText("");
                setLocations([]);
              }}
              containerStyle={[
                { width: "90%", borderWidth: 0 },
                getMarginVertical(2),
              ]}
              icon={
                <ThemedIonicons
                  name="location"
                  colorType={"iconColor"}
                  size={getWidthnHeight(7)?.width}
                />
              }
              placeholder="Enter your postcode"
              placeholderTextColor={"darkGray"}
              style={{
                flex: 1,
                paddingHorizontal: getWidthnHeight(3)?.width,
                marginVertical: getWidthnHeight(2)?.width,
                marginHorizontal: getWidthnHeight(1)?.width,
                fontSize: fontSizeH4().fontSize + 5,
                height: "100%",
              }}
            />
            <View
              style={[{ alignItems: "center", borderWidth: 0, width: "100%" }]}
            >
              <BottomSheetFlatList
                data={locations}
                style={[{ width: "90%" }]}
                keyExtractor={(item) => item.place_id!}
                ListFooterComponent={() => (
                  <LocationTile
                    icon={
                      <ThemedMaterialIcons
                        name="my-location"
                        colorType={"iconColor"}
                        size={getWidthnHeight(7)?.width}
                      />
                    }
                    item={{
                      description: "Use current location",
                      place_id: "none",
                    }}
                    onPress={getCurrentLocation}
                  />
                )}
                renderItem={({ item }) => {
                  return (
                    <LocationTile
                      item={item}
                      onPress={() => fetchLocationCoords(item)}
                    />
                  );
                }}
              />
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  getMarginTop(1),
                ]}
              >
                <ThemedText
                  lightColor={Colors.light.black}
                  darkColor={Colors.dark.white}
                >
                  Powered by
                </ThemedText>
                <Image
                  source={require("../../../assets/google2.png")}
                  resizeMode="contain"
                  style={[
                    {
                      width: getWidthnHeight(15)?.width,
                      height: "100%",
                    },
                    getMarginTop(0.4),
                  ]}
                />
              </View>
            </View>
          </View>
        </CustomBS>
      </View>
    </ThemedSafe>
  );
};

export { CreateTask };
