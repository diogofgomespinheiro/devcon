import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

export const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
}

export default instance;