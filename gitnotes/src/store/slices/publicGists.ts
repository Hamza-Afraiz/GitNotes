import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { GistData } from "../../types/gistData";
import { GistDataList } from "../../types/gistDataList";

// Define the initial state using that type
const initialState: GistDataList = {
  gistsData: [],
  error: "",
  loading: false,
};

export const PublicGistsSlice = createSlice({
  name: "publicGist",

  initialState,
  reducers: {
    setGistData(state, action) {
      state.gistsData = action.payload;
    },
    setLoadingState(state, action) {
      state.loading = !action.payload;
    },
  },
});

const fetchPublicGists = async () => {
  const responseNew = await axios.get(`https://api.github.com/gists`);
  return await responseNew.data;
};

const fetchGistFileData = async (gistFileUrl: string) => {
  const response = await fetch(`${gistFileUrl}`);
  return await response.text();
};

// getting gists objects and then extracting one object  details all we need
//cant go to the next object untill we completed details of one object
//using await for one object to complete all its api calls

export const getGistsData = () => async (dispatch: any) => {
  const response = await fetchPublicGists();

  const gistsDataArray: GistData[] = [];
  const gistsDataFromApi = response;
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

  dispatch(setGistData(gistsDataArray));
};

// Other code such as selectors can use the imported `RootState` type
const { setGistData } = PublicGistsSlice.actions;
export default PublicGistsSlice.reducer;
