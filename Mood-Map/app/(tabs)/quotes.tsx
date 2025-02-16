import { SafeAreaView } from "react-native";
import QuoteList from "@/components/QuoteList";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Quote } from "../../types";
import { useEffect, useState } from "react";

export default function Quotes() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const userID = "carpetID";

  function getMoods() {
    fetch(`https://getquotes-fpfgzzqxca-uc.a.run.app?userID=${encodeURIComponent(userID)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setQuotes(data);
    });
  }

  useEffect(() => {
    getMoods();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <QuoteList quotes={quotes} />
    </SafeAreaView>
  );
}
