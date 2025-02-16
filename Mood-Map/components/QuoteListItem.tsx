import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Quote, CustomDate } from "../types";
import { PrettyDate } from "@/utilities/PrettyDate";

export default function DataListItem({ quote }: { quote: Quote }) {
  const [date, setDate] = useState<CustomDate>(PrettyDate(new Date(quote.timestamp)));

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timestampText}>
          {date.month.slice(0,3)} {String(date.day)}, {String(date.year)}
        </Text>
        <Text style={styles.timestampText}>
          {date.time}
        </Text>
      </View>
      <Text style={styles.quoteText}>
        "{quote.quote}"
      </Text>
      <Text style={styles.authorText}>
        - {quote.author}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "space-between",
  },
  bottomContainer: {
    marginTop: 20,
  },
  quoteText: {
    fontSize: 16,
    color: "black",
  },
  timeContainer: {
    flexDirection: "column",
    marginBottom: 10,
  },
  timestampText: {
    color: "black",
  },
  authorText: {
    fontSize: 16,
    color: "black",
    textAlign: "right",
    fontStyle: "italic",
  },
});