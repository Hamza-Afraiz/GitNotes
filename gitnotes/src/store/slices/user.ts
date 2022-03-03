import { createSlice } from "@reduxjs/toolkit";
import githubAuth from "../../config/authMethods";
import { User } from '../../types/user';


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

// Define a type for the slice state
export const getAuthentication =
  // if you type your function argument here
  async () => {
    const response = await githubAuth();

    return await response;
  };
export const UserSlice = createSlice({
  name: "User",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserData(state, action) {
      state.userData = action.payload;
      state.loggedIn = true;
    },
    LoggedOut(state) {
      state.loggedIn = false;
    },
  },
});
// Other code such as selectors can use the imported `RootState` type
export const { setUserData, LoggedOut } = UserSlice.actions;
export default UserSlice.reducer;
