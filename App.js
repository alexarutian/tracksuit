import React from "react";

import Log from "./pages/log.js";
import Login from "./pages/login.js";
import Test from "./pages/test.js";
import Projects from "./pages/projects.js";

import Greetings from "./components/greetings.js";
import NavigationBar from "./components/navigationbar.js";

import { AppContext } from "./contexts/appcontext.js";
import { getStateValue, getStateValueCollection } from "./utilities/contexthelper.js";
import { getAllProjects } from "./utilities/ajax.js";
import { beigeColor, goldColor, redColor, greenColor } from "./utilities/stylevars.js";
import { StyleSheet, View, KeyboardAvoidingView, Keyboard, Platform, ScrollView, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";

export default function App() {
  // // cooler way
  const context = getStateValueCollection({
    username: "tucan sam",
    other: "tucan ham",
    projectList: [],
    currentProjectName: "nothing",
    latestLog: null,
    error: null,
    email: "not logged in yet!",
    userToken: null,
    currentPage: "log",
  });
  context.ajax = { getAllProjects };
  context.ajax.test = () => {
    getAllProjects(context, { user_token: context.userToken.value });
    // getAllProjects(context, {});
  };
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  const userDataLoaded = getStateValue(false);
  const fontsLoaded = getStateValue(false);

  async function loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Chicle: require("./assets/Chicle-Regular.ttf"),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
    });
    fontsLoaded.set(true);
  }

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

  const navOptions = [
    { name: "log", label: "log" },
    { name: "test", label: "test" },
    { name: "projects", label: "projects" },
    { name: "login", label: "login" },
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
            {context.currentPage.value == "test" && <Test></Test>}
            {context.currentPage.value == "log" && <Log></Log>}
            {context.currentPage.value == "projects" && <Projects></Projects>}
            {context.currentPage.value == "login" && <Login></Login>}
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
    height: "70%",
    // create some breathing room above any content
    paddingTop: 10,
  },
  footer: {
    width: "100%",
    height: "15%",
  },
});
