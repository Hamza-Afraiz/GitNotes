import moment from "moment";
import { useQuery, useQueryClient } from "react-query";
import { GistData } from "../../types/gistData";
import { request } from "../../utils/axios-utils";

export function usePublicGistsData() {
  return useQuery("publicGists", fetchPublicGists);
}
export function useStarredGistsData() {
  return useQuery("starredGists", GetStarredGists);
}
export function useUserGistsData() {
  return useQuery("userGists", GetUserGists);
}

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
  return await response?.text();
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
