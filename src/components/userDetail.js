import React, { Component } from "react";
//import STORE from "./dummy-info";
import { Link } from "react-router-dom";
import PaceContext from "./PaceContext";
import { Modal, Button } from "antd";
import moment from "moment";

import "./userdetail.css";

class UserDetail extends Component {
  static contextType = PaceContext;

  constructor(props) {
    super(props);
    this.state = {
      currentItem: "",
      visible: false,
      pace: "",
      date: "",
      content: "",
    };
  }
  showModal = (item) => {
    this.setState({
      visible: true,
      currentItem: item,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.editItem();
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

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
  deleteRequest = (item) => {
    // console.log(item);
    //not working because don't have access to item.id
    // console.log(this.state.currentItem);
    this.context.deleteItem(item.id);
    this.props.history.push("/welcome");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.editItem();
  };

  editItem = () => {
    //console.log(this.state);
    this.context.editItem(
      this.state.date,
      this.state.pace,
      this.state.content,
      this.state.currentItem
    );
  };

  render() {
    const userId = this.props.match.params.user_id;
    // console.log(userId);
    // console.log(this.props.match);
    //changed to access context
    const entries = this.context.items.filter((item) => {
      // eslint-disable-next-line eqeqeq
      return item.user_id == userId;
    });
    // console.log(this.context.items);
    // console.log(entries);

    const records = entries.map((item) => {
      return (
        <div className="userdetails" key={item.id}>
          <li className="users">
            Date: {moment(item.date).format("MMM Do YYYY")}
          </li>
          <li className="users">Pace: {item.pace}</li>
          <li className="users">Run Experience: {item.content} </li>
          <button onClick={() => this.showModal(item)}>Edit</button>

          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            // onSubmit={this.handleSubmit}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
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
            </form>
          </Modal>

          <button
            className="delete_button"
            onClick={() => this.deleteRequest(item)}
          >
            Delete
          </button>
          <br />
        </div>
      );
    });
    return (
      <div className="userinfo-container">
        <h1>Welcome to your log!</h1>
        <Link to={"/addpace"}>
          <input type="button" value="Add A Pace Entry" />
        </Link>{" "}
        <ul>{records}</ul>
      </div>
    );
  }
}

export default UserDetail;
