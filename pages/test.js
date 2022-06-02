import React from "react";

import TestComponent from "../components/testcomponent.js";

import { AppContext } from "../contexts/appcontext.js";
import { StyleSheet, View } from "react-native";

const Test = () => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <TestComponent directProp={"direct"}></TestComponent>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Test;
