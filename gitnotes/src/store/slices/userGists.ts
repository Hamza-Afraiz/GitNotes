import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { createGist } from "../../types/createGist";
import { GistData } from "../../types/gistData";
import { UserGistDataList } from "../../types/userGistDataList";

const initialState: UserGistDataList = {
  userGistsData: [],
  starredGists: [],
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
  },
});

export const CreateGist =
  // if you type your function argument here
  (gistData: createGist) => async (dispatch: any) => {
    const GIST_FILENAME = gistData.fileName;
    const req = await fetch(`https://api.github.com/gists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(gistData.fileContent),
          },
        },
        description: gistData.fileDescription,
      }),
    });
    dispatch(getUserGistsData());

    return await req;
  };
export const StarGist =
  // if you type your function argument here
  (gistId: string | undefined) => async (dispatch: any) => {
    const req = await fetch(`https://api.github.com/gists/${gistId}/star`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    dispatch(getStarredGistsData());
    return await req;
  };

export const DeleteGist =
  // if you type your function argument here
  (gistId: string | undefined) => async (dispatch: any) => {
    const req = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    dispatch(getUserGistsData());

    return await req.json();
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
    const req = await fetch(`https://api.github.com/gists/${gistId}/star`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    dispatch(getStarredGistsData);

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
export const { setUserGistData, setUserStarredData } = UserGists.actions;

export default UserGists.reducer;
