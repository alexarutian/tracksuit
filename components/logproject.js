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
      style={styles.button}
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
    <View style={styles.buttonList}>
      {itemList.map((project, idx) => (
        <SelectorButton key={idx} item={project} stateValue={stateValue} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "yellow",
    height: 40,
    width: 150,
    padding: 10,
    margin: 10,
    borderRadius: "8px",
  },
  buttonList: {
    borderWidth: 1,
    borderColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  buttonLabel: {
    textAlign: "center",
    color: "red",
  },
});

export default LogProject;
