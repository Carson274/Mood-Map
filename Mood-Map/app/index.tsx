import { Text, View } from "react-native";
import MoodeSlider from "@/components/MoodSlider";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MoodeSlider />
    </View>
  );
}
