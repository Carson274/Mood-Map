import { View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Mood } from "../types";
import DataListItem from "./DataListItem";

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

  const filteredMoods = moods.filter(mood => mood.mood >= 8);

  return (
    <View style={styles.container}>
      <ScrollView>
        {filteredMoods.map((mood, index) => (
          <DataListItem key={index} mood={mood} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 5,
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