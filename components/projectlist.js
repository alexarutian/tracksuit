import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import ItemLine from "./itemline.js";
import { lightBeigeColor } from "../utilities/stylevars.js";

import { Text, View, StyleSheet } from "react-native";

const ProjectList = () => {
  const context = React.useContext(AppContext);

  const projectOptionsMenu = [
    { name: "openLog", label: "see logs" },
    { name: "editProject", label: "edit" },
    { name: "archiveProject", label: "archive" },
    { name: "deleteProject", label: "delete" },
  ];

  return (
    <View style={styles.container}>
      {context.projectList.value.map((item, idx) => (
        <View key={idx} style={styles.projectListItem}>
          <ItemLine item={item}></ItemLine>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    direction: "column",
    justifyContent: "flex-start",
    width: "100%",
  },
  projectListItem: {
    marginBottom: 5,
  },
});

export default ProjectList;
