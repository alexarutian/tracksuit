import React from "react";
import Greetings from "./components/greetings.js";
import CreateProject from "./components/createproject.js";
import ProjectList from "./components/projectlist.js";
import LogProject from "./components/logproject.js";
import ProjectListContext from "./contexts/projectlistcontext.js";
import { StyleSheet, Text, View } from "react-native";

export const UsernameContext = React.createContext("default value");

export default function App() {
  const [projectList, setProjectList] = React.useState(["default1", "default2"]);
  // later - create helper function
  const projectListValue = { value: projectList, setter: setProjectList };

  const [currentProject, setCurrentProject] = React.useState("");
  const currentProjectValue = { value: currentProject, setter: setCurrentProject };

  return (
    <View style={styles.container}>
      <ProjectListContext.Provider value={projectListValue}>
        <UsernameContext.Provider value={"alexarutian"}>
          <View style={styles.greetings}>
            <Greetings name={"Alex"}></Greetings>
          </View>
          <View style={styles.createproject}>
            <CreateProject></CreateProject>
            <ProjectList></ProjectList>
            <LogProject></LogProject>
          </View>
          <Username />
        </UsernameContext.Provider>
        <View>
          <EList />
        </View>
      </ProjectListContext.Provider>
    </View>
  );
}

function Username() {
  return (
    <UsernameContext.Consumer>
      {(username) => {
        return <Text>{username}</Text>;
      }}
    </UsernameContext.Consumer>
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
