import React, { Component, useContext } from "react";
// import API from "../utils/API";
import axios from "axios";
import Map from "./Map";

const Team = (props) => (
  <tr>
    <td>{props.team.user}</td>
    <td>{props.team.team}</td>
    <td>{props.team.location}</td>
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
      user: "",
      team: "",
      location: "",
      completed: false,
      teams: [],
    };
  }

  user(e) {
    this.setState({
      user: e.target.value,
    });
  }

  team(e) {
    this.setState({
      team: e.target.value,
    });
  }

  location(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Todo Team: ${this.state.user}`);
    console.log(`Todo Location: ${this.state.team}`);
    console.log(`Todo Description: ${this.state.location}`);

    const newTodo = {
      user: this.state.user,
      team: this.state.team,
      location: this.state.location,
      completed: this.state.completed,
    };

    axios.post("/teams/add", newTodo).then((res) => {
      console.log(res.data);
      axios
        .get("/teams/")
        .then((response) => {
          this.setState({ teams: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });

      this.setState({
        user: "",
        team: "",
        location: "",
        completed: false,
        teams: [],
      });
    });
  }

  teamList() {
    return this.state.teams.map(function (currentTeam, i) {
      return <Team team={currentTeam} key={i} />;
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
                value={this.state.user}
                onChange={this.user}
              />
            </div>
            <div className="form-group">
              <label>Team: </label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={this.state.team}
                onChange={this.team}
              />
            </div>
            <div className="form-group">
              <label>Location: </label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={this.state.location}
                onChange={this.location}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
        <Map
          locations={this.state.teams.map((team) => {
            return team.coords;
          })}
        />
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
