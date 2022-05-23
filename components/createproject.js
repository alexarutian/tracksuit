import React from "react";
import ProjectListContext from "../contexts/projectlistcontext.js";
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from "react-native";

const CreateProject = () => {
  const [text, setText] = React.useState(null);

  const updateProjectList = (projectListObject) => {
    const newProjectList = projectListObject.value.concat(text);
    projectListObject.setter(newProjectList);
    setText("");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="project name here"
        selectTextOnFocus={true}
        clearButtonMode="always"
      ></TextInput>
      <ProjectListContext.Consumer>
        {(projectListObject) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  updateProjectList(projectListObject);
                }}
              >
                <Text style={styles.buttonLabel}>Add Project</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </ProjectListContext.Consumer>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 40,
    width: 150,
    padding: 10,
    backgroundColor: "red",
  },
  buttonLabel: {
    color: "white",
    textAlign: "center",
  },
});

export default CreateProject;
