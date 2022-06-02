import React from "react";

import LogProject from "../components/logproject.js";

import { AppContext } from "../contexts/appcontext.js";
import { StyleSheet, View } from "react-native";

const Log = () => {
  const context = React.useContext(AppContext);

  return (
    <View>
      <LogProject></LogProject>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Log;
