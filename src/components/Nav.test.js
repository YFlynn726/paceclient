import React from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Nav />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
