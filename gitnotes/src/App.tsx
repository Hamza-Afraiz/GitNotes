import { ThemeProvider } from "@mui/material/styles";
import { Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSearchQuery, useStarredGists } from "../src/Hooks";
import { theme } from "../src/theme/Theme";
import "./App.css";
import { GistPage, Header } from "./components";
import { CreateGist, Gists, UserProfile } from "./containers";
import store from "./store/store";

function App() {
  const { setSearchQueryValue, searchQuery } = useSearchQuery();
  const { setStarredGists, starredGists } = useStarredGists();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <Header
              setSearchQueryValue={setSearchQueryValue}
              setStarredGists={setStarredGists}
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
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/createGist" element={<CreateGist />} />
              </Routes>
            </div>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
