// lib
import { ThemeProvider } from "@mui/material/styles";
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// src
import { useSearchQuery, useStarredGists } from "../src/Hooks";
import { theme } from "../src/theme/Theme";
// styles
import "./App.css";
import { GistPage, Header } from "./components";
import { CreateGist, Gists, UserProfile } from "./containers";
import { RequireAuth } from "./routes/ProtectedRoute";

function App() {
  const { setStarredGists, starredGists } = useStarredGists();
  const { setSearchQueryValue, searchQuery } = useSearchQuery();

   const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Header
            setStarredGists={setStarredGists}
            setSearchQueryValue={setSearchQueryValue}
          />
          <div className="App">
            <Routes>
              <Route
                path="/gistPage"
                element={<GistPage gistData={null} gistType="public" />}
              />
              <Route
                path="/"
                element={
                  <Gists
                    searchQuery={searchQuery}
                    starredGists={starredGists}
                  />
                }
              />
              <Route
                path="/createGist"
                element={
                  <RequireAuth>
                    <CreateGist />
                  </RequireAuth>
                }
              />
              <Route
                path="/userProfile"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
