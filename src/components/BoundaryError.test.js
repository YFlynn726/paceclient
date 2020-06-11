import React from "react";
import ReactDOM from "react-dom";
import BoundaryError from "./BoundaryError";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <BoundaryError />
    </Router>,

    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
