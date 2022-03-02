import { async } from "@firebase/util";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
const { Octokit } = require("@octokit/core");

interface GistData {
  ownerName?: string;
  ownerAvatar?: string;
  fileName?: string;
  creationDate?: string;
  gistId?: number;
  content?: string[];
  time?: string;
  description?: string;
  id?: string;
}
interface gistsDataList {
  gistsData: GistData[];
  error: string;
}

// Define the initial state using that type
const initialState: gistsDataList = {
  gistsData: [],
  error: "",
};
// export const fetchPublicGists = createAsyncThunk(
//   "gists/public",
//   // if you type your function argument here
//   async () => {
//     const response = await fetch(`https://api.github.com/gists`);
//     return await response.json();
//   }
// );
const fetchPublicGists =
  // if you type your function argument here
  async () => {
    console.log("Fetching Public Gists ====>>>>");
    // const response = await fetch(`https://api.github.com/gists`);
    // return await response.json();
    const responseNew=await axios.get(`https://api.github.com/gists`)
    return await responseNew.data;
    
    // .then((response) => {
    //   responseNew=response.data;
    //   console.log(response.data);
    //   return responseNew;
    // });
    
};

const fetchGistFileData =
  // if you type your function argument here
  async (gistFileUrl: string) => {
    //  console.log("fetching file from ", gistFileUrl);
    const response = await fetch(`${gistFileUrl}`);
    return await response.text();
  };

// Define a type for the slice state

export const PublicGistsSlice = createSlice({
  name: "publicGist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGistData(state, action) {
      console.log("Setted public gists Data")
      state.gistsData = action.payload;
    },
  },
});

export const getGistsData = () => async (dispatch: any) => {


  const response = await fetchPublicGists();
  console.log("getting public gists is resposne",response)
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
      // console.log("Fetched ", res);
    }

    tempGistDataArray.push(temp);
  }
  //console.log('temp gist array is',tempGistDataArray)
  dispatch(setGistData(tempGistDataArray));

  //console.log('fileData is',fileData);

  //  console.log("temp at end is",temp);
};

// const SetGistToReduxState = async(gistsDataFromApi: any) => {
//   let temp: GistData = {};
//   let tempGistDataArray: GistData[]=[] ;
//   for (let i = 0; i < gistsDataFromApi.length; i++) {
//     const item = gistsDataFromApi[i];

//       temp = {};
//       let momentJsVariable = moment(item.created_at);
//       temp.creationDate = momentJsVariable.format("MMM DD YYYY");
//       temp.time = momentJsVariable.format("hh:mm:ss");
//       temp.ownerAvatar = item.owner.avatar_url;
//       temp.ownerName = item.owner.login;
//       let fileKeys = item.files;
//       let fileName = Object.keys(fileKeys)[0];
//       let contentArray;
//       console.log("fileName is ", fileName, i);
//       temp.fileName = fileName;
//       temp.gistId = item.id;
//       temp.description = item.description;

//        const response=await fetchGistFileData(item?.files[`${fileName}`]["raw_url"]);
//        console.log("resp",response)
//         // do something with result

//     //  temp.content = ["var heelo", "good to see you"];

//       console.log("returned");
//       tempGistDataArray.push(temp) ;
//       temp = {};
//       console.log("temp array is", tempGistDataArray);

//     }
//       console.log('temparary is',tempGistDataArray);

//       //  console.log("temp at end is",temp);

//   return tempGistDataArray;
// };

// Other code such as selectors can use the imported `RootState` type
const { setGistData } = PublicGistsSlice.actions;
export default PublicGistsSlice.reducer;
