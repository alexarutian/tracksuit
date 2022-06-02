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

////////////////////////////////////////////////////////////////////

const getAllProjects = (context, params) => {
  getJSONFetch("http://192.168.0.186:8000/backend/projects/", params)
    .then((res) => res.json())
    .then(
      (result) => {
        context.projectList.set(result.all_projects);
        context.error.set(null);
      },
      (error) => {
        context.error.set(error.message);
      }
    );
};

const createNewProject = (context, body) => {
  postJSONFetch("http://192.168.0.186:8000/backend/projects/", body)
    .then((res) => res.json())
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

const createNewLog = (context, body) => {
  postJSONFetch("http://192.168.0.186:8000/backend/logs/", body)
    .then((res) => res.json())
    .then(
      (result) => {
        context.latestLog.set(result.log_id);
        context.error.set(null);
      },

      (error) => {
        context.error.set(error);
      }
    );
};

const loginUser = (context, body) => {
  postJSONFetch("http://192.168.0.186:8000/backend/users/login/", body)
    .then((res) => res.json())
    .then(
      (result) => {
        context.email.set(result.email);
        context.userToken.set(result.token);
        storeToken(context, result.token, result.email).then(() => {
          context.error.set(null);
        });
        // try {
        //   await SecureStore.setItemAsync("user_token", JSON.stringify(context.userToken.value));
        // } catch (e) {
        //   context.error.set(e);
        // }
      },
      (error) => {
        context.error.set(error);
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

export { getAllProjects, createNewProject, createNewLog, loginUser, deleteToken };
