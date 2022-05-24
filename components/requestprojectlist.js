import React from "react";
import { getStateValue, getStateValueCollection } from "../utilities/contexthelper.js";
import { Text, View } from "react-native";

const RequestProjectList = () => {
  const errorValue = getStateValue(null);
  const isLoadedValue = getStateValue(false);
  const itemsValue = getStateValue([]);

  React.useEffect(() => {
    fetch("http://192.168.0.186:8000/backend/projects/")
      .then((res) => res.json())
      .then(
        (result) => {
          // alert(result.all_projects);
          isLoadedValue.set(true);
          itemsValue.set(result.all_projects);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          isLoadedValue.set(true);
          errorValue.set(error);
        }
      );
  }, []);

  return (
    <View>
      <Text>We got these items:</Text>
      <View>
        {itemsValue.value.map((item, idx) => (
          <Text key={idx}>{item.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default RequestProjectList;
