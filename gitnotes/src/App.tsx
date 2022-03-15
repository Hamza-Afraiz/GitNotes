// lib
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// src
import { useSearchQuery, useStarredGists } from "../src/Hooks";
import { theme } from "../src/theme/Theme";
// styles
import "./App.css";
import { GistPage, Header } from "./components";
import { CreateGist, Gists, UserProfile } from "./containers";

function App() {
  const { setStarredGists, starredGists } = useStarredGists();
  const { setSearchQueryValue, searchQuery } = useSearchQuery();

  return (
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
              <Route path="/createGist" element={<CreateGist />} />
              <Route path="/userProfile" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
