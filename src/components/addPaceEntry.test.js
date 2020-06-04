import React from "react";
import ReactDOM from "react-dom";
import AddPace from "./addPaceEntry";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddPace />, div);
  ReactDOM.unmountComponentAtNode(div);
});
