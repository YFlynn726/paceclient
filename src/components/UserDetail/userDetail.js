import React, { Component } from "react";
//import STORE from "./dummy-info";
import { Link } from "react-router-dom";
import PaceContext from "../PaceContext";
import { Modal } from "antd";
import moment from "moment";
import config from "../../config";
import "./userdetail.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class UserDetail extends Component {
  static contextType = PaceContext;

  constructor(props) {
    super(props);
    this.state = {
      currentItem: "",
      // currentUser: "",
      visible: false,
      pace: "",
      date: "",
      content: "",
    };
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}api/items`)
      .then((itemsRes) => {
        if (!itemsRes.ok) return itemsRes.json().then((e) => Promise.reject(e));

        return itemsRes.json();
      })
      .then((items) => {
        let response = items
          .filter((item) => {
            const userId = this.props.match.params.user_id;

            // eslint-disable-next-line eqeqeq
            return item.user_id == userId;
          })
          .map((item) => {
            let newItem = {};
            newItem.pace = item.pace;
            newItem.date = moment(item.date).format("MM/DD/YYYY");

            return newItem;
          });
        let graphData = response;
        this.setState({
          graphData: graphData,
        });
      });
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
          <button className="edit" onClick={() => this.showModal(item)}>
            Edit
          </button>

          <Modal
            title="Edit Pace Record"
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
        <h1>Pace Record</h1>
        <div className="graph">
          {this.state.graphData && (
            <LineChart
              width={360}
              height={200}
              data={this.state.graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="pace" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="date"
                stroke="#7094db"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="pace" stroke="#7094db" />
            </LineChart>
          )}
        </div>
        <Link to={"/addpace"}>
          <input type="button" value="Add A Pace Entry" />
        </Link>{" "}
        <ul className="recordlist">{records}</ul>
      </div>
    );
  }
}

export default UserDetail;
