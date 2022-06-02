import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { Text, View, TouchableOpacity } from "react-native";

const TestComponent = (props) => {
  const context = React.useContext(AppContext);

  const clicked = () => {
    context.username.set(String(Math.random()));
  };

  return (
    <TouchableOpacity onPress={clicked}>
      <Text>{props.directProp}</Text>
      <Text>{context.username.value}</Text>
      <Text>{context.other.value}</Text>
    </TouchableOpacity>
  );
};
export default TestComponent;
