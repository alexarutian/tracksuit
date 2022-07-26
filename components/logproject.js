import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { createNewLog } from "../utilities/ajax.js";
import { colors } from "../utilities/stylevars.js";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const LogProject = () => {
  const context = React.useContext(AppContext);

  return (
    <View>
      <Text>Choose today's project:</Text>
      <SelectorButtonList itemList={context.projectList.value} />
    </View>
  );
};

const SelectorButtonList = () => {
  const context = React.useContext(AppContext);
  return (
    <View style={styles.buttonList}>
      {context.projectList.value.map((project, idx) => (
        <SelectorButton key={idx} item={project} />
      ))}
    </View>
  );
};

const SelectorButton = ({ item }) => {
  const context = React.useContext(AppContext);

  const createLog = async (project) => {
    context.currentProjectName.set(project.name);
    createNewLog(context, { project_id: project.id, user_token: context.userToken.value });
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        createLog(item);
      }}
    >
      <Text style={styles.buttonLabel}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.redColor,
    height: 50,
    padding: 10,
    margin: 5,
    borderRadius: "8px",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  buttonLabel: {
    textAlign: "center",
    color: colors.lightBeigeColor,
    fontSize: 20,
  },
});

export default LogProject;
