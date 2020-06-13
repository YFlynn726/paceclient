import React, { Component } from "react";
import LandingPage from "./components/Landingpage/landingpage";
import WelcomePage from "./components/WelcomePage/welcomepage";
import AddPace from "./components/AddPace/addPaceEntry";
import UserDetail from "./components/UserDetail/userDetail";
import Nav from "./components/Nav/Nav";
import config from "./config";
import BoundaryError from "./components/BoundaryError";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PaceContext from "./components/PaceContext";

class App extends Component {
  state = {
    users: [],
    items: [],
    addUser: this.addUser,
    addItem: this.addItem,
    deleteItem: this.deleteItem,
    editItem: this.editItem,
  };

  //adding a new item record and posting to database items endpoint
  addItem = (date, pace, content, user_id) => {
    const newItem = {
      pace: pace,
      date: date,
      content: content,
      user_id,
    };

    fetch(`${config.API_ENDPOINT}api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          items: [...this.state.items, data],
          id: Response.id,
          user_id: Response.user_id,
        });
      })
      .catch((error) => {
        console.log("Request failure: ", error);
      });
  };

  //deleting a pace record with a delete method
  deleteItem = (itemId) => {
    const newItemlist = this.state.items.filter((item) => {
      return item.id !== itemId;
    });
    console.log(newItemlist);
    fetch(`${config.API_ENDPOINT}api/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(this.state);
      })
      .catch((error) => {
        console.log("Request failure: ", error);
      });
    this.setState({
      items: this.state.items.filter((item) => +item.id !== +itemId),
    });
  };

  //edit pace record and updating db with patch method
  editItem = (date, pace, content, item, graphIt) => {
    const updatedItem = {
      date: date,
      pace: pace,
      content: content,
    };
    fetch(`${config.API_ENDPOINT}api/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.fetchInIt();
        graphIt();
      })
      .catch((error) => {
        console.log("Request failure: ", error);
      });
  };

  //fetch all users and items(pace records) using get method
  componentDidMount() {
    this.fetchInIt();
  }

  fetchInIt = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}api/users`),
      fetch(`${config.API_ENDPOINT}api/items`),
    ])
      .then(([itemsRes, usersRes]) => {
        if (!itemsRes.ok) return itemsRes.json().then((e) => Promise.reject(e));
        if (!usersRes.ok) return usersRes.json().then((e) => Promise.reject(e));

        return Promise.all([itemsRes.json(), usersRes.json()]);
      })
      .then(([users, items]) => {
        this.setState({ users, items });
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  //add a new user using post method to users endpoint
  addUser = (first_name, last_name) => {
    const newUser = {
      first_name: first_name,
      last_name: last_name,
    };

    fetch(`${config.API_ENDPOINT}api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          id: Response.id,
          users: [...this.state.users, data],
        });
      })
      .catch((error) => {
        console.log("Request failure: ", error);
      });
  };

  render() {
    const contextValue = {
      users: this.state.users,
      items: this.state.items,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      addUser: this.addUser,
      editItem: this.editItem,
    };
    return (
      <Router>
        <div className="App">
          <BoundaryError>
            <PaceContext.Provider value={contextValue}>
              <Nav />
              <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/welcome" exact component={WelcomePage} />
                <Route path="/addpace" exact component={AddPace} />
                <Route path="/users/:user_id" exact component={UserDetail} />
              </Switch>
            </PaceContext.Provider>
          </BoundaryError>
        </div>
      </Router>
    );
  }
}

export default App;
