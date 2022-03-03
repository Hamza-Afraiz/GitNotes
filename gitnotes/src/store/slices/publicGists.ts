import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { GistData } from "../../types/gistData";
import { GistDataList } from "../../types/gistDataList";

// Define the initial state using that type
const initialState: GistDataList = {
  gistsData: [],
  error: "",
};


export const PublicGistsSlice = createSlice({
  name: "publicGist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGistData(state, action) {
      state.gistsData = action.payload;
    },
  },
});

const fetchPublicGists =
  // if you type your function argument here
  async () => {
    const responseNew = await axios.get(`https://api.github.com/gists`);
    return await responseNew.data;
  };

const fetchGistFileData =
  // if you type your function argument here
  async (gistFileUrl: string) => {
    const response = await fetch(`${gistFileUrl}`);
    return await response.text();
  };

// Define a type for the slice state


export const getGistsData = () => async (dispatch: any) => {
  const response = await fetchPublicGists();

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

  dispatch(setGistData(tempGistDataArray));
};

// Other code such as selectors can use the imported `RootState` type
const { setGistData } = PublicGistsSlice.actions;
export default PublicGistsSlice.reducer;
