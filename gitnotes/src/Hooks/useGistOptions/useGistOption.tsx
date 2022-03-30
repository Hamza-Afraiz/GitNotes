import useSWR from "swr";
import { createGist } from "../../types/createGist";
import { request } from "../../utils/axios-utils";

const convertArrayToObject = (
  files: Array<{ fileName: string; content: string }>,
  key: any
) => {
  return files.reduce((obj: any, item: any) => {
    return {
      ...obj,
      [item[key]]: { content: item.content },
    };
  }, {});
};
export const CreateGist = async (url: string, gistData: createGist) => {
  //converting gist data to desired type for post operation

  const filesArray = gistData.files.map((item) => {
    return {
      fileName: item.fileName,
      content: item.fileContent,
    };
  });

  const filesObject = convertArrayToObject(filesArray, "fileName");

  //okay ! Dispatching(1) means we are not working(star,unstar ) on some gists.we are just ending the loading

  return await request({
    url: url,
    method: "post",
    data: { files: filesObject, description: gistData.description },
  });

  // return await req;
};
export const useCreateGist = (gistData: createGist) => {
  console.log("useCreateGist");
  const { data, mutate } = useSWR(["/gists", gistData], CreateGist);
  return {
    data,
    mutate,
  };
};
