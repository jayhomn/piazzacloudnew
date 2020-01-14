import TextField from "@material-ui/core/TextField";
import React from "react";
import { Route, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Axios from "axios";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      success: false
    };
    this.updateProfile = this.updateProfile.bind(this);
  }

  updateProfile() {
    Axios.post("http://localhost:8000/userProfile/", {
      userName: this.state.username,
      password: this.state.password,
      success: true
    })
      .then(err => console.log(err.data["successLogin"]))
      .catch(err => console.log("dsds"));
  }

  advance = () => {
    this.updateProfile();
    this.props.history.push("/explore");
  };

  handleTextFieldChangeUser = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleTextFieldChangePass = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <Paper
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "344px",
          padding: "32px"
        }}
      >
        <form noValidate autoComplete="off">
          <div>
            <h1>piazza login</h1>
          </div>
          <div>
            <TextField
              value={this.state.textFieldValue}
              onChange={this.handleTextFieldChangeUser}
              label="Username"
              fullWidth="true"
              style={{
                padding: "8px"
              }}
            />
          </div>
          <div>
            <TextField
              value={this.state.textFieldValue}
              onChange={this.handleTextFieldChangePass}
              label="Password"
              fullWidth="true"
              style={{
                padding: "8px"
              }}
            />
          </div>
          <div>
            <Button
              onClick={this.advance}
              style={{
                marginTop: "24px"
              }}
              variant="outlined"
            >
              submit
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withRouter(LoginComponent);
