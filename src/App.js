import React, { Component } from "react";
import LandingPage from "./components/landingpage";
import WelcomePage from "./components/welcomepage";
import AddPace from "./components/addPaceEntry";
import UserDetail from "./components/userDetail";
import Nav from "./components/Nav";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/welcome" exact component={WelcomePage} />
            <Route path="/addpace" exact component={AddPace} />
            <Route path="/users/:user_id" exact component={UserDetail} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
