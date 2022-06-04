import React from "react";

import LoginUser from "../components/loginuser.js";
import { greenColor } from "../utilities/stylevars.js";

import { AppContext } from "../contexts/appcontext.js";
import { StyleSheet, View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

const User = () => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeader}>Settings</Text>
        <Slider
          containerStyle={styles.sliderContainer}
          value={context.defaultHours.value}
          minimumValue={1}
          maximumValue={16}
          onValueChange={(value) => context.defaultHours.set(value)}
          step={0.5}
        ></Slider>
        <Text>{context.defaultHours.value}</Text>
      </View>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeader}>User Info</Text>
        <Text>
          You are currently logged in as <Text style={{ fontFamily: "EpilogueSemiBold" }}>{context.email.value}</Text>
        </Text>
        <Text>
          You have <Text style={{ fontFamily: "EpilogueSemiBold" }}>{context.projectList.value.length}</Text> active
          projects
        </Text>
        <LoginUser></LoginUser>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "column",
    justifyContent: "flex-start",
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
    fontFamily: "Chicle",
    fontSize: 24,
    color: greenColor,
  },
  sliderContainer: {
    width: "75%",
  },
});

export default User;
