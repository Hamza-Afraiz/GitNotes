import { async } from "@firebase/util";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import moment from "moment";
import React from "react";
import { useAppDispatch } from "../hooks";
import githubAuth from "../../config/authMethods";

const { Octokit } = require("@octokit/core");


interface UserData {
  ownerName?: string;
  ownerAvatar?: string;
  
  
 
 
}
interface User {
  userData: UserData;
  loggedIn: boolean;
}

// Define the initial state using that type
const initialState: User = {
  userData: {},
  loggedIn: false,
};
export const fetchUserLoginDetails = () => async (dispatch:any) => {
const response =await getAuthentication();
console.log("response is",response)

        const userData={
          ownerName:response.multiFactor.user.displayName,
          ownerAvatar:response.multiFactor.user.photoURL,
          

        }
        console.log(userData)
        dispatch(setUserData(userData))


}
const fetchPublicGists =
  // if you type your function argument here
  async () => {
   
    const response = await fetch(`https://api.github.com/gists`);
    return await response.json();
  };
//   const fetchGistFileData =
//   // if you type your function argument here
//   async (gistFileUrl: string) => {
//     console.log("fetching file from ", gistFileUrl);
//     const response = await fetch(`${gistFileUrl}`);
//     return await response.text();
//   };

// Define a type for the slice state
export const getAuthentication =(
  
  // if you type your function argument here
  async () => {
    console.log("called")
    const response =  await githubAuth();
    console.log("response is",response)
    return await response;
  }
);
export const UserSlice = createSlice({
  name: "User",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserData(state,action){
      console.log("action is",action)

      state.userData=action.payload;
      state.loggedIn=true;
    },
    LoggedOut(state){
      
      state.loggedIn=false;
    },
    
    
  },
 
});
// Other code such as selectors can use the imported `RootState` type
export const {setUserData,LoggedOut}=UserSlice.actions
export default UserSlice.reducer;
