import React from "react";
import Settings from "./pages/settings.js";
import Logs from "./pages/logs.js";
import Projects from "./pages/projects.js";
import GreetingsLine from "./components/greetingsline.js";
import NavigationBar from "./components/navigationbar.js";
import TSLogo from "./components/tslogo.js";
import { AppContext } from "./contexts/appcontext.js";
import { getStateValue, getStateValueCollection } from "./utilities/contexthelper.js";
import { getAllProjects, getAllLogs, createNewProject, createNewLog } from "./utilities/ajax.js";
import { colors } from "./utilities/stylevars.js";
import { StyleSheet, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";

export default function App() {
  // set up initial state of app
  const context = getStateValueCollection({
    // fetch request dumps
    projectList: [],
    visibleProjects: [],
    archivedProjects: [],
    logList: [],
    logListByProject: [],
    // internal state situations
    currentProjectName: "nothing",
    openProject: null,
    latestLog: null,
    email: "not logged in yet!",
    userToken: null,
    currentPage: "track",
    // error messages
    statusCode: null,
    error: null,
    userError: null,
  });

  // store ajax functions into context
  context.ajax = { getAllProjects, getAllLogs, createNewProject, createNewLog };
  // set up initial external fetches to run everytime the app is refreshed
  context.ajax.initialFetches = () => {
    getAllProjects(context, { user_token: context.userToken.value });
    getAllLogs(context, { user_token: context.userToken.value });
  };

  const fontsLoaded = getStateValue(false);
  async function loadFonts() {
    await Font.loadAsync({
      // Loading fonts directly from static resource (assets folder)
      Chicle: require("./assets/Chicle-Regular.ttf"),
      Montserrat: require("./assets/Montserrat-Regular.ttf"),
      MontserratSemiBold: require("./assets/Montserrat-SemiBold.ttf"),
      Epilogue: require("./assets/Epilogue-Regular.ttf"),
      EpilogueSemiBold: require("./assets/Epilogue-SemiBold.ttf"),
      EpilogueLight: require("./assets/Epilogue-Light.ttf"),
    });
    fontsLoaded.set(true);
  }

  const getSecureStoreInfo = async () => {
    try {
      const token = await SecureStore.getItemAsync("user_token");
      const email = await SecureStore.getItemAsync("user_email");

      if (token) {
        context.userToken.set(token);
      }
      if (email) {
        context.email.set(email);
      }
    } catch (e) {
      context.error.set(e.message);
    }
  };

  const userDataLoaded = getStateValue(false);

  React.useEffect(() => {
    if (context.userToken.value == null) {
      getSecureStoreInfo();
    } else {
      if (!userDataLoaded.value) {
        userDataLoaded.set(true);
        context.ajax.initialFetches();
      }
    }
    loadFonts();
  });

  const navOptions = [
    { name: "track", label: "track!" },
    { name: "logs", label: "logs" },
    { name: "settings", label: "settings" },
  ];

  if (fontsLoaded.value) {
    return (
      <AppContext.Provider value={context}>
        <View style={styles.page}>
          <View style={styles.header}>
            <TSLogo />
            <GreetingsLine name={context.email.value}></GreetingsLine>
          </View>
          <View style={styles.content}>
            {context.currentPage.value == "logs" && <Logs></Logs>}
            {context.currentPage.value == "track" && <Projects></Projects>}
            {context.currentPage.value == "settings" && <Settings></Settings>}
          </View>

          <View style={styles.footer}>
            <NavigationBar options={navOptions}></NavigationBar>
          </View>
        </View>
      </AppContext.Provider>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  page: {
    height: "100%",
    paddingTop: 50,
    flex: 1,
    fontFamily: "Epilogue",
    backgroundColor: colors.beigeColor,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "13%",
    width: "100%",
    backgroundColor: colors.beigeColor,
    paddingTop: 5,
    paddingBottom: 5,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "74%",
    // create some breathing room above any content
    paddingTop: 10,
    backgroundColor: colors.offWhite,
  },
  footer: {
    width: "100%",
    height: "13%",
  },
});
