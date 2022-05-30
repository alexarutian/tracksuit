import React from "react";
import Greetings from "./components/greetings.js";
import CreateProject from "./components/createproject.js";
import TestComponent from "./components/testcomponent.js";
import ProjectList from "./components/projectlist.js";
import LogProject from "./components/logproject.js";
import { AppContext } from "./contexts/appcontext.js";
import { getStateValue, getStateValueCollection } from "./utilities/contexthelper.js";
import { getAllProjects } from "./utilities/getallprojects.js";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  // projectListValue = getStateValue(["default1", "default2"]);

  // setter gets passed along with the value, allows child to manipulate state at higher level
  // const [currentHours, setCurrentHours] = React.useState();
  // const currentHoursValue = { value: currentHours, set: setCurrentHours };

  // const errorValue = getStateValue(null);
  // const isLoadedValue = getStateValue(false);
  // const itemsValue = getStateValue([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  React.useEffect(() => {
    context.ajax.test();
  }, []);

  // older way
  // const appState = {
  //   username: getStateValue("tucan sam"),
  //   other: getStateValue("tucan HAM"),
  // };

  // // cooler way
  const context = getStateValueCollection({
    username: "tucan sam",
    other: "tucan ham",
    projectList: [],
    currentProject: "nothing",
  });
  context.ajax = { getAllProjects };
  context.ajax.test = () => {
    getAllProjects(context.projectList);
  };

  return (
    <AppContext.Provider value={context}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Greetings name={context.thisValue}></Greetings>
        </View>
        <View style={styles.content}>
          <TestComponent directProp={"direct"}></TestComponent>
          <LogProject></LogProject>
          <View style={styles.createproject}>
            <CreateProject></CreateProject>
            <ProjectList></ProjectList>
          </View>
        </View>
      </View>
    </AppContext.Provider>
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
    height: 400,
    borderWidth: 1,
    marginTop: 200,
  },
});
