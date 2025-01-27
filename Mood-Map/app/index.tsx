import { Text, View } from "react-native";
import MoodeSlider from "@/components/MoodSlider";
import DataList from "@/components/DataList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DataList />
      <MoodeSlider />
    </View>
  );
}
