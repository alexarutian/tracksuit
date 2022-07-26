import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../utilities/stylevars.js";

const TSButton = ({
  label,
  backgroundColor = colors.redColor,
  fontColor = "white",
  width = 150,
  functionOnPress,
  borderWidth = 0,
  borderColor = 0,
  style = {},
}) => {
  const context = React.useContext(AppContext);

  const styles = StyleSheet.create({
    button: {
      height: 45,
      width: width,
      padding: 10,
      backgroundColor: backgroundColor,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: borderWidth,
      borderColor: borderColor,
    },
    buttonLabel: {
      color: fontColor,
      textAlign: "center",
      fontSize: 20,
      fontFamily: "Chicle",
      letterSpacing: 1.2,
    },
  });

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={functionOnPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TSButton;
