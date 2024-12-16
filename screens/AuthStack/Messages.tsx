import React from "react";
import { ThemedSafe } from "../../components/ThemedSafe";
import { ThemedView } from "../../components/ThemedView";
import { getWidthnHeight } from "../../components/width";
import { ThemedText } from "../../components/ThemedText";

const Messages: React.FC = () => {
  return (
    <ThemedSafe style={{ flex: 1 }}>
      <ThemedView
        colorType={"screenBG"}
        style={{ flex: 1, paddingHorizontal: getWidthnHeight(3)?.width }}
      >
        <ThemedText>Messages</ThemedText>
      </ThemedView>
    </ThemedSafe>
  );
};

export { Messages };
