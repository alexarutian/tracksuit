import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { TextInput, StyleSheet, View } from "react-native";

const TSTextInput = ({ style, onChangeText, value, placeholder, clearButtonMode, width = 275 }) => {
  const context = React.useContext(AppContext);

  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: width,
      padding: 5,
      fontSize: 18,
      fontFamily: "Epilogue",
      backgroundColor: "white",
      borderRadius: 8,
    },
  });

  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      selectTextOnFocus={true}
      clearButtonMode={clearButtonMode ? "always" : "never"}
    ></TextInput>
  );
};

export default TSTextInput;
