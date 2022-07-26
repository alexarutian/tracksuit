import React from "react";
import TSText from "../components/tstext.js";
import { AppContext } from "../contexts/appcontext.js";
import { colors } from "../utilities/stylevars.js";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

const GreetingsLine = () => {
  const context = React.useContext(AppContext);

  const todayDate = new Date().toLocaleDateString();
  const todayTime = new Date().toLocaleTimeString();

  let greetingString = "";

  if (todayTime.endsWith("AM")) {
    greetingString = "Good morning";
  } else if (todayTime.endsWith("PM") && todayTime[0] >= 6) {
    greetingString = "Good evening";
  } else {
    greetingString = "Hello";
  }

  return (
    <View style={styles.container}>
      <TSText>
        You are currently working on{" "}
        <TSText bold color={colors.redColor}>
          {context.currentProjectName.value}
        </TSText>
      </TSText>
    </View>
  );
};

export default GreetingsLine;
