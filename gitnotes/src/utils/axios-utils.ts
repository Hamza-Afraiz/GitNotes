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
