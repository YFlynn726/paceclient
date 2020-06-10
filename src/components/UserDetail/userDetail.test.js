import React from "react";
import ReactDOM from "react-dom";
import UserDetail from "./userDetail";
import { BrowserRouter as MemoryRouter } from "react-router-dom";
import PaceContext from "../PaceContext";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const props = {
    match: { params: { user_id: 1 } },
  };

  const contextValue = {
    items: [
      {
        user_Id: "2",
        id: "1",
        date: "3 / 12 / 20",
        pace: 6.12,
        content:
          "Ran 5 miles, it was hot and my shoes started to hurt on mile 2. I didn't drink enough water. ",
      },
      {
        user_Id: "1",
        id: "1",
        date: "3 / 30 / 20",
        pace: 9.12,
        content:
          "Ran 10 miles, it was hot and my knees started to hurt on mile 2. I didn't drink enough water. ",
      },
    ],
  };
  ReactDOM.render(
    <MemoryRouter>
      <PaceContext.Provider value={contextValue}>
        <UserDetail {...props} />
      </PaceContext.Provider>
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
