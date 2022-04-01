import axios from "axios";
import { token } from "./personalAccessToken";
const client = axios.create({ baseURL: "https://api.github.com" });
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (response: any) => {
    return response;
  };

  return client(options).then(onSuccess);
};
