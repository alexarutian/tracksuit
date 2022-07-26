import React from "react";
import { Pressable } from "react-native";
import { AppContext } from "../contexts/appcontext.js";
import { colors } from "../utilities/stylevars.js";
import TSIcon from "./tsicon.js";

const TSIconButton = ({ style, onPress, iconProvider, iconName, iconSize = 24, iconColor = colors.beigeColor }) => {
  const context = React.useContext(AppContext);

  return (
    <Pressable style={style} onPress={onPress}>
      <TSIcon iconProvider={iconProvider} iconName={iconName} iconSize={iconSize} iconColor={iconColor} />
    </Pressable>
  );
};

export default TSIconButton;
