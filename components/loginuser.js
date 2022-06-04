import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { loginUser, deleteToken } from "../utilities/ajax.js";
import { redColor, lightBeigeColor } from "../utilities/stylevars.js";
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from "react-native";

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
          <TouchableOpacity style={styles.optionButton} onPress={selectLogin}>
            <Text style={styles.optionButtonLabel}>login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={selectCreate}>
            <Text style={styles.optionButtonLabel}>new user</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonLabel}>login</Text>
          </TouchableOpacity>
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
          <TouchableOpacity style={styles.button} onPress={createUser}>
            <Text style={styles.buttonLabel}>create</Text>
          </TouchableOpacity>
        </View>
      )}
      {context.userToken.value && (
        <View>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonLabel}>logout</Text>
          </TouchableOpacity>
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
    backgroundColor: lightBeigeColor,
  },
  optionButton: {
    height: 45,
    width: 100,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: redColor,
  },
  optionButtonLabel: {
    color: redColor,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Chicle",
    letterSpacing: 1.2,
  },
  button: {
    height: 45,
    width: 100,
    padding: 10,
    margin: 10,
    backgroundColor: redColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Chicle",
    letterSpacing: 1.2,
  },
});

export default LoginUser;
