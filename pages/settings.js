import React from "react";

import LoginUser from "../components/loginuser.js";
import TSText from "../components/tstext.js";

import { greenColor, beigeColor, lightBeigeColor, leftFlexColumn } from "../utilities/stylevars.js";

import { AppContext } from "../contexts/appcontext.js";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.settingsSection}>
        <View style={styles.settingsHeader}>
          <Text style={styles.settingsHeaderText}>Settings</Text>
        </View>
        <View style={styles.settingsOption}>
          <TSText fontSize={16}>Archived Projects</TSText>
          <Ionicons name="chevron-forward" size={24} color={beigeColor} />
        </View>
      </View>
      <View style={styles.settingsSection}>
        <View style={styles.settingsHeader}>
          <Text style={styles.settingsHeaderText}>User Info</Text>
        </View>
        <TSText>
          You are currently logged in as <TSText bold>{context.email.value}</TSText>
        </TSText>
        <TSText>
          You have <TSText bold>{context.projectList.value.length}</TSText> active projects
        </TSText>
        <TSText>
          You have <TSText bold>{context.logList.value.length}</TSText> logs
        </TSText>
        <LoginUser></LoginUser>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    ...leftFlexColumn,
    fontFamily: "Epilogue",
  },
  settingsSection: {
    // borderWidth: 1,
    marginBottom: 8,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  settingsHeader: {
    marginBottom: 10,
  },
  settingsHeaderText: {
    fontFamily: "Chicle",

    fontSize: 24,
    color: greenColor,
  },
  settingsOption: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: lightBeigeColor,
    paddingLeft: 5,
  },
});

export default Settings;
