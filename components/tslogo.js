import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { Text } from "react-native";
import { colors } from "../utilities/stylevars.js";

const TSLogo = ({ size = "large" }) => {
  const context = React.useContext(AppContext);

  return (
    <Text
      style={{ fontSize: (size = "large" ? 60 : 30), fontFamily: "Chicle", letterSpacing: 1, color: colors.goldColor }}
    >
      tracksu<Text style={{ color: colors.redColor }}>i</Text>
      <Text style={{ color: colors.greenColor }}>t</Text>
    </Text>
  );
};

export default TSLogo;
