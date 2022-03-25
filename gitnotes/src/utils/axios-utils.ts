import axios from "axios";

const client = axios.create({ baseURL: "https://api.github.com" });
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization =
    "Bearer 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";
  const onSuccess = (response: any) => {
    return response;
  };
  const onError = (error:string) => {
    
   
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
