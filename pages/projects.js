import React from "react";
import TSText from "../components/tstext.js";
import TSButton from "../components/tsbutton.js";
import ProjectList from "../components/projectlist.js";
import CreateProject from "../components/createproject.js";
import { colors } from "../utilities/stylevars.js";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { StyleSheet, View, ScrollView } from "react-native";

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
    backgroundColor: colors.redColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  optionButtonLabel: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Chicle",
    letterSpacing: 1.2,
  },
});
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
        <TSButton
          label="Add New Project"
          backgroundColor={colors.redColor}
          fontColor="white"
          functionOnPress={openAddProject}
          style={styles.optionButton}
        />
      </ScrollView>
    </View>
  );
};

export default Projects;
