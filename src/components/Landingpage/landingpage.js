import React, { Component } from "react";
import PaceContext from "../PaceContext";
import "./landingpage.css";
import ValidationError from "../ValidateError";

class LandingPage extends Component {
  static contextType = PaceContext;

  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      error: false,
    };
  }

  handlefnameChange = (event) => {
    this.setState({
      first_name: event.target.value,
    });
  };

  handlelnameChange = (event) => {
    this.setState({
      last_name: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateName();
    if (!isValid.error) {
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

  updateError = (err) => {
    this.setState({
      error: err,
    });
  };

  validateName = () => {
    const firstName = this.state.first_name.trim();
    const lastName = this.state.last_name.trim();
    const result = { error: false, value: firstName, lastName };
    if (firstName.length <= 2 || lastName.length <= 2) {
      result.error = true;
      result.value =
        "First Name and Last Name must be at least 3 characters long";
    }
    return result;
  };

  render() {
    const { error } = this.state;
    const validationError = error ? <ValidationError message={error} /> : "";
    return (
      <div className="Landing">
        <h1>Welcome to Pace!</h1>
        <h2>Do you wonder how you perform on your runs overtime? </h2>

        {/* <h1 className="logo2">Pace!</h1> */}
        <div className="iframecontainer">
          <iframe
            className="iframebox"
            title="running shoes"
            src="https://giphy.com/embed/3oEjHW5ZfmQsI2rUuk"
            width="580"
            height="460"
            frameBorder="0"
            // className="giphy-embed"
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
          </form>
        </section>
      </div>
    );
  }
}

export default LandingPage;
