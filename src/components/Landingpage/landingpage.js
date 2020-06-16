import React, { Component } from "react";
import PaceContext from "../PaceContext";
import "./landingpage.css";
import ValidationError from "../ValidateError";

class LandingPage extends Component {
  static contextType = PaceContext;

  //state for users names
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      error: false,
    };
  }

  //capture first name input
  handlefnameChange = (event) => {
    this.setState({
      first_name: event.target.value,
    });
  };

  //capture last name input
  handlelnameChange = (event) => {
    this.setState({
      last_name: event.target.value,
    });
  };

  //when submit button clicked validate entries meet criteria then send to addUser function to post in DB
  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateName();
    if (isValid) {
      //update DB
      this.addUser();
    } else {
      this.updateError(isValid.value);
    }
  };

  addUser = () => {
    //update context
    this.context.addUser(this.state.first_name, this.state.last_name);
    this.props.history.push("/welcome");
  };

  //if any errors, it will trigger this
  updateError = (err) => {
    this.setState({
      error: err,
    });
  };

  //to check if entries meet criteria if not then error will be called
  validateName = () => {
    let valid = true;
    const firstName = this.state.first_name.trim();
    const lastName = this.state.last_name.trim();
    const result = { error: false, value: firstName, lastName };

    if (firstName.length <= 2 || lastName.length <= 2) {
      result.error = true;
      result.value =
        "First Name and Last Name must be at least 3 characters long";
      valid = false;
    }

    for (let i = 0; i < this.context.users.length; i++) {
      let currentUser = this.context.users[i];
      // eslint-disable-next-line eqeqeq
      if (
        // eslint-disable-next-line eqeqeq
        currentUser.first_name == firstName ||
        // eslint-disable-next-line eqeqeq
        currentUser.last_name == lastName
      ) {
        alert("Name is already taken");
        valid = false;
      }
    }
    return valid;
  };

  render() {
    const { error } = this.state;
    const validationError = error ? <ValidationError message={error} /> : "";
    return (
      <div className="Landing">
        <h1>Welcome to Pace!</h1>
        <h2>Do you wonder how you perform on your runs overtime? </h2>

        <div className="iframecontainer">
          <iframe
            className="iframebox"
            title="running shoes"
            src="https://giphy.com/embed/3oEjHW5ZfmQsI2rUuk"
            width="580"
            height="460"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <section>
          <h2>
            Have you improved your average pace? Are you consistent? Or have you
            regressed?{" "}
          </h2>

          <p>
            Pace! Can help you visually see how you perform at each of your
            runs. Track your pace and see how you compare from your previous
            runs. Determine what were the differences based on your notes you
            made on that run experience. Grow your knowledge of your run
            experience.{" "}
          </p>
        </section>

        <section>
          Start Tracking Here!
          <form className="register" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="first-name">First name </label>
              <input
                className="first-name"
                placeholder="First Name"
                type="text"
                name="first-name"
                id="first-name"
                value={this.state.first_name}
                onChange={this.handlefnameChange}
                required
              />
              {validationError}
            </div>
            <div>
              <label htmlFor="last-name">Last name </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                placeholder="Last Name"
                value={this.state.last_name}
                onChange={this.handlelnameChange}
                required
              />
              {validationError}
            </div>

            <button className="submit" type="submit">
              Track It!
            </button>
            <p>
              Already created a profile? Click on community dashboard to check
              your progress!
            </p>
          </form>
        </section>
      </div>
    );
  }
}

export default LandingPage;
