import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import TSIconButton from "./tsiconbutton.js";
import { createNewLog } from "../utilities/ajax.js";
import { colors } from "../utilities/stylevars.js";
import { Text, View, StyleSheet, Pressable } from "react-native";

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
    borderColor: colors.goldColor,
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
    color: colors.greenColor,
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
        {context.currentProjectName.value !== item.name && (
          <TSIconButton
            onPress={() => {
              createLog(item);
            }}
            iconProvider="Ionicons"
            iconName="checkmark-circle-outline"
          />
        )}
        {context.currentProjectName.value == item.name && (
          <TSIconButton
            onPress={() => {
              createLog(item);
            }}
            iconProvider="Ionicons"
            iconName="checkmark-circle"
          />
        )}
      </View>

      {context.openProject.value == item && (
        <View style={styles.itemOptionsLine}>
          <TSIconButton style={styles.lineOption} iconProvider="AntDesign" iconName="edit" />
          <TSIconButton style={styles.lineOption} iconProvider="FontAwesome" iconName="trash" />
          <TSIconButton style={styles.lineOption} iconProvider="FontAwesome" iconName="archive" />
        </View>
      )}
    </View>
  );
};

export default ItemLine;
