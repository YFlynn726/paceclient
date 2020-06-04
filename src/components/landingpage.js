import React, { Component } from "react";
import "./landingpage.css";
import ValidationError from "./ValidateError";

class LandingPage extends Component {
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
      alert(`${this.state.first_name} ${this.state.last_name}`);
    } else {
      this.updateError(isValid.value);
    }
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
        {/* <h1 className="logo2">Pace!</h1> */}
        <iframe
          title="run forest run"
          src="https://giphy.com/embed/l2Sqc3POpzkj5r8SQ"
          width="480"
          height="201"
          frameBorder="0"
          className="giphy-embed"
          samesite="secure"
          allowFullScreen
        ></iframe>
        {/* <p>
          <a href="https://giphy.com/gifs/run-forrest-gump-l2Sqc3POpzkj5r8SQ">
            Does he run like this all the time?
          </a>
        </p> */}

        <section>
          <h2>Do you wonder how you perform on your runs overtime? </h2>
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
          Register Here!
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="first-name">First name</label>
              <input
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
              <label htmlFor="last-name">Last name</label>
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

            <button type="submit">Sign Up</button>
          </form>
        </section>
      </div>
    );
  }
}

export default LandingPage;
