import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { goldColor, greenColor, lightBeigeColor, beigeColor, redColor } from "../utilities/stylevars.js";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const NavigationBar = ({ options }) => {
  const context = React.useContext(AppContext);

  const clicked = (page) => {
    // alert("hello!");
    context.currentPage.set(page);
  };

  return (
    <View style={styles.navPane}>
      {options.map((option, idx) => (
        <TouchableOpacity
          style={styles.navButton}
          key={idx}
          item={option}
          onPress={() => {
            clicked(option.name);
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

const styles = StyleSheet.create({
  navPane: {
    height: 80,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: beigeColor,
  },
  navButton: {
    height: 50,
    width: 85,
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightBeigeColor,
  },
  buttonLabel: {
    color: goldColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    letterSpacing: 1.2,
    fontFamily: "Chicle",
  },
  activeButtonLabel: {
    color: redColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    letterSpacing: 1.2,
    fontFamily: "Chicle",
    textDecorationColor: redColor,
    textDecorationStyle: "dotted",
    textDecorationLine: "underline",
  },
});

export default NavigationBar;
