import { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { GistPage, Header } from "./components";
import { PublicGist, UserProfile ,CreateGist} from "./containers";

import { store } from "./store/store";
function App() {
  // const test = async () => {
  //   GetGists().then((r) => {
  //     console.log(r);
  //   });
  // };
  // useEffect(() => {
  //   test();
  // }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <div className="App">
            <Routes>
              <Route
                path="/gistPage"
                element={<GistPage gistData={null} gistType="public" />}
              />
              <Route path="/"  element={<PublicGist />} />
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
