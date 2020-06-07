import React from "react";

const PaceContext = React.createContext({
  users: [],
  items: [],
  addUser: () => {},
  deleteItem: () => {},
  addPace: () => {},
  editItem: () => {},
});

export default PaceContext;
