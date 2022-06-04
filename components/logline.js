import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { Text, View, StyleSheet, Pressable } from "react-native";

const LogLine = ({ logItem }) => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={{ width: "40%" }}>{logItem.project_name}</Text>
      <Text style={{ width: "25%" }}>{logItem.date_string}</Text>
      <Text>{logItem.hours} hours</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginBottom: 5,
  },
});

export default LogLine;
