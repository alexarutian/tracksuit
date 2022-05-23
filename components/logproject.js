import React from "react";
import ProjectListContext from "../contexts/projectlistcontext.js";
import CurrentProjectContext from "../contexts/currentprojectcontext.js";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const LogProject = () => {
  return (
    <View>
      <Text>Choose today's project:</Text>
      <CurrentProjectContext.Consumer>
        {(currentProjectStateValue) => {
          return (
            <ProjectListContext.Consumer>
              {(projectListStateValue) => {
                return (
                  <SelectorButtonList itemList={projectListStateValue.value} stateValue={currentProjectStateValue} />
                );
              }}
            </ProjectListContext.Consumer>
          );
        }}
      </CurrentProjectContext.Consumer>
    </View>
  );
};

const SelectorButton = ({ item, stateValue }) => {
  return (
    <TouchableOpacity
      style={styles.projectSelection}
      onPress={() => {
        stateValue.set(item);
      }}
    >
      <Text style={styles.buttonLabel}>{item}</Text>
    </TouchableOpacity>
  );
};

const SelectorButtonList = ({ itemList, stateValue }) => {
  return (
    <View style={styles.projectSelections}>
      {itemList.map((project, idx) => (
        <SelectorButton key={idx} item={project} stateValue={stateValue} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  projectSelection: {
    backgroundColor: "yellow",
    width: 130,
    height: 20,
    padding: 2,
    margin: 5,
  },
  projectSelections: {
    borderWidth: 1,
    borderColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  buttonLabel: {
    textAlign: "center",
    color: "red",
  },
});

export default LogProject;
