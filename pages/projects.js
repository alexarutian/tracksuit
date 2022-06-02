import React from "react";

import ProjectList from "../components/projectlist.js";
import CreateProject from "../components/createproject.js";

import { AppContext } from "../contexts/appcontext.js";
import { StyleSheet, View, ScrollView } from "react-native";

const Projects = () => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.projects}>
      <ScrollView>
        <ProjectList></ProjectList>
        <CreateProject></CreateProject>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  projects: {
    width: "95%",
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Projects;
