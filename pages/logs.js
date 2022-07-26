import React from "react";
import LogLine from "../components/logline.js";
import TSButton from "../components/tsbutton.js";
import { colors } from "../utilities/stylevars.js";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { StyleSheet, View, ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "95%",
  },
  logList: {
    backgroundColor: "white",
    borderRadius: 8,
  },
  optionButton: {
    width: 150,
    padding: 10,
    margin: 10,
    marginTop: 0,
    backgroundColor: colors.redColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: goldColor,
  },

  modeButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

const Logs = () => {
  const context = React.useContext(AppContext);

  const mode = getStateValue("date");
  const toggleToByDate = () => {
    mode.set("date");
  };
  const toggleToByProject = () => {
    mode.set("project");
  };

  // list itself changes based on the sort mode
  let logList = mode.value == "date" ? context.logList : context.logListByProject;

  return (
    <View style={styles.container}>
      <View style={styles.modeButtons}>
        <TSButton label="Sort by Date" fontColor="white" functionOnPress={toggleToByDate} style={styles.optionButton} />
        <TSButton
          label="Sort by Project"
          fontColor="white"
          functionOnPress={toggleToByProject}
          style={styles.optionButton}
        />
      </View>
      <ScrollView style={styles.logList}>
        {logList.value.map((item, idx) => (
          <LogLine key={idx} logItem={item}></LogLine>
        ))}
      </ScrollView>
    </View>
  );
};

export default Logs;
