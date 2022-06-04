import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { Text, View, StyleSheet, Pressable, Modal, TouchableWithoutFeedback } from "react-native";
import { getStateValue } from "../utilities/contexthelper.js";

const ItemOptionMenu = ({ title, options, isVisible, dismiss }) => {
  const context = React.useContext(AppContext);

  const visible = getStateValue(isVisible);

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={dismiss}>
      <TouchableWithoutFeedback onPress={dismiss}>
        <View style={styles.modalOverlay}></View>
      </TouchableWithoutFeedback>

      <View style={styles.modal}>
        <Text style={styles.modalTitle}>{title}</Text>
        {options.map((option, idx) => (
          <View key={idx}>
            <Pressable onPress={option.action}>
              <Text style={styles.option}>{option.label}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  modal: {
    position: "absolute",
    top: 190,
    right: "2.5%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-end",
    minWidth: "40%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalTitle: {
    padding: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  option: {
    padding: 6,
    fontSize: 16,
  },
});

export default ItemOptionMenu;
