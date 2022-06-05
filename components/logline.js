import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { lightBeigeColor } from "../utilities/stylevars.js";
import { Text, View, StyleSheet, Pressable } from "react-native";

const LogLine = ({ logItem }) => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={{ width: "25%", fontFamily: "Epilogue" }}>{logItem.date_string}</Text>
      <Text style={{ width: "40%", fontFamily: "Epilogue" }}>{logItem.project_name}</Text>
      <Text style={{ fontFamily: "Epilogue" }}>{logItem.hours} hrs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: lightBeigeColor,
  },
});

export default LogLine;
