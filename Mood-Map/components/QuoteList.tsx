import { View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Quote } from "../types";
import QuoteListItem from "./QuoteListItem";

export default function DataList({ quotes }: { quotes: Quote[] }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {quotes.map((quote, index) => (
          <QuoteListItem key={index} quote={quote} />
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