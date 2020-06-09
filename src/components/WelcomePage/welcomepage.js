import React, { Component } from "react";
import "./welcomepage.css";
import { Link } from "react-router-dom";
import PaceContext from "../PaceContext";
//import STORE from "./dummy-info";

class WelcomePage extends Component {
  static contextType = PaceContext;

  state = {};

  render() {
    //change this to context
    const users = this.context.users.map((user) => {
      return (
        <Link key={user.id} to={`/users/${user.id}`}>
          <li className="users">
            {user.first_name} {user.last_name}
          </li>
        </Link>
      );
    });

    return (
      <div>
        <h1>Welcome to the Community Dashboard</h1>
        <p>Please select your name to see your log.</p>
        <ul className="users">{users}</ul>
      </div>
    );
  }
}

export default WelcomePage;
