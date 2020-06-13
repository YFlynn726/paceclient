import React, { Component } from "react";
import { Link } from "react-router-dom";
import PaceContext from "../PaceContext";
import { Modal } from "antd";
import "antd/dist/antd.css";
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
      currentItem: null,
      visible: false,
      pace: "",
      date: "",
      content: "",
    };
  }

  graphIt = () => {
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
            newItem.date = moment.utc(item.date).format("MM/DD/YYYY");

            return newItem;
          });
        let graphData = response;
        this.setState({
          graphData: graphData,
        });
      });
  };

  componentDidMount() {
    this.graphIt();
  }

  showModal = (item) => {
    this.setState({
      visible: true,
      currentItem: item,
      date: item.date,
      pace: item.pace,
      content: item.content,
    });
    console.log(item);
  };

  renderModal = (item) => {
    return (
      <Modal
        footer={null}
        title="Edit Pace Record"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        required
      >
        <form className="edit-pace" onSubmit={this.handleSubmit}>
          <div className="date-section">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              max={moment().format("YYYY-MM-DD")}
              id="date"
              name="date"
              value={moment.utc(this.state.date).format("YYYY-MM-DD")}
              onChange={(e) => this.handleDateChange(e)}
              required
            />
          </div>

          <div className="pace-container">
            <label htmlFor="pace">Pace:</label>
            <input
              id="pace"
              type="number"
              name="pace"
              step="0.01"
              placeholder="9.32"
              min="1"
              max="20"
              value={this.state.pace}
              onChange={(e) => this.handlePaceChange(e)}
              required
            />
          </div>
          <div className="textbox">
            <label htmlFor="pace-exp">Run Experience: </label>

            <textarea
              className="text"
              id="pace-exp"
              name="pace-exp"
              rows="10"
              value={this.state.content}
              onChange={(e) => this.handleContentChange(e)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    );
  };

  handleOk = (e) => {
    console.log(e);
    e.preventDefault();

    document.querySelector(".edit-pace").submit();
    this.setState({
      visible: false,
    });
    //this.editItem();
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

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

  deleteRequest = (item) => {
    this.context.deleteItem(item.id);
    this.props.history.push("/welcome");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.editItem();
    this.setState({
      visible: false,
    });
  };

  editItem = () => {
    // console.log(this.state);
    this.setState({
      graphData: null,
    });
    this.context.editItem(
      this.state.date,
      this.state.pace,
      this.state.content,
      this.state.currentItem,
      this.graphIt
    );
  };

  render() {
    const userId = this.props.match.params.user_id;

    const entries = this.context.items.filter((item) => {
      // eslint-disable-next-line eqeqeq
      return item.user_id == userId;
    });

    const records = entries.map((item) => {
      return (
        <div className="userdetails" key={item.id}>
          <li className="users">
            Date: {moment.utc(item.date).format("dddd, MMMM Do YYYY")}
          </li>
          <li className="users">Pace: {item.pace}</li>
          <li className="users">Run Experience: {item.content} </li>
          <button className="edit" onClick={() => this.showModal(item)}>
            Edit
          </button>

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
              width={280}
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
        <Link className="add" to={"/addpace"}>
          Add Pace Entry
        </Link>{" "}
        <ul className="recordlist">{records}</ul>
        {this.state.currentItem && this.renderModal(this.state.currentItem)}
      </div>
    );
  }
}

export default UserDetail;
