import React from "react";

import LogLine from "../components/logline.js";
import { redColor, lightBeigeColor, goldColor } from "../utilities/stylevars.js";

import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";

import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";

const Logs = () => {
  const context = React.useContext(AppContext);

  const mode = getStateValue("date");

  const toggleToByDate = () => {
    mode.set("date");
  };
  const toggleToByProject = () => {
    mode.set("project");
  };

  return (
    <View style={styles.container}>
      <View style={styles.modeButtons}>
        <TouchableOpacity style={styles.optionButton} onPress={toggleToByDate}>
          <Text style={styles.optionButtonLabel}>Sort by Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={toggleToByProject}>
          <Text style={styles.optionButtonLabel}>Sort by Project</Text>
        </TouchableOpacity>
      </View>
      {mode.value == "date" && (
        <ScrollView style={styles.logList}>
          {context.logList.value.map((item, idx) => (
            <LogLine key={idx} logItem={item}></LogLine>
          ))}
        </ScrollView>
      )}
      {mode.value == "project" && (
        <ScrollView style={styles.logList}>
          {context.logListByProject.value.map((item, idx) => (
            <LogLine key={idx} logItem={item}></LogLine>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
  },
  logList: {
    backgroundColor: "white",
    borderRadius: 8,
  },

  optionButton: {
    height: 45,
    width: 150,
    padding: 10,
    margin: 10,
    marginTop: 0,
    backgroundColor: redColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: goldColor,
  },
  optionButtonLabel: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Chicle",
    letterSpacing: 1.2,
  },
  modeButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default Logs;
