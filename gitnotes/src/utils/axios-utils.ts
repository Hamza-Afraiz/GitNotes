import axios from "axios";

const client = axios.create({ baseURL: "https://api.github.com" });
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization =
    "Bearer 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";
  const onSuccess = (response: any) => {
    return response;
  };
  const onError = (error: any) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
