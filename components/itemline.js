import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { goldColor, greenColor } from "../utilities/stylevars.js";
import ItemOptionMenu from "./itemoptionmenu.js";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const ItemLine = ({ name, options }) => {
  const context = React.useContext(AppContext);

  const optionOpen = getStateValue(false);

  const openOptions = () => {
    // alert(name);
    optionOpen.set(true);
  };

  const closeOptions = () => {
    optionOpen.set(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.bigBoldLabel}>{name}</Text>
        <Pressable
          onPress={() => {
            openOptions(name);
          }}
          // additional radius outside of pressable area
          hitSlop={10}
        >
          <SimpleLineIcons name="options" size={24} color={greenColor} />
        </Pressable>
      </View>
      <ItemOptionMenu
        title={name}
        options={options}
        isVisible={optionOpen.value}
        dismiss={closeOptions}
      ></ItemOptionMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  line: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    // backgroundColor: goldColor,
  },
  bigBoldLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: greenColor,
  },
});

export default ItemLine;
