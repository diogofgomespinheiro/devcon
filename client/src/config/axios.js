import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://intense-reaches-17959.herokuapp.com'
});

export const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete instance.defaults.headers.common["x-auth-token"];
  }
}

export default instance;