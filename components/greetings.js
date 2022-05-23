import React from "react";
import CurrentProjectContext from "../contexts/currentprojectcontext.js";
import { Text, TouchableOpacity, View } from "react-native";

const Greetings = ({ name }) => {
  const todayDate = new Date().toLocaleDateString();
  const todayTime = new Date().toLocaleTimeString();

  let greetingString = "";
  let currentProject = "dumb stuff";

  if (todayTime.endsWith("AM")) {
    greetingString = "Good morning";
  } else if (todayTime.endsWith("PM") && todayTime[0] >= 6) {
    greetingString = "Good evening";
  } else {
    greetingString = "Hello";
  }

  return (
    <View style={{ flex: 1, direction: "column", justifyContent: "center" }}>
      <Text>
        {greetingString}, {name}!
      </Text>
      {/* <Text>{todayTime}</Text> */}
      <CurrentProjectContext.Consumer>
        {(currentProjectObject) => {
          return <Text>You are currently working on {currentProjectObject.value}</Text>;
        }}
      </CurrentProjectContext.Consumer>
    </View>
  );
};

export default Greetings;
