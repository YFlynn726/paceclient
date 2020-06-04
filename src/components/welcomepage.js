import React, { Component } from "react";
import "./welcomepage.css";
import { Link } from "react-router-dom";
import STORE from "./dummy-info";

class WelcomePage extends Component {
  state = {};
  render() {
    const users = STORE.users.map((user) => {
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
        <section>
          <p>Please select your name to see your log.</p>
          <ul className="users">{users}</ul>
        </section>
      </div>
    );
  }
}

export default WelcomePage;
