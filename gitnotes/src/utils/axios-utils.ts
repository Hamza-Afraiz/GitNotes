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
