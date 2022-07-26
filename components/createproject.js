import React from "react";
import TSButton from "./tsbutton.js";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { redColor } from "../utilities/stylevars.js";
import { createNewProject } from "../utilities/ajax.js";
import { Text, TextInput, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", marginBottom: 10 },
  inputRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  input: {
    height: 40,
    width: 275,
    marginBottom: 5,
    padding: 5,
    fontSize: 18,
    fontFamily: "Epilogue",
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 8,
  },
});

const CreateProject = () => {
  const context = React.useContext(AppContext);

  const textValue = getStateValue(null);

  const createNewProj = () => {
    createNewProject(context, { name: textValue.value, user_token: context.userToken.value });
    textValue.set("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          onChangeText={textValue.set}
          value={textValue.value}
          placeholder="project name here"
          selectTextOnFocus={true}
          clearButtonMode="always"
        ></TextInput>
        <Ionicons name="close" size={30} color={redColor} />
      </View>
      <View>
        <TSButton
          label={"add project"}
          fontColor={"white"}
          functionOnPress={createNewProj}
          width={150}
          backgroundColor={redColor}
        ></TSButton>
      </View>
    </View>
  );
};

export default CreateProject;
