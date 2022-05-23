import React from "react";
import ProjectListContext from "../contexts/projectlistcontext.js";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const LogProject = () => {
  return (
    <View>
      <Text>Choose today's project:</Text>
      <ProjectListContext.Consumer>
        {(projectListObject) => {
          return (
            <View>
              {projectListObject.value.map((project, idx) => (
                <TouchableOpacity style={styles.projectSelection} key={idx}>
                  <Text>{project}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
      </ProjectListContext.Consumer>
    </View>
  );
};

const styles = StyleSheet.create({
  projectSelection: {
    backgroundColor: "yellow",
  },
});

export default LogProject;
