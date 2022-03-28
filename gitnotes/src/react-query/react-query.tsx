import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { createGist } from "../types/createGist";
import { GistData } from "../types/gistData";
import { request } from "../utils/axios-utils";

export function usePublicGistsData() {
  return useQuery("publicGists", fetchPublicGists);
}
export function useStarredGistsData() {
  return useQuery("starredGists", GetStarredGists);
}
export function useUserGistsData() {
  return useQuery("userGists", GetUserGists);
}

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
      queryClient.invalidateQueries("starredGists");
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
      console.log('validating')
      queryClient.invalidateQueries("userGists");
    },
  });
};
export const useCreateGist = (
  gistData: createGist,
  onCreateGist: () => void,
  onError: () => void,
  onMutate: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(() => CreateGist(gistData), {
    onSuccess: onCreateGist,
    onError: onError,
    onMutate: onMutate,

    onSettled: () => {
      queryClient.invalidateQueries("userGists");
    },
  });
};
export const useUpdateGist = (
  gistData: createGist,
  gistId: string,
  onCreateGist: () => void,
  onError: () => void,
  onMutate: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation(() => UpdateGist(gistData, gistId), {
    onSuccess: onCreateGist,
    onError: onError,
    onMutate: onMutate,

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
      queryClient.invalidateQueries("starredGists");
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

  //okay ! Dispatching(1) means we are not working(star,unstar ) on some gists.we are just ending the loading

  return await request({
    url: "/gists",
    method: "post",
    data: { files: filesObject, description: gistData.description },
  });

  // return await req;
};
const fetchPublicGists = async () => {
  let { data } = await request({ url: "/gists", headers: null });

  data = await GistsData(data);

  return data;
};
export const GetStarredGists = async () => {
  let { data } = await request({ url: `/gists/starred` });

  data = await GistsData(data);

  return data;
};

const fetchGistFileData = async (gistFileUrl: string) => {
  const response = await fetch(`${gistFileUrl}`);
  return await response.text();
};
export const GetUserGists = async () => {
  let { data } = await request({ url: `/gists` });

  data = await GistsData(data);

  return data;
};

export const GistsData = async (GistsData: any) => {
  if (!GistsData) {
    return;
  }
  const gistsDataFromApi = GistsData;
  const gistsDataArray: GistData[] = [];

  for (let i = 0; i < gistsDataFromApi.length; i++) {
    const item = gistsDataFromApi[i];

    const dateAndTime = moment(item.created_at);
    const fileName = Object.keys(item.files)[0];

    if (fileName) {
      const res = await fetchGistFileData(
        item?.files[`${fileName}`]["raw_url"]
      );
      const temp = {
        time: dateAndTime.format("hh:mm:ss"),
        ownerAvatar: item.owner?.avatar_url,
        ownerName: item.owner?.login,
        id: item.id,
        fileName: fileName,
        gistId: item.id,
        description: item.description,
        creationDate: dateAndTime.format("MMM DD YYYY"),
        content: res.split("\n"),
      };
      gistsDataArray.push(temp);
    }
  }
  return gistsDataArray;
};
