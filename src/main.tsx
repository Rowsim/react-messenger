import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import asyncComponent from "./components/util/AsyncComponent";
import "./styles/main.scss";

const AsyncMainChat = asyncComponent(() =>
  import("./pages/main-chat/main-chat")
);
const AsyncLoginPage = asyncComponent(() => import("./pages/login/login-page"));

function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/chat" component={AsyncMainChat} />
        <Route component={AsyncLoginPage} />
      </Switch>
    </Router>
  );
}

export default MainRouter;
