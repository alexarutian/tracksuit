import React from "react";
import { AppContext } from "../contexts/appcontext.js";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const LogProject = () => {
  const context = React.useContext(AppContext);

  return (
    <View>
      <Text>Choose today's project:</Text>
      <SelectorButtonList itemList={context.projectList.value} stateValue={context.currentProject} />
    </View>
  );
};

const SelectorButtonList = ({ itemList, stateValue }) => {
  return (
    <View style={styles.buttonList}>
      {itemList.map((project, idx) => (
        <SelectorButton key={idx} item={project.name} stateValue={stateValue} />
      ))}
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
