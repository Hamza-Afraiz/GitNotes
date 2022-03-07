import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { createGist } from "../../types/createGist";
import { GistData } from "../../types/gistData";
import { UserGistDataList } from "../../types/userGistDataList";
const initialState: UserGistDataList = {
  userGistsData: [],
  starredGists: [],
  loading: false,
  workingGistId: 0,
};
export const UserGists = createSlice({
  name: "UserGists",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserGistData(state, action) {
      state.userGistsData = action.payload;
    },
    setUserStarredData(state, action) {
      state.starredGists = action.payload;
    },
    setLoadingState(state, action) {
      state.loading = !state.loading;
      state.workingGistId = action.payload;
    },
    addStarGistFromPublic(state, action) {
      state.starredGists.push(action.payload);
    },
    addStarGistDataFromGists(state, action) {
      // console.log("STORE STATE IS",store.getState().user)

      var temp = state.userGistsData.find(function (element) {
        console.log(action.payload === element.gistId);
        return element.gistId === action.payload;
      });
      console.log("temp is", temp);

      if (temp) state.starredGists = [...state.starredGists, temp];
    },
    removeStarGistData(state, action) {
      // var temp = state.userGistsData.find(function (element) {
      //   console.log(action.payload === element.gistId);
      //   return element.gistId !== action.payload;
      // });
      // console.log("temp removing", temp);

      // if (temp) state.starredGists = [...state.starredGists, temp];
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
const convertArrayToObject = (array: any, key: any) => {
  const initialValue = {};
  return array.reduce((obj: any, item: any) => {
    return {
      ...obj,
      [item[key]]: { ["content"]: item.content },
    };
  }, initialValue);
};
export const CreateGist =
  // if you type your function argument here
  (gistData: createGist) => async (dispatch: any) => {
    const bodyData = gistData.files.map((item) => {
      return {
        fileName: item.fileName,
        content: item.fileContent,
      };
    });

    const filesData = convertArrayToObject(bodyData, "fileName");

    dispatch(setLoadingState(1));
    //const GIST_FILENAME = gistData.gistName;
    const req = await fetch(`https://api.github.com/gists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        files: filesData,

        description: gistData.description,
      }),
    });
    dispatch(getUserGistsData());
    dispatch(setLoadingState(1));

    return await req;
  };
export const UpdateGist =
  // if you type your function argument here
  (gistData: createGist, gistId: string) => async (dispatch: any) => {
    const bodyData = gistData.files.map((item) => {
      return {
        fileName: item.fileName,
        content: item.fileContent,
      };
    });

    const filesData = convertArrayToObject(bodyData, "fileName");

    dispatch(setLoadingState(1));
    //const GIST_FILENAME = gistData.gistName;
    const req = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        files: filesData,

        description: gistData.description,
      }),
    });
    dispatch(getUserGistsData());
    dispatch(setLoadingState(1));

    return await req;
  };
export const StarGist =
  // if you type your function argument hee


    (gistId: string | undefined, gistType: string|undefined, gistObject: GistData|undefined) =>
    async (dispatch: any) => {
      dispatch(setLoadingState(gistId));
      const req = await fetch(`https://api.github.com/gists/${gistId}/star`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer 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`,
        },
      });
      //dispatch(getStarredGistsData());
      if (gistType === "user") {
        dispatch(addStarGistDataFromGists(gistId));
      
       
      }
      else{
        dispatch(addStarGistFromPublic(gistObject))
        
      }
      dispatch(setLoadingState(gistId));
     
      return await req;
    };

export const DeleteGist =
  // if you type your function argument here
  (gistId: string | undefined) => async (dispatch: any) => {
    dispatch(setLoadingState(gistId));
    const req = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    //dispatch(getUserGistsData());
    dispatch(deleteGistData(gistId));
    dispatch(setLoadingState(gistId));
    console.log("delete req is", req);
    return await req;
  };

export const GetStarredGists =
  // if you type your function argument here
  async () => {
    const req = await fetch(`https://api.github.com/gists/starred`, {
      method: "GET",
      headers: {
        Authorization: `Bearer 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`,
      },
    });

    return await req.json();
  };

export const UnStarGist =
  // if you type your function argument here
  (gistId: string | undefined) => async (dispatch: any) => {
    dispatch(setLoadingState(gistId));
    const req = await fetch(`https://api.github.com/gists/${gistId}/star`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    dispatch(removeStarGistData(gistId));
    dispatch(setLoadingState(gistId));

    return await req;
  };

const fetchGistFileData =
  // if you type your function argument here
  async (gistFileUrl: string) => {
    const response = await fetch(`${gistFileUrl}`);
    return await response.text();
  };
export const GetGists =
  // if you type your function argument here
  async () => {
    const req = await fetch(`https://api.github.com/gists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer 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`,
      },
    });

    return await req.json();
  };

export const getUserGistsData = () => async (dispatch: any) => {
  const response = await GetGists();

  let tempGistDataArray: GistData[] = [];
  const gistsDataFromApi = response;
  for (let i = 0; i < gistsDataFromApi.length; i++) {
    const item = gistsDataFromApi[i];
    let temp: GistData = {};
    let momentJsVariable = moment(item.created_at);
    temp.creationDate = momentJsVariable.format("MMM DD YYYY");
    temp.time = momentJsVariable.format("hh:mm:ss");
    temp.ownerAvatar = item.owner.avatar_url;
    temp.ownerName = item.owner.login;
    let fileKeys = item.files;
    let fileName = Object.keys(fileKeys)[0];

    temp.fileName = fileName;
    temp.gistId = item.id;
    temp.description = item.description;
    if (fileName) {
      const res = await fetchGistFileData(
        item?.files[`${fileName}`]["raw_url"]
      );
      let contentArray = res.split("\n");
      temp.content = contentArray;
    }

    tempGistDataArray.push(temp);
  }
  dispatch(setUserGistData(tempGistDataArray));
};

export const getStarredGistsData = () => async (dispatch: any) => {
  const response = await GetStarredGists();
  let tempGistDataArray: GistData[] = [];
  const gistsDataFromApi = response;
  for (let i = 0; i < gistsDataFromApi.length; i++) {
    const item = gistsDataFromApi[i];
    let temp: GistData = {};
    let momentJsVariable = moment(item.created_at);
    temp.creationDate = momentJsVariable.format("MMM DD YYYY");
    temp.time = momentJsVariable.format("hh:mm:ss");
    temp.ownerAvatar = item.owner.avatar_url;
    temp.ownerName = item.owner.login;
    temp.id = item.id;
    let fileKeys = item.files;
    let fileName = Object.keys(fileKeys)[0];

    temp.fileName = fileName;
    temp.gistId = item.id;
    temp.description = item.description;
    if (fileName) {
      const res = await fetchGistFileData(
        item?.files[`${fileName}`]["raw_url"]
      );
      let contentArray = res.split("\n");
      temp.content = contentArray;
    }

    tempGistDataArray.push(temp);
  }

  dispatch(setUserStarredData(tempGistDataArray));
};

// Other code such as selectors can use the imported `RootState` type
export const {
  setUserGistData,
  setUserStarredData,
  setLoadingState,
  addStarGistDataFromGists,
  deleteGistData,
  removeStarGistData,
  addStarGistFromPublic,
} = UserGists.actions;

export default UserGists.reducer;
