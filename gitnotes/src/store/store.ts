import { configureStore } from "@reduxjs/toolkit";
// ...
import publicGistReducer from "./slices/publicGists";
import UserSlice from "./slices/user";
import UserGistsSlice from "./slices/userGists";

export const store = configureStore({
  reducer: {
    publicGist: publicGistReducer,
    user: UserSlice,
    userGists: UserGistsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
