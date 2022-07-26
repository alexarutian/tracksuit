import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { Text, StyleSheet } from "react-native";

const TSText = ({ fontSize = 14, bold = false, color = "black", font = "Epilogue", children }) => {
  const context = React.useContext(AppContext);

  if (bold && font == "Epilogue") {
    font = "EpilogueSemiBold";
  }

  const styles = StyleSheet.create({
    text: {
      fontSize: fontSize,
      fontFamily: font,
      color: color,
    },
  });

  return <Text style={styles.text}>{children}</Text>;
};

export default TSText;
