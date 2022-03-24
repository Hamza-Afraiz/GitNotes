import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import githubAuth from "../../config/authMethods";
import { User } from "../../types/user";

// Define the initial state using that typeO
export const initialState: User = {
  userData: {},
  loggedIn: false,
};

export const fetchUserLoginDetails = () => async (dispatch: any) => {
  const response = await getAuthentication();

  const userData = {
    ownerName: response.multiFactor.user.displayName,
    ownerAvatar: response.multiFactor.user.photoURL,
  };

  dispatch(setUserData(userData));
};

export const getAuthentication = async () => {
  const response = await githubAuth();

  return await response;
};

export const UserSlice = createSlice({
  name: "User",

  initialState,
  reducers: {
    setUserData(state, action:PayloadAction<{ownerName:string,ownerAvatar:string}>) {
      state.userData = action.payload;
      state.loggedIn = true;
    },
    LoggedOut(state) {
      state.loggedIn = false;
    },
    LoggedIn(state){
      state.loggedIn=true;
    }
  },
});

export const { setUserData, LoggedOut,LoggedIn } = UserSlice.actions;
export default UserSlice.reducer;
