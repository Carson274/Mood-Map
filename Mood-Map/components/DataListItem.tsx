import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Mood, CustomDate } from "../types";
import { PrettyDate } from "@/utilities/PrettyDate";

export default function DataListItem({ mood }: { mood: Mood }) {
  const [date, setDate] = useState<CustomDate>(PrettyDate(new Date(mood.timestamp)));

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timestampText}>
            {date.month.slice(0,3)} {String(date.day)}, {String(date.year)}
          </Text>
          <Text style={styles.timestampText}>
            {date.time}
          </Text>
        </View>
      </View>
      <Text>{mood.mood}</Text>
      <Text>{mood.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginVertical: 5,
    // borderBottomColor: "#0000000F",
    // borderBottomWidth: 1,
    backgroundColor: "black",
    borderRadius: 20,

  },
  topContainer: {
    flexDirection: "row",
  },
  timeContainer: {
    flexDirection: "column",
  },
  timestampText: {
    color: "white",
  },
});