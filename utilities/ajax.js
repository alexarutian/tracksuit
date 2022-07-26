import * as SecureStore from "expo-secure-store";

function getJSONFetch(url, params) {
  let headers = new Headers();
  headers.append("Accept", "application/json");

  if (params.json !== undefined) {
    params.json = JSON.stringify(params.json);
  }

  url = url + "?" + new URLSearchParams(params).toString();

  return fetch(url, { headers, method: "GET" });
}

function postJSONFetch(url, body) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

const userErrorMessages = {
  logs: {
    post: {
      409: "You have already logged this project today!",
    },
  },
};

function generateUserErrorMessage(code, verb, resource) {
  let message = userErrorMessages[resource][verb][code];
  return message;
}

////////////////////////////////////////////////////////////////////

const getAllProjects = (context, params) => {
  getJSONFetch("http://192.168.0.186:8000/backend/projects/", params)
    .then((res) => {
      context.statusCode.set(res.status);
      return res.json();
    })
    .then(
      (result) => {
        context.projectList.set(result.all_projects);
        context.visibleProjects.set(result.visible_projects);
        context.archivedProjects.set(result.archived_projects);
        context.error.set(null);
      },
      (error) => {
        context.error.set(error.message);
      }
    );
};

const createNewProject = (context, body) => {
  postJSONFetch("http://192.168.0.186:8000/backend/projects/", body)
    .then((res) => {
      context.statusCode.set(res.status);
      return res.json();
    })
    .then(
      (result) => {
        // itemsObj.set(result.project_id);
        context.error.set(null);
      },

      (error) => {
        context.error.set(error.message);
      }
    )
    .then(getAllProjects(context, { user_token: context.userToken.value }));
};

const getAllLogs = (context, params) => {
  getJSONFetch("http://192.168.0.186:8000/backend/logs/", params)
    .then((res) => {
      context.statusCode.set(res.status);
      return res.json();
    })
    .then(
      (result) => {
        context.logList.set(result.all_logs);
        context.logListByProject.set(result.all_logs_by_project);
        context.error.set(null);
      },
      (error) => {
        context.error.set(error.message);
      }
    );
};

const createNewLog = (context, body) => {
  postJSONFetch("http://192.168.0.186:8000/backend/logs/", body)
    .then((res) => {
      context.statusCode.set(res.status);
      context.userError.set(generateUserErrorMessage(res.status, "post", "logs"));
      return res.json();
    })
    .then(
      (result) => {
        context.latestLog.set(result.log_id);
        context.error.set(null);
      },

      (error) => {
        context.error.set(error);
      }
    )
    .then(getAllLogs(context, { user_token: context.userToken.value }));
};

const loginUser = (context, body) => {
  postJSONFetch("http://192.168.0.186:8000/backend/users/login/", body)
    .then((res) => {
      context.statusCode.set(res.status);
      return res.json();
    })
    .then(
      (result) => {
        context.email.set(result.email);
        context.userToken.set(result.token);
        storeToken(context, result.token, result.email).then(() => {
          context.error.set(null);
        });
      },
      (error) => {
        context.error.set(error.message);
      }
    );
};

const createNewUser = (context, body) => {
  postJSONFetch("http://192.168.0.186:8000/backend/users/", body)
    .then((res) => {
      context.statusCode.set(res.status);
      return res.json();
    })
    .then(
      (result) => {
        context.email.set(result.email);
        context.userToken.set(result.token);
        storeToken(context, result.token, result.email).then(() => {
          context.error.set(null);
        });
      },
      (error) => {
        context.error.set(error.message);
      }
    );
};

const storeToken = async (context, userToken, email) => {
  try {
    await SecureStore.setItemAsync("user_token", userToken);
    await SecureStore.setItemAsync("user_email", email);
  } catch (e) {
    context.error.set(e.message);
  }
};

const deleteToken = async (context) => {
  try {
    await SecureStore.deleteItemAsync("user_token");
    await SecureStore.deleteItemAsync("user_email");
  } catch (e) {
    context.error.set(e.message);
  }
};

export { getAllProjects, createNewProject, getAllLogs, createNewLog, loginUser, createNewUser, deleteToken };
