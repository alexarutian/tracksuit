import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { colors } from "../utilities/stylevars.js";
import { View, StyleSheet } from "react-native";
import TSIconButton from "./tsiconbutton.js";
import TSText from "./tstext.js";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBeigeColor,
  },
  lineLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
  },
  date: { width: "50%" },
  projectName: { width: "50%" },
});

const LogLine = ({ logItem }) => {
  const context = React.useContext(AppContext);

  const deleteLog = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.lineLeft}>
        <TSText style={styles.date}>
          {logItem.day_of_week.substring(0, 3)} {logItem.date_string}
        </TSText>
        <TSText style={styles.projectName}>{logItem.project_name}</TSText>
      </View>
      <TSIconButton onPress={deleteLog} iconProvider="FontAwesome" iconName="trash" iconColor={"gray"} />
    </View>
  );
};

export default LogLine;
