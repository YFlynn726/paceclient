import React from "react";
import ReactDOM from "react-dom";
import UserDetail from "./userDetail";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const props = {
    match: { params: { user_id: 3 } },
  };
  ReactDOM.render(
    <Router>
      <UserDetail {...props} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
