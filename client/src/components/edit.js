import React, { Component } from "react";
import axios from "axios";
import Map from "../components/Map/";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.user = this.user.bind(this);
    this.team = this.team.bind(this);
    this.location = this.location.bind(this);
    this.completed = this.completed.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);

    this.state = {
      user: "",
      team: "",
      location: "",
      completed: false,
    };
  }

  componentDidMount() {
    axios
      .get("/teams/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          user: response.data.user,
          team: response.data.team,
          location: response.data.location,
          completed: response.data.completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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

  completed(e) {
    this.setState({
      completed: !this.state.completed,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      user: this.state.user,
      team: this.state.team,
      location: this.state.location,
      completed: this.state.completed,
    };
    console.log(obj);
    axios
      .put("/teams/" + this.props.match.params.id, obj)
      .then((res) => console.log(res.data));
    this.props.history.push("/teams/");
  }

  onSubmitDelete(e) {
    e.preventDefault();

    axios.delete("/teams/" + this.props.match.params.id).then((res) => {
      console.log(res.data);
      this.props.history.push("/teams/");
    });

    this.props.history.push("/teams/");
  }
  render() {
    return (
      <div>
        <h3 align="center">Update</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>user: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.user}
              onChange={this.user}
            />
          </div>
          <div className="form-group">
            <label>team: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.team}
              onChange={this.team}
            />
          </div>
          <div className="form-group">
            <label>location: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.location}
              onChange={this.location}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.completed}
              checked={this.state.completed}
              value={this.state.completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
          <div className="form-group">
            <input
              onClick={this.onSubmitDelete}
              type="submit"
              value="Delete"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
