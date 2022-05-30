import React from "react";
import { AppContext } from "../contexts/appcontext.js";
import { getStateValue, getStateValueCollection } from "../utilities/contexthelper.js";
import { Text, View } from "react-native";

const ProjectList = () => {
  const context = React.useContext(AppContext);
  return (
    <View>
      <Text>We got these items:</Text>
      <View>
        {context.projectList.value.map((item, idx) => (
          <Text key={idx}>{item.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default ProjectList;
