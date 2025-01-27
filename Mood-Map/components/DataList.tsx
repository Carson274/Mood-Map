import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Mood } from "../types";
import { PrettyDate } from "@/utilities/PrettyDate";

export default function DataList() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const userID = "carpetID";

  function getMoods() {
    fetch(`https://getmoods-fpfgzzqxca-uc.a.run.app?userID=${encodeURIComponent(userID)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setMoods(data);
    });
  }

  useEffect(() => {
    getMoods();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {moods.map((mood, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{mood.mood}</Text>
            <Text>{mood.description}</Text>
            <Text style={styles.timestampText}>
              Timestamp: {PrettyDate(new Date(mood.timestamp))}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    borderBottomColor: "#0000000F",
    borderBottomWidth: 1,
  },
  timestampText: {
    fontStyle: "italic",
    color: "gray",
  },
});