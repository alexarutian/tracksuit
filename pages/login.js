import React from "react";

import LoginUser from "../components/loginuser.js";

import { AppContext } from "../contexts/appcontext.js";
import { StyleSheet, View } from "react-native";

const Login = () => {
  const context = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <LoginUser></LoginUser>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
