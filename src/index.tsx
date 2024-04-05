import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { HashRouter, Route, Switch } from "react-router-dom";
import Test from "./Test";
import ErrorPage from "./ErrorPage";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/test" component={Test} />
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  </HashRouter>,
  document.getElementById("app")
);
