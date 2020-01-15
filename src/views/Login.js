import React from "react";
import LoginComponent from "../components/LoginComponent";
import { FirebaseContext } from "../Firebase";

class Login extends React.Component {
  render() {
    return (
      <div>
        <FirebaseContext.Consumer>
          {firebase => <LoginComponent firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
    );
  }
}

export default Login;
