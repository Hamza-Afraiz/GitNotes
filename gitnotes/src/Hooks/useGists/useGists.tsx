import { request } from "../../utils/axios-utils";
import useSWR from "swr";
import { GistData } from "../../types/gistData";
import moment from "moment";




const GetPublicGists = async (url: string) => {
  let data = await request({ url: url, headers: null }).then((res) => res.data);
  data = GistsData(data);
  return data;
};
const GetStarredGists = async (url: string) => {
  let data = await request({ url: url }).then((res) => res.data);
  data = GistsData(data);
  return data;
};
const GetUserGists = async (url: string) => {
  let data = await request({ url: '/gists' }).then((res) => res.data);
  data = GistsData(data);
  return data;
};
export function usePublicGists() {
  const { data, error } = useSWR(`/gists`, GetPublicGists);

  return {
    publicsGistData: data,
    isPublicGistsLoading: !error && !data,
    publicGistsError: error,
  };
}
export function useStarredGists() {
  console.log("starred")
  const { data, error,mutate } = useSWR(`/gists/starred`, GetStarredGists);

  return {
    starredGistData: data,
    isStarredGistsLoading: !error && !data,
    starredGistsError: error,
    getStarredGists:mutate
  };
}
export function useUserGists() {
  console.log("user")
  const { data, error,mutate } = useSWR(`/userGists`, GetUserGists);

  return {
    userGistsData: data,
    userGistsLoading: !error && !data,
    userGistsError: error,
    getUserGists:mutate
  };
}
const fetchGistFileData = async (gistFileUrl: string) => {
  const response = await fetch(`${gistFileUrl}`);
  return await response.text();
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
