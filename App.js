import React from "react";
import Greetings from "./components/greetings.js";
import CreateProject from "./components/createproject.js";
import ProjectList from "./components/projectlist.js";
import LogProject from "./components/logproject.js";
import ProjectListContext from "./contexts/projectlistcontext.js";
import CurrentProjectContext from "./contexts/currentprojectcontext";
import { getStateValue, getStateValueCollection } from "./utilities/contexthelper.js";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const myState = getStateValueCollection({
    currentProjectValue: "nothing",
    projectListValue: ["default1", "default2"],
  });

  // setter gets passed along with the value, allows child to manipulate state at higher level
  const [currentHours, setCurrentHours] = React.useState();
  const currentHoursValue = { value: currentHours, set: setCurrentHours };

  return (
    <View style={styles.page}>
      <CurrentProjectContext.Provider value={myState.currentProjectValue}>
        <ProjectListContext.Provider value={myState.projectListValue}>
          <View style={styles.header}>
            <Greetings name={"Alex"}></Greetings>
          </View>
          <View style={styles.content}>
            <LogProject></LogProject>
            <View style={styles.createproject}>
              <ProjectList></ProjectList>
              <CreateProject></CreateProject>
            </View>
            <View></View>
          </View>
        </ProjectListContext.Provider>
      </CurrentProjectContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: "100%",
    paddingTop: 50,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 75,
    borderWidth: 1,
    width: "100%",
    backgroundColor: "lightgray",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },

  createproject: {
    height: 200,
    borderWidth: 1,
    marginTop: 200,
  },
});
