// lib
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SWRConfig
          value={{
            refreshInterval: 30000,
            revalidateOnMount: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
          }}
        >
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
        </SWRConfig>
      </Router>
    </ThemeProvider>
  );
}

export default App;
