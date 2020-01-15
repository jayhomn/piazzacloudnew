import TextField from "@material-ui/core/TextField";
import React from "react";
import { Route, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { firestore } from "../firebase";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      success: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextFieldChangePass = this.handleTextFieldChangePass.bind(this);
    this.handleTextFieldChangeUser = this.handleTextFieldChangeUser.bind(this);
    this.uploadToDB = this.uploadToDB.bind(this);
  }

  uploadToDB(email, password) {
    firestore.settings({
      timestampsInSnapshots: true
    });
    firestore.collection("users").add({
      email: this.state.email,
      password: this.state.password
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.uploadToDB(this.state.email, this.state.password);
  }

  handleTextFieldChangePass(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleTextFieldChangeUser(event) {
    this.setState({
      email: event.target.value
    });
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
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
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
              type="submit"
              onClick={this.handleSubmit}
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
