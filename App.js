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
    <View style={styles.container}>
      <CurrentProjectContext.Provider value={myState.currentProjectValue}>
        <ProjectListContext.Provider value={myState.projectListValue}>
          <View style={styles.greetings}>
            <Greetings name={"Alex"}></Greetings>
          </View>
          <View style={styles.createproject}>
            <CreateProject></CreateProject>
            <ProjectList></ProjectList>
            <LogProject></LogProject>
          </View>
          <View>
            <EList />
          </View>
        </ProjectListContext.Provider>
      </CurrentProjectContext.Provider>
    </View>
  );
}

function EList() {
  return (
    <ProjectListContext.Consumer>
      {(valueObject) => {
        return valueObject.value.map((project, idx) => <Text key={idx}>{project}</Text>);
      }}
    </ProjectListContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  greetings: {
    height: 75,
    borderWidth: 1,
  },
  createproject: {
    height: 200,
    borderWidth: 1,
  },
});
