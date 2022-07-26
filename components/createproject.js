import React from "react";
import TSButton from "./tsbutton.js";
import TSTextInput from "./tstextinput.js";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { colors } from "../utilities/stylevars.js";
import { createNewProject } from "../utilities/ajax.js";
import { StyleSheet, View } from "react-native";
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
    marginBottom: 5,
    alignSelf: "flex-start",
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
        <TSTextInput
          placeholder="project name here"
          value={textValue.value}
          onChangeText={textValue.set}
          selectTextOnFocus={true}
          clearButtonMode={true}
          style={styles.input}
        ></TSTextInput>
        <Ionicons name="close" size={30} color={colors.redColor} />
      </View>
      <View>
        <TSButton
          label={"add project"}
          fontColor={"white"}
          functionOnPress={createNewProj}
          width={150}
          backgroundColor={colors.redColor}
        ></TSButton>
      </View>
    </View>
  );
};

export default CreateProject;
