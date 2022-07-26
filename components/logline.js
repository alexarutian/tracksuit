import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { lightBeigeColor } from "../utilities/stylevars.js";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const LogLine = ({ logItem }) => {
  const context = React.useContext(AppContext);

  const deleteLog = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.lineLeft}>
        <Text style={styles.date}>
          {logItem.day_of_week.substring(0, 3)} {logItem.date_string}
        </Text>
        <Text style={styles.projectName}>{logItem.project_name}</Text>
      </View>
      <Pressable onPress={deleteLog}>
        <FontAwesome name="trash" size={24} color={"gray"} />
      </Pressable>
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
  lineLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
  },
  date: { width: "50%", fontFamily: "Epilogue" },
  projectName: { width: "50%", fontFamily: "Epilogue" },
});

export default LogLine;
