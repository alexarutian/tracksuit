import React from "react";

const CurrentProjectContext = React.createContext({
  value: "nothing",
  setter: () => {},
});
export default CurrentProjectContext;
