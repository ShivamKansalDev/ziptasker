import React, { ReactNode, useEffect, useState } from "react";
import {
  useColorScheme,
  View,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { JobTypeBox } from "../../../components/JobTypeBox";
import { Colors } from "../../../constants/Colors";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "../../../components/width";
import { ThemedText } from "../../../components/ThemedText";
import { IconTextInput } from "../../../components/IconTextInput";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { AddImageButton } from "../../../components/Buttons/AddImageButton";
import { ThemedView } from "../../../components/ThemedView";

interface ImageContainerProps {
  uri: string;
}

const Step3: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const [details, setDetails] = useState<string | undefined>("");
  const [images, setImages] = useState<string[] | undefined>(undefined);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.5,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;

      // Use Set to ensure no duplicates
      const updatedImages = Array.from(
        new Set([...(images || []), newImageUri])
      );

      //   console.log("^^^ Updated IMAGES: ", updatedImages);
      setImages(updatedImages);
    }
  };

  const ImageContainer: React.FC<ImageContainerProps> = ({ uri }) => {
    return (
      <View style={{ alignItems: "flex-end" }}>
        <ThemedView
          style={[
            {
              width: getWidthnHeight(20)?.width,
              height: getWidthnHeight(20)?.width,
            },
            getMarginBottom(1),
          ]}
        >
          <Image
            source={{ uri }}
            resizeMode="cover"
            style={{
              borderRadius: getWidthnHeight(2)?.width,
              flex: 1,
            }}
          />
        </ThemedView>
        <View style={[StyleSheet.absoluteFillObject]}>
          <ThemedIonicons
            colorType={"iconColor"}
            name={"close-circle"}
            size={getWidthnHeight(8)?.width}
            style={{}}
          />
        </View>
      </View>
    );
  };

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
        Provide more details
      </ThemedText>
      <View
        style={[
          {
            borderWidth: 0,
          },
        ]}
      >
        <ThemedText
          style={[
            { fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" },
            getMarginTop(4),
          ]}
        >
          What are the details ?
        </ThemedText>

        <View style={[getMarginTop(1.5)]}>
          <IconTextInput
            value={details}
            onChangeText={(text) => setDetails(text.trimStart())}
            icon={null}
            multiline
            numberOfLines={5}
            placeholder="Write a summary of the key details"
            placeholderTextColor={Colors[theme]["darkGray"]}
            style={{
              flex: 1,
              borderWidth: 0,
              height: getWidthnHeight(32)?.width,
              textAlignVertical: "top",
              paddingHorizontal: getWidthnHeight(0)?.width,
              marginHorizontal: getWidthnHeight(1)?.width,
              fontSize: fontSizeH4().fontSize + 4,
            }}
          />
        </View>
      </View>
      <View
        style={[
          { flexDirection: "row", alignItems: "center", width: "100%" },
          getMarginTop(4),
        ]}
      >
        <ThemedText
          style={[{ fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" }]}
        >
          Add images
        </ThemedText>
        <ThemedText
          style={[{ fontSize: fontSizeH4().fontSize + 4 }, getMarginLeft(1)]}
        >
          (optional)
        </ThemedText>
      </View>
      <View style={[getMarginTop(3)]}>
        <FlatList
          data={images}
          keyExtractor={(item) => item}
          numColumns={3}
          ListFooterComponent={() => <AddImageButton onPress={pickImage} />}
          renderItem={({ item }) => {
            console.log("@@@ ITEM: ", item);
            return <ImageContainer uri={item} />;
          }}
        />
      </View>
    </View>
  );
};

export { Step3 };
