import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue } from "../utilities/contexthelper.js";
import { loginUser, deleteToken } from "../utilities/ajax.js";
import { redColor } from "../utilities/stylevars.js";
import { Text, TextInput, StyleSheet, View, TouchableOpacity } from "react-native";

const LoginUser = () => {
  const context = React.useContext(AppContext);

  const email = getStateValue(null);
  const password = getStateValue(null);

  const login = async () => {
    loginUser(context, { email: email.value, password: password.value });
    email.set("");
    password.set("");
  };
  const logout = async () => {
    deleteToken(context);
    context.userToken.set(null);
    context.email.set("not logged in yet!");
  };

  return (
    <View style={styles.container}>
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
      <View>
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonLabel}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonLabel}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      <Text>{context.error.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: "red",
    width: "95%",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: redColor,
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    height: 40,
    width: 150,
    padding: 10,
    marginBottom: 10,
    backgroundColor: redColor,
    borderRadius: 5,
  },
  buttonLabel: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default LoginUser;
