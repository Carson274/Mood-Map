import { Text, View, Button } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from "react";

export default function MoodSlider() {
  const [mood, setMood] = useState(5);

  // https://addmood-fpfgzzqxca-uc.a.run.app

  function submitMood() {
    fetch('https://addmood-fpfgzzqxca-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood }),
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Adjust the slider to set your mood.</Text>
      <Text>Selected value: {mood}</Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={9}
        onValueChange={value => setMood(value)}
        step={1}
      />
      <Button
        title="Submit"
        color="#4b4b4b"
        onPress={() => submitMood()}
      />
    </View>
  );
}
