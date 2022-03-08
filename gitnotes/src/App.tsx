import { Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSearchQuery } from "../src/Hooks";
import "./App.css";
import { GistPage, Header } from "./components";
import { CreateGist, Gists, UserProfile } from "./containers";
import store from "./store/store";
function App() {
  const {setSearchQueryValue,searchQuery}=useSearchQuery();
 

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header setSearchQueryValue={setSearchQueryValue} />
          <div className="App">
            <Routes>
              <Route
                path="/gistPage"
                element={<GistPage gistData={null} gistType="public" />}
              />
              <Route path="/"  element={<Gists searchQuery={searchQuery} />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/createGist" element={<CreateGist />} />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
