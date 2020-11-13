import React, { Component, useContext } from "react";
// import API from "../utils/API";
import axios from "axios";

const Todo = (props) => (
  <tr>
    <td>{props.todo.todo_Team}</td>
    <td>{props.todo.todo_Location}</td>
    <td>{props.todo.todo_Description}</td>
    <td>{/* <Link to={"/edit/" + props.todo._id}>Edit</Link> */}</td>
  </tr>
);

export default class Teams extends Component {
  constructor(props) {
    super(props);

    this.user = this.user.bind(this);
    this.team = this.team.bind(this);
    this.location = this.location.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_Team: "",
      todo_Location: "",
      todo_Description: "",
      todo_completed: false,
      todos: [],
    };
  }

  user(e) {
    this.setState({
      todo_Team: e.target.value,
    });
  }

  team(e) {
    this.setState({
      todo_Location: e.target.value,
    });
  }

  location(e) {
    this.setState({
      todo_Description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Todo Team: ${this.state.todo_Team}`);
    console.log(`Todo Location: ${this.state.todo_Location}`);
    console.log(`Todo Description: ${this.state.todo_Description}`);

    const newTodo = {
      todo_Team: this.state.todo_Team,
      todo_Location: this.state.todo_Location,
      todo_Description: this.state.todo_Description,
      todo_completed: this.state.todo_completed,
    };

    axios.post("teams/todos/add", newTodo).then((res) => console.log(res.data));
    axios
      .get("teams/todos/")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      todo_Team: "",
      todo_Location: "",
      todo_Description: "",
      todo_completed: false,
    });
  }

  teamList() {
    return this.state.todos.map(function (currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: 10 }}>
          <h3>Enter Info</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>User: </label>
              <input
                type="text"
                className="form-control"
                name="teamName"
                value={this.state.todo_Team}
                onChange={this.user}
              />
            </div>
            <div className="form-group">
              <label>Team: </label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={this.state.todo_Location}
                onChange={this.team}
              />
            </div>
            <div className="form-group">
              <label>Location: </label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={this.state.todo_Description}
                onChange={this.location}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>

        <br></br>
        <h3>Team Info</h3>
        <table className="table table-dark" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.teamList()}</tbody>
        </table>
      </div>
    );
  }
}
