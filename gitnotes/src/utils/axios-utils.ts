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
