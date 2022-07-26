import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { colors } from "../utilities/stylevars.js";
import { SimpleLineIcons, FontAwesome, AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

function getIconProvider(providerName = "MaterialCommunityIcons") {
  switch (providerName) {
    case "SimpleLineIcons":
      return SimpleLineIcons;
    case "FontAwesome":
      return FontAwesome;
    case "AntDesign":
      return AntDesign;
    case "Ionicons":
      return Ionicons;
    case "MaterialCommunityIcons":
      return MaterialCommunityIcons;
  }
}

const TSIcon = ({ iconProvider, iconName, iconSize = 24, iconColor = colors.beigeColor }) => {
  const context = React.useContext(AppContext);

  const IconProviderComponent = getIconProvider(iconProvider);

  return <IconProviderComponent name={iconName} size={iconSize} color={iconColor} />;
};

export default TSIcon;
