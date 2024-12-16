import React, { useEffect } from "react";
import { FlatList, useColorScheme, View } from "react-native";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { ThemedView } from "../../components/ThemedView";
import { ThemedSafe } from "../../components/ThemedSafe";
import { TaskCard } from "../../components/TaskCard";
import { fontSizeH3, getWidthnHeight } from "../../components/width";
import { BrowseStackNavigationProps } from ".";
import { Colors } from "../../constants/Colors";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";

const BrowseTasks: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const navigation = useNavigation<BrowseStackNavigationProps>();
  const data = [
    {
      id: "1",
      title: "PDF to Excel",
    },
    {
      id: "2",
      title: "MS Word",
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerTitle: "Browse Tasks",
      headerTitleStyle: {
        fontFamily: "DancingScript_700Bold",
        fontSize: fontSizeH3().fontSize + 4,
        color: Colors[theme]["iconColor"],
      },
      headerTitleAlign: "left",
      headerRight: () => (
        <ThemedAntDesign
          onPress={() => navigation?.navigate("notifications")}
          name={"bells"}
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
        />
      ),
    });
  }, []);

  return (
    <ThemedSafe style={{ flex: 1 }}>
      <ThemedView colorType={"screenBG"} style={{ flex: 1, borderWidth: 0 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View
                style={[
                  {
                    paddingHorizontal: getWidthnHeight(3)?.width,
                    paddingVertical: getWidthnHeight(2)?.width,
                    borderWidth: 1,
                    borderColor: "transparent",
                  },
                ]}
              >
                <TaskCard
                  onPress={() =>
                    navigation.navigate("taskDetails", {
                      details: item,
                    })
                  }
                />
              </View>
            );
          }}
        />
      </ThemedView>
    </ThemedSafe>
  );
};

export { BrowseTasks };
