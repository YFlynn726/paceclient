import React, { Component } from "react";
import STORE from "./dummy-info";
import { Link } from "react-router-dom";
import "./userdetail.css";

class UserDetail extends Component {
  state = {};
  render() {
    const userId = this.props.match.params.user_id;

    const entries = STORE.items.filter((item) => {
      return item.user_Id === userId;
    });

    console.log(entries);

    const records = entries.map((item) => {
      return (
        <div className="userdetails" key={item.id}>
          <li className="users">Date: {item.date}</li>
          <li className="users">Pace: {item.pace}</li>
          <li className="users">Run Experience: {item.content} </li>
          <button>Edit</button>
          <button>Delete</button>
          <br />
        </div>
      );
    });
    return (
      <div>
        <h1>Welcome to your log!</h1>
        <ul>{records}</ul>
        <Link to={"/addpace"}>
          <input type="button" value="Add A Pace Entry" />
        </Link>{" "}
      </div>
    );
  }
}

export default UserDetail;
