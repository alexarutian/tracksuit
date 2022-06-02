import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { redColor } from "../utilities/stylevars.js";
import { createNewProject } from "../utilities/ajax.js";
import { Text, TextInput, StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";

const CreateProject = () => {
  const context = React.useContext(AppContext);

  const textValue = getStateValue(null);

  const createNewProj = () => {
    createNewProject(context, { name: textValue.value, user_token: context.userToken.value });
    textValue.set("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={textValue.set}
        value={textValue.value}
        placeholder="project name here"
        selectTextOnFocus={true}
        clearButtonMode="always"
      ></TextInput>
      <View>
        <TouchableOpacity style={styles.button} onPress={createNewProj}>
          <Text style={styles.buttonLabel}>ADD PROJECT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", borderWidth: 1 },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  button: {
    height: 40,
    width: 150,
    padding: 10,
    backgroundColor: redColor,
    borderRadius: 5,
  },
  buttonLabel: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default CreateProject;
