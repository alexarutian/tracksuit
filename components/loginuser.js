import React from "react";
import TSButton from "./tsbutton.js";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { loginUser, deleteToken } from "../utilities/ajax.js";
import { colors } from "../utilities/stylevars.js";
import { Text, TextInput, StyleSheet, View } from "react-native";

const LoginUser = () => {
  const context = React.useContext(AppContext);

  // toggles between login & create user view, first time using the app or logging in
  const mode = getStateValue("");
  const selectLogin = () => {
    mode.set("login");
  };
  const selectCreate = () => {
    mode.set("create");
  };

  const email = getStateValue(null);
  const password = getStateValue(null);
  const passwordConfirm = getStateValue(null);

  const login = async () => {
    loginUser(context, { email: email.value, password: password.value });
    // handle errors here!
    email.set("");
    password.set("");
    mode.set("");
    context.currentPage.set("track");
  };
  const logout = async () => {
    deleteToken(context);
    context.userToken.set(null);
    context.email.set("not logged in yet!");
  };
  const createUser = async () => {};

  return (
    <View style={styles.container}>
      {!context.userToken.value && (
        <View style={styles.modeButtons}>
          <View style={styles.modeButton}>
            <TSButton
              label={"login"}
              fontColor={colors.redColor}
              functionOnPress={selectLogin}
              width={100}
              backgroundColor={"white"}
              borderWidth={2}
              borderColor={colors.redColor}
            ></TSButton>
          </View>
          <View style={styles.modeButton}>
            <TSButton
              label={"new user"}
              fontColor={colors.redColor}
              functionOnPress={selectCreate}
              width={100}
              backgroundColor={"white"}
              borderWidth={2}
              borderColor={colors.redColor}
            ></TSButton>
          </View>
        </View>
      )}
      {mode.value == "login" && (
        <View style={styles.modeContents}>
          <TextInput
            style={styles.input}
            onChangeText={email.set}
            value={email.value}
            placeholder="email"
            selectTextOnFocus={true}
            clearButtonMode="always"
          ></TextInput>
          <TextInput
            style={styles.input}
            onChangeText={password.set}
            secureTextEntry={true}
            value={password.value}
            placeholder="password"
            selectTextOnFocus={true}
            clearButtonMode="always"
          ></TextInput>
          <TSButton
            label={"login"}
            fontColor={"white"}
            functionOnPress={login}
            width={100}
            backgroundColor={colors.redColor}
          ></TSButton>
        </View>
      )}
      {mode.value == "create" && (
        <View style={styles.modeContents}>
          <TextInput
            style={styles.input}
            onChangeText={email.set}
            value={email.value}
            placeholder="email"
            selectTextOnFocus={true}
            clearButtonMode="always"
          ></TextInput>
          <TextInput
            style={styles.input}
            onChangeText={password.set}
            secureTextEntry={true}
            value={password.value}
            placeholder="password"
            selectTextOnFocus={true}
            clearButtonMode="always"
          ></TextInput>
          <TextInput
            style={styles.input}
            onChangeText={passwordConfirm.set}
            secureTextEntry={true}
            value={passwordConfirm.value}
            placeholder="confirm password"
            selectTextOnFocus={true}
            clearButtonMode="always"
          ></TextInput>
          <TSButton
            label={"create"}
            fontColor={"white"}
            functionOnPress={createUser}
            width={100}
            backgroundColor={colors.redColor}
          ></TSButton>
        </View>
      )}
      {context.userToken.value && (
        <View>
          <TSButton
            label={"logout"}
            fontColor={"white"}
            functionOnPress={logout}
            width={100}
            backgroundColor={colors.redColor}
          ></TSButton>
        </View>
      )}
      <Text>{context.error.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  modeButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modeContents: {
    paddingTop: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: colors.lightBeigeColor,
  },
  modeButton: {
    margin: 10,
  },
  optionButtonLabel: {
    color: colors.redColor,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Chicle",
    letterSpacing: 1.2,
  },
});

export default LoginUser;
