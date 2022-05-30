import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from "react-native";

const CreateProject = () => {
  const context = React.useContext(AppContext);

  const textValue = getStateValue(null);

  const errorValue = getStateValue(null);
  const isLoadedValue = getStateValue(false);
  const itemsValue = getStateValue([]);

  const updateProjectList = (projectListObject) => {
    const newProjectList = projectListObject.value.concat(textValue.value);
    projectListObject.set(newProjectList);
    textValue.set("");
  };

  const createNewProject = (projListObj) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    return fetch("http://192.168.0.186:8000/backend/projects/", {
      method: "POST",
      headers,
      body: JSON.stringify({ name: textValue.value }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // alert(result.all_projects);
          isLoadedValue.set(true);
          itemsValue.set(result.project_id);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          isLoadedValue.set(true);
          errorValue.set(error);
        }
      )
      .then(context.ajax.test());
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
        onChangeText={textValue.set}
        value={textValue.value}
        placeholder="project name here"
        selectTextOnFocus={true}
        clearButtonMode="always"
      ></TextInput>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            createNewProject(context.projectList.value);
          }}
        >
          <Text style={styles.buttonLabel}>Add Another Project</Text>
        </TouchableOpacity>
      </View>
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
