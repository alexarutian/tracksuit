import React from "react";
import LoginUser from "../components/loginuser.js";
import TSText from "../components/tstext.js";
import TSIconButton from "../components/tsiconbutton.js";
import { colors, leftFlexColumn } from "../utilities/stylevars.js";
import { AppContext } from "../contexts/appcontext.js";
import { StyleSheet, View } from "react-native";

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

  settingsOption: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: colors.lightBeigeColor,
    paddingLeft: 5,
  },
});

const Settings = () => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.settingsSection}>
        <View style={styles.settingsHeader}>
          <TSText fontSize={24} font="Chicle" color={colors.greenColor}>
            Settings
          </TSText>
        </View>
        <View style={styles.settingsOption}>
          <TSText fontSize={16}>Archived Projects</TSText>
          <TSIconButton iconProvider="Ionicons" iconName="chevron-forward" onPress={() => {}} />
        </View>
      </View>
      <View style={styles.settingsSection}>
        <View style={styles.settingsHeader}>
          <TSText fontSize={24} font="Chicle" color={colors.greenColor}>
            User Info
          </TSText>
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

export default Settings;
