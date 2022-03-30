import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { createGist } from "../../types/createGist";
import { request } from "../../utils/axios-utils";
import { GistData } from "../../types/gistData";
import { GistsDataList } from "../../types/gistsDataList";
import useSWR from "swr";

const initialState: GistsDataList = {
  loading: false,
  currentGistId: 0,
  error: false,
};
export const UserGists = createSlice({
  name: "UserGists",
  initialState,
  reducers: {
    setErrorState(state, action) {
      state.error = action.payload;
    },

    setLoadingState(state, action) {
      state.loading = !state.loading;
      state.currentGistId = action.payload;
    },

    //adding star gists froom public gists
    // addStarGistFromPublic(state, action) {
    //   state.starredGists.push(action.payload);
    // },

    //adding gists to starred gists from my gists
    // addStarGistDataFromGists(state, action) {
    //   const temp =
    //     action.payload.gistType === "user"
    //       ? state.userGistsData.find(function (element) {
    //           return element.gistId === action.payload.gistId;
    //         })
    //       : state.publicGistsData.find(function (element) {
    //           return element.gistId === action.payload.gistId;
    //         });

    //   if (temp) state.starredGists = [...state.starredGists, temp];
    // },
    // removeStarGistData(state, action) {
    //   state.starredGists = state.starredGists.filter(
    //     (gist) => gist.gistId !== action.payload
    //   );
    // },

    // deleteGistData(state, action) {
    //   state.userGistsData = state.userGistsData.filter(
    //     (gist) => gist.gistId !== action.payload
    //   );
    // },
  },
});

//Basically we have created this object type for our create Gist operation
//creating gist needs this type of object

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
// export async function useSwrPublicData (){
//   const { data, error } = useSWR('publicGists', await request({
//     url: "/gists"

//   }))
//   console.log("data swr is ",data)
//   return data

// }
export const CreateGist = (gistData: createGist) => async (dispatch: any) => {
  //converting gist data to desired type for post operation

  const filesArray = gistData.files.map((item) => {
    return {
      fileName: item.fileName,
      content: item.fileContent,
    };
  });

  const filesObject = convertArrayToObject(filesArray, "fileName");

  //okay ! Dispatching(1) means we are not working(star,unstar ) on some gists.we are just ending the loading
  dispatch(setLoadingState(1));

  const response = await request({
    url: "/gists",
    method: "post",
    data: { files: filesObject, description: gistData.description },
  });
  if (response) {
    dispatch(setLoadingState(1));
    return response;
  } else {
    dispatch(setErrorState(true));
    dispatch(setLoadingState(1));
    return;
  }

  // return await req;
};

export const UpdateGist =
  (gistData: createGist, gistId: string) => async (dispatch: any) => {
    const filesArray = gistData.files.map((item) => {
      return {
        fileName: item.fileName,
        content: item.fileContent,
      };
    });

    const filesObject = convertArrayToObject(filesArray, "fileName");

    dispatch(setLoadingState(1));

    const response = await request({
      url: `/gists/${gistId}`,
      method: "patch",
      data: { files: filesObject, description: gistData.description },
    });
    if (response.data) {
      dispatch(setLoadingState(1));
      return response;
    }
  };

export const StarGist =
  (gistId: string | undefined, gistType: string | undefined) =>
  async (dispatch: any) => {
    //setting loading on speicfic gist id

    dispatch(setLoadingState(gistId));

    const req = await request({ url: `/gists/${gistId}/star`, method: "put" });

    if (req.status !== 204) {
      dispatch(setErrorState(true));
      dispatch(setLoadingState(gistId));
      return;
    }

    //if we are going to star some our own gists

    // await dispatch(addStarGistDataFromGists({ gistId, gistType }));

    //if we are going to star public gists

    dispatch(setLoadingState(gistId));

    return await req;
  };

export const DeleteGist =
  (gistId: string | undefined) => async (dispatch: any) => {
    dispatch(setLoadingState(gistId));
    const req = await request({ url: `/gists/${gistId}`, method: "delete" });

    if (req.status !== 204) {
      dispatch(setErrorState(true));
      dispatch(setLoadingState(gistId));
      return;
    }

    // await dispatch(deleteGistData(gistId));
    dispatch(setLoadingState(gistId));

    return await req;
  };

export const GetStarredGists = async () => {
  const req = await request({ url: `/gists/starred` });

  return await req.data;
};

export const UnStarGist =
  (gistId: string | undefined) => async (dispatch: any) => {
    dispatch(setLoadingState(gistId));
    const req = await request({
      url: `/gists/${gistId}/star`,
      method: "delete",
    });

    if (req.status !== 204) {
      dispatch(setErrorState(true));
      dispatch(setLoadingState(gistId));
      return;
    }
    // dispatch(removeStarGistData(gistId));
    dispatch(setLoadingState(gistId));

    return await req;
  };

export const {
  setLoadingState,
  // addStarGistDataFromGists,
  // deleteGistData,
  // removeStarGistData,
  // addStarGistFromPublic,

  setErrorState,
} = UserGists.actions;

export default UserGists.reducer;
