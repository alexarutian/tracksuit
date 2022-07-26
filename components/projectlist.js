import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import ItemLine from "./itemline.js";
import { View, StyleSheet } from "react-native";

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

const ProjectList = () => {
  const context = React.useContext(AppContext);

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

export default ProjectList;
