import React, { Component } from "react";
import PaceContext from "../PaceContext";

class EditItem extends Component {
  static contextType = PaceContext;

  constructor(props) {
    super(props);
    this.state = {
      currentItem: "",
      date: "",
      pace: "",
      content: "",
    };
  }

  handleDateChange = (event) => {
    console.log(event.target.value);
    this.setState({
      date: event.target.value,
    });
  };

  handlePaceChange = (event) => {
    console.log(event.target.value);

    this.setState({
      pace: event.target.value,
    });
  };

  handleContentChange = (event) => {
    console.log(event.target.value);

    this.setState({
      content: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.editItem();
  };

  editItem = () => {
    this.context.editItem(
      this.state.date,
      this.state.pace,
      this.state.content,
      this.state.currentItem
    );
  };

  render() {
    return (
      <div className="editForm">
        <form className="edit-pace" onSubmit={this.handleSubmit}>
          <div className="date-section">
            <label className="add" htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={this.handleDateChange}
              required
            ></input>
          </div>

          <div className="pace-container">
            <label className="add" htmlFor="pace">
              Pace Time:
            </label>
            <input
              classnumber="number"
              type="number"
              name="pace"
              step="0.01"
              placeholder="9.32"
              min="1"
              max="20"
              onChange={this.handlePaceChange}
              required
            />
          </div>
          <div className="textbox">
            <label className="add" htmlFor="pace-exp">
              Run Experience:
            </label>
            <textarea
              className="text"
              name="pace-exp"
              rows="10"
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

export default EditItem;
