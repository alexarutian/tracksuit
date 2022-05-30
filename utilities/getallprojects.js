const getAllProjects = (itemsObj) => {
  fetch("http://192.168.0.186:8000/backend/projects/", { method: "GET" })
    .then((res) => res.json())
    .then(
      (result) => {
        // alert(result.all_projects);
        // isLoadedValue.set(true);
        itemsObj.set(result.all_projects);
        // errorValue.set(null);
      }
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      // (error) => {
      //   isLoadedValue.set(true);
      //   errorValue.set(error);
      // }
    );
};

export { getAllProjects };

// every ajax request, pass the thing setter, the status setter, and the error setter
// create convention
