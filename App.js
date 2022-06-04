import React from "react";

import Log from "./pages/log.js";
import User from "./pages/user.js";
import Logs from "./pages/logs.js";
import Projects from "./pages/projects.js";

import Greetings from "./components/greetings.js";
import NavigationBar from "./components/navigationbar.js";

import { AppContext } from "./contexts/appcontext.js";
import { getStateValue, getStateValueCollection } from "./utilities/contexthelper.js";
import { getAllProjects, getAllLogs } from "./utilities/ajax.js";
import { beigeColor, goldColor, redColor, greenColor, offWhite } from "./utilities/stylevars.js";
import { StyleSheet, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";

export default function App() {
  // set up initial state of app
  const context = getStateValueCollection({
    username: "tucan sam",
    other: "tucan ham",
    projectList: [],
    logList: [],
    currentProjectName: "nothing",
    latestLog: null,
    error: null,
    email: "not logged in yet!",
    userToken: null,
    currentPage: "track",
    defaultHours: 8,
  });
  context.ajax = { getAllProjects };
  context.ajax.test = () => {
    getAllProjects(context, { user_token: context.userToken.value });
    getAllLogs(context, { user_token: context.userToken.value });
  };

  const fontsLoaded = getStateValue(false);
  async function loadFonts() {
    await Font.loadAsync({
      // Load a font from a static resource (assets folder)
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
      // alert(token);
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
        context.ajax.test();
      }
    }
    loadFonts();
  });

  const navOptions = [
    { name: "track", label: "track!" },
    { name: "projects", label: "projects" },
    { name: "logs", label: "logs" },
    { name: "user", label: "user" },
  ];

  if (fontsLoaded.value) {
    return (
      <AppContext.Provider value={context}>
        <View style={styles.page}>
          <View style={styles.header}>
            <Text style={{ fontSize: 60, fontFamily: "Chicle", letterSpacing: 1, color: goldColor }}>
              tracksu<Text style={{ color: redColor }}>i</Text>
              <Text style={{ color: greenColor }}>t</Text>
            </Text>
            <Greetings name={context.email.value}></Greetings>
          </View>
          <View style={styles.content}>
            {context.currentPage.value == "logs" && <Logs></Logs>}
            {context.currentPage.value == "track" && <Log></Log>}
            {context.currentPage.value == "projects" && <Projects></Projects>}
            {context.currentPage.value == "user" && <User></User>}
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
    backgroundColor: beigeColor,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "15%",
    width: "100%",
    backgroundColor: beigeColor,
    paddingTop: 10,
    paddingBottom: 5,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "72%",
    // create some breathing room above any content
    paddingTop: 10,
    backgroundColor: offWhite,
  },
  footer: {
    width: "100%",
    height: "13%",
  },
});
