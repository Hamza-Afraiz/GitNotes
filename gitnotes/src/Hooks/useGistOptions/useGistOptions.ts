import { useMutation, useQueryClient } from "react-query";

import { createGist } from "../../types/createGist";
import { GistData } from "../../types/gistData";
import { request } from "../../utils/axios-utils";

export const useStarGist = (
  gistId: string | undefined,
  gistType: string | undefined,
  onStarGist: () => void,
  onError: () => void,
  onMutate: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation(() => StarGist(gistId, gistType), {
    onSuccess: onStarGist,
    onError: onError,
    onMutate: onMutate,

    onSettled: () => {
      // queryClient.invalidateQueries("starredGists");
      const gistData: GistData[] | undefined = queryClient.getQueryData(
        gistType === "user" ? "userGists" : "publicGists"
      );
      const starGistData = gistData?.find((gistData) => gistData.id === gistId);

      const starredGists: GistData[] | undefined =
        queryClient.getQueryData("starredGists");

      queryClient.setQueryData(
        "starredGists",
        starredGists ? [...starredGists, starGistData] : [starredGists]
      );
    },
  });
};

export const useDeleteGist = (
  gistId: string | undefined,
  onDeleteGist: () => void,
  onError: () => void,
  onMutate: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation(() => DeleteGist(gistId), {
    onSuccess: () => {
      onDeleteGist();
    },
    onError: onError,
    onMutate: onMutate,

    onSettled: () => {
      const gistData: GistData[] | undefined =
        queryClient.getQueryData("userGists");
      const userGists = gistData?.filter((gistData) => gistData.id !== gistId);

      queryClient.setQueryData("userGists", userGists);
    },
  });
};
export const useCreateGist = (gistData: createGist) => {
  const queryClient = useQueryClient();
  return useMutation(() => CreateGist(gistData), {
    onSettled: () => {
      queryClient.invalidateQueries("userGists");
    },
  });
};
export const useUpdateGist = (gistData: createGist, gistId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => UpdateGist(gistData, gistId), {
    onSettled: () => {
      queryClient.invalidateQueries("userGists");
    },
  });
};
export const useUnStarGist = (
  gistId: string | undefined,
  onUnStarGist: () => void,
  onError: () => void,
  onMutate: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(() => UnStarGist(gistId), {
    onSuccess: onUnStarGist,
    onError: onError,
    onMutate: onMutate,
    onSettled: () => {
      const gistData: GistData[] | undefined =
        queryClient.getQueryData("starredGists");
      const userGists = gistData?.filter((gistData) => gistData.id !== gistId);

      queryClient.setQueryData("starredGists", userGists);
    },
  });
};
export const UnStarGist = async (gistId: string | undefined) => {
  return await request({
    url: `/gists/${gistId}/star`,
    method: "delete",
  });
};

export const StarGist = async (
  gistId: string | undefined,
  gistType: string | undefined
) => {
  return await request({ url: `/gists/${gistId}/star`, method: "put" });
};
export const DeleteGist = async (gistId: string | undefined) => {
  return await request({ url: `/gists/${gistId}`, method: "delete" });
};
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
export const UpdateGist = async (gistData: createGist, gistId: string) => {
  const filesArray = gistData.files.map((item) => {
    return {
      fileName: item.fileName,
      content: item.fileContent,
    };
  });

  const filesObject = convertArrayToObject(filesArray, "fileName");
 
  return await request({
    url: `/gists/${gistId}`,
    method: "patch",
    data: { files: filesObject, description: gistData?.description },
  });
};
export const CreateGist = async (gistData: createGist) => {
  //converting gist data to desired type for post operation

  const filesArray = gistData.files.map((item) => {
    return {
      fileName: item.fileName,
      content: item.fileContent,
    };
  });

  const filesObject = convertArrayToObject(filesArray, "fileName");
  
 

  return await request({
    url: "/gists",
    method: "post",
    data: { files: filesObject, description: gistData.description },
  });

  // return await req;
};
