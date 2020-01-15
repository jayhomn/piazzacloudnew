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
  }

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
