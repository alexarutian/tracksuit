import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { goldColor, greenColor, lightBeigeColor, beigeColor, redColor } from "../utilities/stylevars.js";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const NavigationBar = ({ options }) => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.navPane}>
      {options.map((option, idx) => (
        <TouchableOpacity
          style={styles.navButton}
          key={idx}
          item={option}
          onPress={() => {
            context.currentPage.set(option.name);
          }}
        >
          <Text style={context.currentPage.value == option.name ? styles.activeButtonLabel : styles.buttonLabel}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const navButtonStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 24,
  letterSpacing: 1.2,
  fontFamily: "Chicle",
};

const styles = StyleSheet.create({
  navPane: {
    height: 80,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: beigeColor,
  },
  navButton: {
    height: 50,
    width: 100,
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightBeigeColor,
  },
  buttonLabel: {
    ...navButtonStyle,
    color: goldColor,
  },
  activeButtonLabel: {
    ...navButtonStyle,
    color: redColor,
    textDecorationColor: redColor,
    textDecorationStyle: "dotted",
    textDecorationLine: "underline",
  },
});

export default NavigationBar;
