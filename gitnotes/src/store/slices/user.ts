import { createSlice } from "@reduxjs/toolkit";
import githubAuth from "../../config/authMethods";
import { User } from "../../types/user";

// Define the initial state using that typeO
const initialState: User = {
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
    setUserData(state, action) {
      state.userData = action.payload;
      state.loggedIn = true;
    },
    LoggedOut(state) {
      state.loggedIn = false;
    },
  },
});

export const { setUserData, LoggedOut } = UserSlice.actions;
export default UserSlice.reducer;
