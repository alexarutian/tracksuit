import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { redColor } from "../utilities/stylevars.js";
import { Text, View, StyleSheet } from "react-native";

const Greetings = ({ name }) => {
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
      <Text style={{ fontFamily: "Epilogue" }}>
        {greetingString}, <Text style={{ fontFamily: "EpilogueSemiBold" }}>{name}</Text>!
      </Text>
      {/* <Text>{todayTime}</Text> */}
      <Text style={{ fontFamily: "Epilogue" }}>
        You are currently working on{" "}
        <Text style={{ fontWeight: "bold", color: redColor, fontFamily: "EpilogueSemiBold" }}>
          {context.currentProjectName.value}
        </Text>
      </Text>
      {/* <Text>{context.userToken.value}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default Greetings;
