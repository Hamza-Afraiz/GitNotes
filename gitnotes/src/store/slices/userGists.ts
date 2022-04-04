import { createSlice } from "@reduxjs/toolkit";
import { createGist } from "../../types/createGist";
import { GistsDataList } from "../../types/gistsDataList";
import { request } from "../../utils/axios-utils";


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

export const { setLoadingState, setErrorState } = UserGists.actions;

export default UserGists.reducer;
