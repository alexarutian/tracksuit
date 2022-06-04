import React from "react";

import LogLine from "../components/logline.js";

import { AppContext } from "../contexts/appcontext.js";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const Logs = () => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        {context.logList.value.map((item, idx) => (
          <LogLine key={idx} logItem={item}></LogLine>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
  },
});

export default Logs;
