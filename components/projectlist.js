import React from "react";
import ProjectListContext from "../contexts/projectlistcontext.js";
import { Text, View } from "react-native";

const ProjectList = () => {
  return (
    <View>
      <Text>Project list:</Text>
      <ProjectListContext.Consumer>
        {(projectListObject) => {
          return (
            <View>
              {projectListObject.value.map((project, idx) => (
                <Text key={idx}>{project}</Text>
              ))}
            </View>
          );
        }}
      </ProjectListContext.Consumer>
    </View>
  );
};

export default ProjectList;
