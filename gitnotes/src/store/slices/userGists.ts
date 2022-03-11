import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { createGist } from "../../types/createGist";
import { request } from "../../utils/axios-utils";
import { GistData } from "../../types/gistData";
import { UserGistDataList } from "../../types/userGistDataList";
const initialState: UserGistDataList = {
  userGistsData: [],
  starredGists: [],
  loading: false,
  workingGistId: 0,
  searchQuery: "",
};
export const UserGists = createSlice({
  name: "UserGists",
  initialState,
  reducers: {
    setUserGistData(state, action) {
      state.userGistsData = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    removeSearchQuery(state) {
      state.searchQuery = "";
    },
    setUserStarredData(state, action) {
      state.starredGists = action.payload;
    },
    setLoadingState(state, action) {
      state.loading = !state.loading;
      state.workingGistId = action.payload;
    },

    //adding star gists froom public gists
    addStarGistFromPublic(state, action) {
      state.starredGists.push(action.payload);
    },

    //adding gists to starred gists from my gists
    addStarGistDataFromGists(state, action) {
      const temp = state.userGistsData.find(function (element) {
        return element.gistId === action.payload;
      });

      if (temp) state.starredGists = [...state.starredGists, temp];
    },
    removeStarGistData(state, action) {
      state.starredGists = state.starredGists.filter(
        (gist) => gist.gistId !== action.payload
      );
    },

    deleteGistData(state, action) {
      state.userGistsData = state.userGistsData.filter(
        (gist) => gist.gistId !== action.payload
      );
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
    dispatch(getUserGistsData());
    dispatch(setLoadingState(1));
    return response;
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
      url: `/gists${gistId}`,
      method: "patch",
      data: { files: filesObject, description: gistData.description },
    });
    if (response.data) {
      dispatch(getUserGistsData());
      dispatch(setLoadingState(1));
      return response;
    }
  };

export const StarGist =
  (
    gistId: string | undefined,
    gistType: string | undefined,
    gistObject: GistData | undefined
  ) =>
  async (dispatch: any) => {
    //setting loading on speicfic gist id
    dispatch(setLoadingState(gistId));

    const req = await request({ url: `/gists/${gistId}/star`, method: "put" });

    //if we are going to star some our own gists
    if (gistType === "user") {
      dispatch(addStarGistDataFromGists(gistId));

      //if we are going to star public gists
    } else {
      dispatch(addStarGistFromPublic(gistObject));
    }

    dispatch(setLoadingState(gistId));

    return await req;
  };

export const DeleteGist =
  (gistId: string | undefined) => async (dispatch: any) => {
    dispatch(setLoadingState(gistId));
    const req = await request({ url: `/gists/${gistId}`, method: "delete" });

    dispatch(deleteGistData(gistId));
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
    dispatch(removeStarGistData(gistId));
    dispatch(setLoadingState(gistId));

    return await req;
  };

const fetchGistFileData = async (gistFileUrl: string) => {
  const response = await fetch(`${gistFileUrl}`);
  return await response.text();
};
export const GetGists = async () => {
  const req = await request({ url: `/gists` });

  return  req.data;
};

// getting gists objects and then extracting one object  details all we need
//cant go to the next object untill we completed details of one object
//using await for one object to complete all its api calls

export const getUserGistsData = () => async (dispatch: any) => {
  const response = await GetGists();

  const gistsDataFromApi = response;
  const gistsDataArray: GistData[] = [];

  for (let i = 0; i < gistsDataFromApi.length; i++) {
    const item = gistsDataFromApi[i];

    const momentJsVariable = moment(item.created_at);
    const fileName = Object.keys(item.files)[0];

    if (fileName) {
      const res = await fetchGistFileData(
        item?.files[`${fileName}`]["raw_url"]
      );
      const temp = {
        time: momentJsVariable.format("hh:mm:ss"),
        ownerAvatar: item.owner.avatar_url,
        ownerName: item.owner.login,
        id: item.id,
        fileName: fileName,
        gistId: item.id,
        description: item.description,
        creationDate: momentJsVariable.format("MMM DD YYYY"),
        content: res.split("\n"),
      };
      gistsDataArray.push(temp);
    }
  }

  dispatch(setUserGistData(gistsDataArray));
};

export const getStarredGistsData = () => async (dispatch: any) => {

  const response = await GetStarredGists();
  
  const gistsDataFromApi = response;
  const gistsDataArray: GistData[] = [];

  for (let i = 0; i < gistsDataFromApi.length; i++) {
    const item = gistsDataFromApi[i];

    const momentJsVariable = moment(item.created_at);
    const fileName = Object.keys(item.files)[0];

    if (fileName) {
      const res = await fetchGistFileData(
        item?.files[`${fileName}`]["raw_url"]
      );
      const temp = {
        time: momentJsVariable.format("hh:mm:ss"),
        ownerAvatar: item.owner.avatar_url,
        ownerName: item.owner.login,
        id: item.id,
        fileName: fileName,
        gistId: item.id,
        description: item.description,
        creationDate: momentJsVariable.format("MMM DD YYYY"),
        content: res.split("\n"),
      };
      gistsDataArray.push(temp);
    }
  }

  dispatch(setUserStarredData(gistsDataArray));
};

export const {
  setUserGistData,
  setUserStarredData,
  setLoadingState,
  addStarGistDataFromGists,
  deleteGistData,
  removeStarGistData,
  addStarGistFromPublic,
  setSearchQuery,
  removeSearchQuery,
} = UserGists.actions;

export default UserGists.reducer;
