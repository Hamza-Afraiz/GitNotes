import axios from "axios";

const client = axios.create({ baseURL: "https://api.github.com" });
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization =
    "Bearer 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";
  const onSuccess = (response: any) => {
    return response;
  };

  return client(options).then(onSuccess);
};
