//lib
import { ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
//src
import { theme } from "../../theme/Theme";

// src

import UserSlice from "../../store/slices/user";
import UserGistsSlice from "../../store/slices/userGists";
import { GistData } from "../mockUserResponses/reduxGists";

const initialState = {
  user: {
    userData: {
      ownerName: "Hamza Afraiz",
      ownerAvatar: "https://avatars.githubusercontent.com/u/44562537?v=4",
    },
    loggedIn: true,
  },
  userGists: {
    publicGistsData: [],
    userGistsData: GistData,
    loading: false,
    starredGists: [],
    currentGistId: 0,
    error: "",
  },
};
export const store = configureStore({
  reducer: {
    user: UserSlice,
    userGists: UserGistsSlice,
  },
  preloadedState: initialState,
});

interface renderProps {
  children: ReactElement<any>;
}

const AllTheProviders = ({ children }: renderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement<any>, options?: any) =>
  render(ui, {
    wrapper: AllTheProviders,
    store: store,
    theme: theme,
    ...options,
  });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };
