import React from "react";
import ReactDOM from "react-dom";
import WelcomePage from "./welcomepage";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <WelcomePage />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
