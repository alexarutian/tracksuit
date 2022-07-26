import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { createNewLog } from "../utilities/ajax.js";
import { goldColor, greenColor, beigeColor } from "../utilities/stylevars.js";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ItemLine = ({ item }) => {
  const context = React.useContext(AppContext);

  const createLog = async (project) => {
    context.currentProjectName.set(project.name);
    createNewLog(context, { project_id: project.id, user_token: context.userToken.value });
  };
  const toggleOpenProject = (project) => {
    if (context.openProject.value == project) {
      context.openProject.set(null);
    } else {
      context.openProject.set(project);
    }
  };

  //      <View style={context.currentProjectName.value == item.name ? styles.itemFirstLineSelected : styles.itemFirstLine}>

  return (
    <View style={context.currentProjectName.value == item.name ? styles.containerSelected : styles.container}>
      <View style={styles.itemFirstLine}>
        <Pressable
          style={styles.itemLabel}
          onPress={() => {
            toggleOpenProject(item);
          }}
        >
          <Text style={styles.bigBoldLabel}>{item.name}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            createLog(item);
          }}
        >
          {context.currentProjectName.value !== item.name && (
            <Ionicons name="checkmark-circle-outline" size={24} color={beigeColor} />
          )}
          {context.currentProjectName.value == item.name && (
            <Ionicons name="checkmark-circle" size={24} color={goldColor} />
          )}
        </Pressable>
      </View>

      {context.openProject.value == item && (
        <View style={styles.itemOptionsLine}>
          <Pressable style={styles.lineOption}>
            <AntDesign name="edit" size={24} color={beigeColor} />
          </Pressable>
          <Pressable style={styles.lineOption}>
            <FontAwesome name="trash" size={24} color={beigeColor} />
          </Pressable>
          <Pressable style={styles.lineOption}>
            <FontAwesome name="archive" size={24} color={beigeColor} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: 15,
    borderRadius: 5,
  },
  containerSelected: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: goldColor,
  },
  itemFirstLine: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },

  bigBoldLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: greenColor,
    fontFamily: "EpilogueSemiBold",
  },
  itemOptionsLine: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    padding: 5,
  },
  lineOption: {
    padding: 5,
    marginLeft: 10,
  },
});

export default ItemLine;
