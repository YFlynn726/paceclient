import React, { Component } from "react";
import PaceContext from "../PaceContext";
import "./addPace.css";
import moment from "moment";

class AddPace extends Component {
  static contextType = PaceContext;

  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      date: "",
      pace: "",
      content: "",
    };
  }

  handleDateChange = (event) => {
    this.setState({
      date: event.target.value,
    });
  };

  handlePaceChange = (event) => {
    this.setState({
      pace: event.target.value,
    });
  };

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  handleUserChange = (event) => {
    this.setState({ user_id: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.addItem();
  };

  addItem = () => {
    this.context.addItem(
      this.state.date,
      this.state.pace,
      this.state.content,
      this.state.user_id
    );
    this.props.history.push("/welcome");
  };

  render() {
    //access context
    let options = this.context.users.map((user) => {
      return (
        <option key={user.id} value={user.id}>
          {user.first_name} {user.last_name}
        </option>
      );
    });
    return (
      <div>
        <h1>New Pace Record</h1>
        <p className="para">
          Please select your name to enter a new pace record.
        </p>
        <form className="record-pace" onSubmit={this.handleSubmit}>
          <div>
            <label className="selectoption">
              Select Your Name:
              <select onChange={this.handleUserChange}>{options}</select>
            </label>
          </div>
          <br />
          <div className="date-section">
            <label className="date" htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              max={moment().format("YYYY-MM-DD")}
              id="date"
              name="date"
              onChange={this.handleDateChange}
              required
            />
          </div>

          <div className="pace-container">
            <label htmlFor="pace">Pace:</label>

            <input
              classnumber="number"
              id="pace"
              type="number"
              name="pace"
              step="0.01"
              placeholder="9.32"
              min="1"
              max="20"
              required
              onChange={this.handlePaceChange}
            />
          </div>
          <div className="textbox">
            <label className="date" htmlFor="pace-exp">
              Run Experience:
            </label>
            <textarea
              className="text"
              id="pace-exp"
              name="pace-exp"
              rows="15"
              onChange={this.handleContentChange}
              required
            ></textarea>
          </div>

          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </div>
    );
  }
}

export default AddPace;
