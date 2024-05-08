import React from "react";
import {
  BrowserRouter,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login_auth">
          <LoginPage />
        </Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
