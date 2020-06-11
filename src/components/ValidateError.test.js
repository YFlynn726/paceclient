import React from "react";
import ReactDOM from "react-dom";
import ValidateError from "./ValidateError";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <ValidateError />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
