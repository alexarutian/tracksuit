import React from "react";
import TSText from "../components/tstext.js";
import ProjectList from "../components/projectlist.js";
import CreateProject from "../components/createproject.js";
import { redColor, lightBeigeColor, goldColor } from "../utilities/stylevars.js";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";

const Projects = () => {
  const context = React.useContext(AppContext);
  const addingProject = getStateValue(false);

  const openAddProject = () => {
    addingProject.set(true);
  };

  return (
    <View style={styles.container}>
      <TSText>{context.userError.value}</TSText>
      <ScrollView>
        <ProjectList></ProjectList>
        {addingProject.value && <CreateProject></CreateProject>}
        <TouchableOpacity style={styles.optionButton} onPress={openAddProject}>
          <Text style={styles.optionButtonLabel}>Add New Project</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    justifyContent: "flex-end",
  },
  optionButton: {
    height: 45,
    width: 150,
    padding: 10,
    margin: 10,
    marginTop: 0,
    backgroundColor: redColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: goldColor,
  },
  optionButtonLabel: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Chicle",
    letterSpacing: 1.2,
  },
});

export default Projects;
